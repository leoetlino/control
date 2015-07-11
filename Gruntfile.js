/* global module, require */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowerrc: grunt.file.readJSON('.bowerrc'),
        clean: {
            preBuild: ['dist', '.tmp'],
            postBuild: ['.tmp', 'backup', 'dist/app', 'dist/libs']
        },
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
            fontawesome: {
                expand: true,
                cwd: 'src/libs/fontawesome/fonts/',
                src: ['*.{eot,svg,ttf,woff,woff2}'],
                dest: 'dist/fonts/'
            }
        },
        useminPrepare: {
            html: 'dist/index.html',
            css: ['dist/css/**.css', 'dist/libs/*/**.css']
        },
        usemin: {
            html: 'dist/index.html',
            css: ['dist/css/**.css', 'dist/libs/*/**.css']
        },
        uglify: {
            options: {
                report: 'min',
                mangle: true
            }
        },
        rev: {
            assets: {
                files: [{
                    src: ['dist/js/control.min.js', 'dist/css/control.min.css']
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    minifyCSS: true,
                    conservativeCollapse: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'src/app/**.js', 'src/app/**/**.js', 'js/**.js']
        },
        githooks: {
            all: {
                'pre-commit': 'jshint:all'
            }
        },
        html2js: {
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    minifyCSS: true,
                    conservativeCollapse: true
                }
            },
            build: {
                src: ['dist/app/**/partials/**.html'],
                dest: 'dist/app/00-templates.js',
                options: {
                    base: 'dist',
                    rename: function (moduleName) {
                        return '/' + moduleName;
                    },
                    module: 'templates'
                }
            },
            dev: {
                src: ['src/app/**/partials/**.html'],
                dest: 'dev/app/00-templates.js',
                options: {
                    base: 'src',
                    rename: function (moduleName) {
                        return '/' + moduleName;
                    },
                    module: 'templates'
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
                add: true,
                remove: true
            },
            build: {
                files: [
                    {
                        expand: true,
                        src: ['.tmp/concat/js/control.min.js']
                    }
                ]
            }
        },
        includeSource: {
            build: {
                files: {
                    'dist/index.html': 'dist/index.html'
                },
                options: {
                    basePath: 'dist/app/',
                    baseUrl: 'app/',
                    ordering: 'top-down'
                },
            },
            dev: {
                files: {
                    'dev/index.html': 'dev/index.html'
                },
                options: {
                    basePath: 'dev/app/',
                    baseUrl: 'app/',
                    ordering: 'top-down'
                },
            }
        },
        watch: {
            dev: {
                files: ['src/*.*', 'src/*/*.*', 'src/app/*.js', 'src/app/*/*.js'],
                tasks: ['rsync:dev', 'includeSource:dev']
            },
        },
        express: {
            dev: {
                options: {
                    bases: ['dev/'],
                    port: 5000,
                    hostname: '*',
                    server: 'dev-server.js'
                }
            }
        },
        rsync: {
            options: {
                args: ['--update --verbose'],
                exclude: ['*~'],
                recursive: true
            },
            dev: {
                options: {
                    src: 'src/',
                    dest: 'dev/',
                    delete: true
                }
            },
            build: {
                options: {
                    src: 'src/',
                    dest: 'dist/',
                    exclude: ['*~', '*.spec.js'],
                    delete: true
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-githooks');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-rsync');

    grunt.registerTask('install-hook', function () {
        var fs = require('fs');
        grunt.file.copy('hooks/commit-msg', '.git/hooks/commit-msg');
        fs.chmodSync('.git/hooks/commit-msg', '755');
        grunt.task.run('githooks');
    });

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'jshint', // Run JSHint on the source
        'clean:preBuild', // Clean up to make sure nothing breaks the build
        'rsync:build', // Copy the source to dist/ to start the build
        'copy:fontawesome', // Copy the Font Awesome fonts to dist/
        'html2js:build', // Convert the templates to a JS cache file
        'includeSource:build',
        'useminPrepare',
        'concat', // Concat all files
        'ngAnnotate:build', // Add DI annotations
        'uglify', // Uglify the JS
        'cssmin', // Uglify the CSS
        'rev', // Add a revision tag to assets
        'usemin',
        'htmlmin', // Minify the HTML
        'clean:postBuild' // Clean up
    ]);

    grunt.registerTask('dev', [
        'rsync:dev',
        'includeSource:dev',
        'express',
        'watch'
    ]);

};
