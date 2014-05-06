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
          baseDir: '_site'
        }
      }
    },

    compass: {
      all: {
        options: {
          config: '_config/config.rb'
        }
      }
    },

    htmlmin: {
      options: {
        removeComments: true
      },
      files: {
        expand: true,
        cwd: '_site',
        src: ['**/*.html'],
        dest: '_site'
      }
    },

    jekyll: {
      options: {
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
        cwd: '_site',
        src: ['**/*.html'],
        dest: '_site'
      }
    },

    watch: {
      compass: {
        files: '_scss/**/*.scss',
        tasks: ['compass']
      },
      jekyll: {
        files: [
          '**/*{.html,.css,.js,.md,.yml}',
          '!_site/**/*'
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