module.exports = function (grunt) {

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
          baseDir: 'site/_build'
        }
      }
    },

    compass: {
      all: {
        options: {
          config: 'site/config.rb'
        }
      }
    },

    htmlmin: {
      options: {
        removeComments: true
      },
      files: {
        expand: true,
        cwd: 'site/_build',
        src: ['**/*.html'],
        dest: 'site/_build'
      }
    },

    jekyll: {
      options: {
        src: 'site',
        dest: 'site/_build',
        bundleExec: true
      },
      dev: {
        options: {
          drafts: true
        }
      },
      prod: {
        options: {
          drafts: false
        }
      }
    },

    prettify: {
      options: {
        indent: 2,
        indent_inner_html: true,
        condense: true
      },
      files: {
        expand: true,
        cwd: 'site/_build',
        src: ['**/*.html'],
        dest: 'site/_build'
      }
    },

    watch: {
      compass: {
        files: 'site/_scss/**/*.scss',
        tasks: ['compass']
      },
      jekyll: {
        files: [
          '**/*{.html,.css,.js,.md,.yml}',
          '!site/_build/**/*'
        ],
        tasks: ['jekyll:dev']
      }
    }

  });

  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-prettify');

  grunt.registerTask('build:dev', [
    'compass',
    'jekyll:dev',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('build:prod', [
    'compass',
    'jekyll:prod',
    'htmlmin',
    'prettify'
  ]);
};