module.exports = function (grunt) {

  // load tasks
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-rsync');

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
            baseDir: '_site'
          }
        }
      },

      compass: {
        options: {
          config: 'config.rb'
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

      copy: {
        fastclick: {
          files: {
            '_site/js/fastclick.js': '_bower_components/fastclick/lib/fastclick.js'
          }
        },
        foundation: {
          files: {
            '_site/js/foundation.js': '_bower_components/foundation/js/foundation.js',
            '_site/js/foundation.offcanvas.js': '_bower_components/foundation/js/foundation/foundation.offcanvas.js',
            '_site/js/foundation.topbar.js': '_bower_components/foundation/js/foundation/foundation.topbar.js'
          }
        },
        modernizr: {
          files: {
            '_site/js/modernizr.js': '_bower_components/modernizr/modernizr.js'
          }
        },
        jquery: {
          files: {
            '_site/js/jquery.js': '_bower_components/jquery/dist/jquery.js'
          }
        },
        options: {
          nonull: true
        }
      },

      deploy: {
        prod: {
          options: {
            server: 'coding.maier.asia'
          }
        },
        test: {
          options: {
            server: 'coding-test.maier.asia'
          }
        }
      },

      jekyll: {
        options: {
          config: '_config.yml',
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
          src: '_site/',
          ssh: true,
          syncDest: true,
          recursive: true
        },
        prod: {
          options: {
            host: 'coding.maier.asia',
            dest: '~/coding.maier.asia'
          }
        },
        test: {
          options: {
            host: 'coding-test.maier.asia',
            dest: '~/coding-test.maier.asia'
          }
        }
      },

      watch: {
        compass: {
          files: '_scss/**/*.scss',
          tasks: ['compass:uncompressed']
        },
        jekyll: {
          files: [
            'index.html',
            '_drafts/**/*.html',
            '_includes/**/*.html',
            '_layouts/**/*.html',
            '_posts/**/*.md',
            'css/**/*.css',
            '_config.yml',
            '_data/**/*.yml'
          ],
          tasks: ['jekyll:drafts', 'copy']
        }
      }

    }
  );

  /**
   * Deploy task.
   * Requires SSH user to be injected via --user=<username>.
   * Creates ~/.ssh/config and then syncs build dir.
   */
  grunt.registerMultiTask('deploy', 'create SSH config and then deploy build dir with rsync', function () {

    // assert that server config exists
    this.requiresConfig(this.name + '.' + this.target + '.options.server');
    var server = this.options().server;

    // assert that user option has been set
    var user = grunt.option('user');
    if (typeof user == 'undefined') {
      grunt.fail.fatal('User is required to configure SSH.');
    }

    // path to SSH config file
    var sshConfigFile = process.env.HOME + '/.ssh/config';

    // assemble SSH config
    var sshConfig = 'Host ' + server + '\n';
    sshConfig += '\tUser ' + user + '\n';
    sshConfig += '\tIdentityFile ~/.ssh/deploy.key\n';
    sshConfig += '\tStrictHostKeyChecking no';

    // Write SSH config
    grunt.file.write(sshConfigFile, sshConfig);
    grunt.log.writeln('=> SSH config: \n---\n' + sshConfig + '\n---\nto SSH config file');
    grunt.log.writeln('=> SSH config written to: ' + sshConfigFile);

    // prod deployment
    if (this.target === 'prod') {
      grunt.log.writeln('=> run rsync:prod');
      return grunt.task.run(['rsync:prod']);
    }

    // test deployment
    grunt.log.writeln('=> run [addAuth, rsync:test]');
    return grunt.task.run(['addAuth', 'rsync:test']);
  });

  /**
   * Build task.
   * Trigger build for 'prod', 'test' and by default for 'dev'.
   */
  grunt.registerTask('build', 'run environment specific build', function (env) {

    if (env === 'prod') {
      return grunt.task.run([
        'compass:compressed', // Compass compile with compression
        'jekyll:noDrafts',    // Jekyll build without drafts
        'copy',               // copy JavaScript files
        'deploy:prod'         // Deploy to prod server
      ]);
    }
    else if (env === 'test') {
      return grunt.task.run([
        'compass:uncompressed', // Compass compile without compression
        'jekyll:drafts',        // Jekyll build with drafts
        'copy',                 // copy JavaScript files
        'deploy:test'           // Deploy to test server
      ]);
    }

    return grunt.task.run([
      'compass:uncompressed', // Compass compile without compression
      'jekyll:drafts',        // Jekyll build with drafts
      'copy',                 // copy JavaScript files
      'browserSync',          // Launch BrowserSync and watch build dir for changes
      'watch'                 // Watch Jekyll dir and trigger Compass compile or Jekyll build when files change
    ]);

  });

  /**
   * This is the task that needs to be run on Travis CI.
   * Requires SSH user to be injected via --user=<username>.
   */
  grunt.registerTask('ci', 'Travis CI task', function () {

    // Check documentation for CI and TRAVIS_BRANCH env variables:
    // http://docs.travis-ci.com/user/ci-environment/#Environment-variables

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

  /**
   * This tasks replaces the root .htaccess file to add authentication.
   * This task is called prior to test deployment.
   */
  grunt.registerTask('addAuth', 'replace .htaccess file for test server deployment', function () {

    // assert that user option has been set
    var user = grunt.option('user');
    if (typeof user == 'undefined') {
      grunt.fail.fatal('User is required to replace .htaccess file.');
    }

    // overwrite .htaccess in build dir
    var replace = {
      authName: 'coding.maier.asia (Test Server)',
      user: user
    }
    htaccess = grunt.template.process(grunt.file.read('_deploy/.htaccess'), {data: replace});
    grunt.file.write('_site/.htaccess', htaccess);
    grunt.log.writeln('=> replaced .htaccess file for test server deployment')
  });

}
