module.exports = function (grunt) {

  grunt.file.defaultEncoding = 'utf8';

  grunt.initConfig({
    bowerrc: grunt.file.readJSON('.bowerrc'),

    branches: {
      production: 'master',
      test: 'test'
    },

    dirs: {
      build: '_site',
      deploy: '_deploy'
    },

    env: process.env,

    servers: {
      production: 'coding.maier.asia',
      test: 'coding-test.maier.asia'
    }
  });

  // browser-sync
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.config('browserSync', {
    files: [
      '**/*.html',
      'css/*.css',
      'js/**/*.js'
    ],
    options: {
      watchTask: true,
      server: {
        baseDir: '<%= dirs.build %>'
      }
    }
  });

  // contrib-compass
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.config('compass', {
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
  });

  // contrib-copy
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    fastclick: {
      files: {
        '<%= dirs.build %>/js/fastclick.js': '<%= bowerrc.directory %>/fastclick/lib/fastclick.js'
      }
    },
    foundation: {
      files: {
        '<%= dirs.build %>/js/foundation.js': '<%= bowerrc.directory %>/foundation/js/foundation.js',
        '<%= dirs.build %>/js/foundation.offcanvas.js': '<%= bowerrc.directory %>/foundation/js/foundation/foundation.offcanvas.js',
        '<%= dirs.build %>/js/foundation.topbar.js': '<%= bowerrc.directory %>/foundation/js/foundation/foundation.topbar.js'
      }
    },
    modernizr: {
      files: {
        '<%= dirs.build %>/js/modernizr.js': '<%= bowerrc.directory %>/modernizr/modernizr.js'
      }
    },
    jquery: {
      files: {
        '<%= dirs.build %>/js/jquery.js': '<%= bowerrc.directory %>/jquery/dist/jquery.js'
      }
    },
    options: {
      nonull: true
    }
  });

  // contrib-watch
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config('watch', {
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
  });

  // jekyll
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.config('jekyll', {
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
  });

  // rsync
  grunt.loadNpmTasks('grunt-rsync');
  grunt.config('rsync', {
    options: {
      args: ['-vv'],
      compareMode: 'checksum',
      src: '<%= dirs.build %>/',
      ssh: true,
      syncDest: true,
      recursive: true
    },
    prod: {
      options: {
        host: '<%= servers.production %>',
        dest: '~/<%= servers.production %>'
      }
    },
    test: {
      options: {
        host: '<%= servers.test %>',
        dest: '~/<%= servers.test %>'
      }
    }
  });

  // deploy
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
    grunt.log.writeln('=> SSH config: \n---\n' + sshConfig + '\n---');
    grunt.log.writeln('=> written to: ' + sshConfigFile);

    // prod deployment
    if (this.target === 'prod') {
      grunt.log.writeln('=> run rsync:prod');
      return grunt.task.run(['rsync:prod']);
    }

    // test deployment
    grunt.log.writeln('=> run [addAuth, rsync:test]');
    return grunt.task.run(['addAuth', 'rsync:test']);
  });
  grunt.config('deploy', {
    prod: {
      options: {
        server: '<%= servers.production %>'
      }
    },
    test: {
      options: {
        server: '<%= servers.test %>'
      }
    }
  });

  // build
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
    else {
      return grunt.task.run([
        'compass:uncompressed', // Compass compile without compression
        'jekyll:drafts',        // Jekyll build with drafts
        'copy',                 // copy JavaScript files
        'browserSync',          // Launch BrowserSync and watch build dir for changes
        'watch'                 // Watch Jekyll dir and trigger Compass compile or Jekyll build when files change
      ]);
    }

  });

  // ci (continuous integration)
  /**
   * This is the task that needs to be run on Travis CI.
   * Requires SSH user to be injected via --user=<username>.
   */
  grunt.registerTask('ci', 'Travis CI task', function () {

    // Check documentation for CI and TRAVIS_BRANCH env variables:
    // http://docs.travis-ci.com/user/ci-environment/#Environment-variables

    if (typeof grunt.config('env.CI') == 'undefined') {
      grunt.fail.fatal('This task can be executed only on the CI server!');
    }

    if (typeof grunt.config('env.TRAVIS_BRANCH') == 'undefined') {
      grunt.fail.fatal('TRAVIS_BRANCH env variable not set!');
    }

    if (grunt.config('env.TRAVIS_BRANCH') === grunt.config('branches.production')) { // deploy production branch
      grunt.log.writeln('=> run build:prod');
      return grunt.task.run(['build:prod']);
    }
    else if (grunt.config('env.TRAVIS_BRANCH') === grunt.config('branches.test')) { // deploy test branch
      grunt.log.writeln('=> run build:test');
      return grunt.task.run(['build:test']);
    }
    else {
      grunt.fail.fatal('Branch ' + branch + ' is not a deployment branch!');
    }
  });

  // addAuth
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
      authName: grunt.config('servers.production') + ' (Test Server)',
      user: user
    }
    htaccess = grunt.template.process(grunt.file.read(grunt.config('dirs.deploy') + '/.htaccess'), {data: replace});
    grunt.file.write(grunt.config('dirs.build') + '/.htaccess', htaccess);
    grunt.log.writeln('=> replaced .htaccess file for test server deployment')
  });

  // default
  grunt.registerTask('default', ['build']);

}
