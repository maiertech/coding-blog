module.exports = function (grunt) {

  // load tasks
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-rsync');

  // Jekyll configuration
  var config = grunt.file.readYAML('site/_config-grunt.yml');
  var travis = grunt.file.readYAML('.travis.yml')

  // set file encoding
  grunt.file.defaultEncoding = 'utf8';

  // task configurations
  grunt.initConfig({

    browserSync: {
      files: [
        '**/*.html',
        'css/*.css',
        'js/**/*.js'
      ],
      options: {
        watchTask: true,
        server: {
          baseDir: '<%= config.destination %>'
        }
      }
    },

    config: config,

    compass: {
      options: {
        sassDir: '<%= config.source %>/_scss',
        imagesDir: '<%= config.source %>/imgs',
        cssDir: '<%= config.source %>/css',
        importPath: '<%= config.source %>/bower_components/foundation/scss'
      },
      uncompressed: {
        options: {
          outputStyle: 'expanded'
        }
      },
      compressed: {
        options: {
          outputStyle: 'compressed'
        }
      }
    },

    deploy: {
      prod: {
        options: {
          server: '<%= config.prodServer %>'
        }
      },
      test: {
        options: {
          server: '<%= config.testServer %>'
        }
      }
    },

    jekyll: {
      options: {
        config: '<%= config.source %>/_config-grunt.yml',
        bundleExec: true
      },
      noDrafts: {
        options: {
          drafts: false
        }
      },
      drafts: {
        options: {
          drafts: true
        }
      }
    },

    rsync: {
      options: {
        args: ['-vv'],
        compareMode: 'checksum',
        src: '<%= config.destination %>/',
        ssh: true,
        syncDest: true,
        recursive: true
      },
      prod: {
        options: {
          host: '<%= config.prodServer %>',
          dest: '~/' + '<%= config.prodServer %>'
        }
      },
      test: {
        options: {
          host: '<%= config.testServer %>',
          dest: '~/' + '<%= config.testServer %>'
        }
      }
    },

    watch: {
      compass: {
        files: '<%= config.source %>/_scss/**/*.scss',
        tasks: ['compass:uncompressed']
      },
      jekyll: {
        files: [
          '<%= config.source %>/**/*{.html,.css,.js,.md,.yml}'
        ],
        tasks: ['jekyll:drafts']
      }
    }

  });

  // read command-line options
  var branch = grunt.option('branch');

  /**
   * Deploy task
   *
   * Requires SSH user to be injected via --user=<username>.
   * Creates ~/.ssh/config and then rsyncs build dir.
   */
  grunt.registerMultiTask('deploy', 'deploy build with rsync', function () {

    grunt.log.writeln('RUN TASK: ' + this.name);

    // assert that server config is exists
    this.requiresConfig(this.name + '.' + this.target + '.options.server');
    var server = this.options().server;

    // assert that user option has been set
    var user = grunt.option('user');
    if (typeof user == 'undefined') {
      grunt.fail.fatal('User is required to configure SSH');
    }

    // path to SSH config file
    var sshConfigFile = process.env.HOME + '/.ssh/config';
    grunt.log.writeln('=> Path to SSH config file: ' + sshConfigFile);

    // assemble SSH config
    var sshConfig = 'Host ' + server + '\n';
    sshConfig += '\tUser ' + user + '\n';
    sshConfig += '\tIdentityFile ~/.ssh/deploy.key\n';
    sshConfig += '\tStrictHostKeyChecking no';

    // Write SSH config
    grunt.file.write(sshConfigFile, sshConfig);
    grunt.log.writeln('=> wrote config \n---\n' + sshConfig + '\n---\nto SSH config file');

    if (this.target === 'prod') {
      grunt.log.writeln('=> run rsync:prod');
      return grunt.task.run(['rsync:prod']);
    }

    grunt.log.writeln('=> run rsync:test');
    return grunt.task.run(['rsync:test']);
  });

  /*
   * Build task
   *
   * Build for 'prod', 'test' or otherwise for 'dev'
   */
  grunt.registerTask('build', 'build task', function (env) {

    grunt.log.writeln('RUN TASK: ' + this.name);

    if (env === 'prod') {
      grunt.log.writeln('=> run PROD build');
      return grunt.task.run([
        'compass:compressed', // Compass compile with compression
        'jekyll:noDrafts',    // Jekyll build without drafts
        'deploy:prod'         // Deploy to prod server
      ]);
    }
    else if (env === 'test') {
      grunt.log.writeln('=> run TEST build');
      return grunt.task.run([
        'compass:uncompressed', // Compass compile without compression
        'jekyll:drafts',        // Jekyll build with drafts
        'deploy:test'           // Deploy to test server
      ]);
    }

    grunt.log.writeln('=> run DEV build');
    return grunt.task.run([
      'compass:uncompressed', // Compass compile without compression
      'jekyll:drafts',        // Jekyll build with drafts
      'browserSync',          // Launch BrowserSync and watch build dir for changes
      'watch'                 // Watch Jekyll dir and trigger Compass compile or Jekyll build when files change
    ]);

  });

  // this task is executed by Travis CI
  grunt.registerTask('ci', function () {

    grunt.log.writeln('RUN TASK: ' + this.name);

    if (typeof process.env.CI == 'undefined') {
      grunt.fail.fatal('This task can be executed only on the CI server!');
    }

    var branch = process.env.TRAVIS_BRANCH
    if (typeof branch == 'undefined') {
      grunt.fail.fatal('TRAVIS_BRANCH env variable not set!');
    }

    if (branch === 'master') { // deploy master to prod env
      grunt.log.writeln('=> run build:prod');
      return grunt.task.run(['build:prod']);
    }

    // deploy any other branch to test env
    grunt.log.writeln('=> run build:test');
    return grunt.task.run(['build:test']);
  });

}