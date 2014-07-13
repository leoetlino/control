/* global module */
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowerrc: grunt.file.readJSON('.bowerrc'),
        clean: ['dist', '.tmp'],
        dirs: {
            'vendor': '<%= bowerrc.directory %>',
            'bootstrap': {
                'js': '<%= dirs.vendor %>/bootstrap/dist/js',
                'css': '<%= dirs.vendor %>/bootstrap/dist/css'
            },
            'css': 'css',
            'less': 'less',
            'js': 'js'
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/',
                src: ['.htaccess', '**', 'js/**.js', 'css/**.css', 'css/fonts/**', 'css/images/**', 'app/**.js', 'lib/**.{css,js,eot,svg,ttf,woff}'],
                dest: 'dist/'
            },
            fontawesome: {
                expand: true,
                cwd: 'src/libs/fontawesome/fonts/',
                src: ['*.{eot,svg,ttf,woff}'],
                dest: 'dist/fonts/'
            }
        },
        useminPrepare: {
            html: 'src/index.html',
            css: ['src/css/**.css', 'src/libs/*/**.css']
        },
        usemin: {
            html: 'dist/index.html',
            css: ['dist/css/**.css', 'dist/libs/*/**.css'],
            options: {
                patterns: {
                    css: [
                        [/(image\.png)/, 'Replacing reference to image.png']
                    ]
                }
            }
        },
        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },
        rev: {
            assets: {
                files: [{
                    src: ['dist/js/control.min.js', 'dist/css/control.min.css', 'dist/**.js', 'dist/css/**.css', 'dist/libs/*/**.css', 'dist/**.eot', 'dist/**.svg', 'dist/**.ttf', 'dist/**.woff', 'dist/**.jpg', 'dist/**.png']
                }]
            }
        },
        cssmin: {
            generated: {
                options: {
                    banner: '/* Control - the place to control everything with us © Copyright Innovate Technologies, 2014 */'
                },
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'clean', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin', 'htmlmin'
    ]);
};
