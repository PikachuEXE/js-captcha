module.exports = function(grunt) {

    grunt.initConfig({

        settings: {
            srcPath: 'src/',
            distPath: 'dist/',
            library: 'jCaptcha'
        },

        babel: {
            dist: {
                files: {
                    '<%= settings.distPath %>js/<%= settings.library %>.js': [
                        '<%= settings.srcPath %>js/<%= settings.library %>.js'
                    ]
                }
            }
        },

        uglify: {
            minify: {
                options: {
                    beautify: false
                },
                files: {
                    '<%= settings.distPath %>js/<%= settings.library %>.min.js': [
                        '<%= settings.distPath %>js/<%= settings.library %>.js'
                    ]
                }
            }
        },

        umd: {
            all: {
                options: {
                    src: '<%= settings.distPath %>js/<%= settings.library %>.js',
                    dest: '<%= settings.distPath %>js/<%= settings.library %>.js',
                    objectToExport: 'jCaptcha',
                }
            }
        },

        htmlmin: {
            dist: {
              options: {
                removeComments: true,
                collapseWhitespace: true
              },
              files: [{
                    expand: true,
                    cwd: '<%= settings.srcPath %>',
                    src: ['**/*.html'],
                    dest: '<%= settings.distPath %>'
                }]
            }
        },

        watch: {
            javascript: {
                expand: true,
                files: ['<%= settings.srcPath %>js/**/*.js', 'Gruntfile.js'],
                tasks: ['babel', 'umd', 'uglify'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['<%= settings.srcPath %>*.html'],
                tasks: ['htmlmin'],
                options: {
                    spawn: false
                }
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['babel', 'umd', 'uglify', 'htmlmin']);

};