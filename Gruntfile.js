/* global module, require */
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowerrc: grunt.file.readJSON('.bowerrc'),
        clean: {
            preBuild: ['dist', '.tmp'],
            postBuild: ['.tmp', 'backup']
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
            },
            backupIndexHtml: {
                expand: true,
                cwd: 'src/',
                src: 'index.html',
                dest: 'backup/'
            },
            restoreIndexHtml: {
                expand: true,
                cwd: 'backup',
                src: 'index.html',
                dest: 'src/'
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
                    src: ['dist/js/control-bundle.min.js', 'dist/js/control.min.js', 'dist/css/control.min.css', 'dist/**.js', 'dist/css/**.css', 'dist/libs/*/**.css', 'dist/**.eot', 'dist/**.svg', 'dist/**.ttf', 'dist/**.woff', 'dist/**.jpg', 'dist/**.png']
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
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                indent: 4,
                quotmark: 'single',
                undef: true,
                unused: true,
                jquery: true,
                plusplus: false,
                globals: {
                    jQuery: true,
                    require: true,
                    define: true,
                    angular: true
                }
            },
            all: ['Gruntfile.js', 'src/app/**.js', 'src/app/**/**.js', 'js/**.js']
        },
        githooks: {
            all: {
                'pre-commit': 'jshint:all'
            }
        },
        ngconstant: {
            options: {
                name: 'config',
                dest: 'src/app/config.js',
                beautify: {
                    indent_size: 4,
                    indent_char: ' ',
                    indent_level: 0,
                    indent_with_tabs: false,
                    space_before_conditional: true
                }
            },
            development: {
                constants: {
                    ENV: {
                        name: 'development',
                        apiEndpoint: 'itframe-c9-imstr.c9.io'
                    }
                }
            },
            production: {
                constants: {
                    ENV: {
                        name: 'production',
                        apiEndpoint: 'itframe.shoutca.st'
                    }
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'dist/app',
                    mainConfigFile: 'dist/app/app.js',
                    out: 'dist/app/control-bundle.min.js',
                    name: 'app',
                    findNestedDependencies: true,
                    uglify: {
                        no_mangle: true
                    }
                }
            }
        },
        htmlbuild: {
            production: {
                src: 'src/index.html',
                dest: 'src/',
                options: {
                    scripts: {
                        controlApp: 'dist/app/control-bundle.min.js'
                    },
                    parseTag: 'htmlbuild'
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
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('install-hook', function () {
        var fs = require('fs');
        grunt.file.copy('hooks/commit-msg', '.git/hooks/commit-msg');
        fs.chmodSync('.git/hooks/commit-msg', '755');
    });

    grunt.task.run('install-hook');
    grunt.task.run('githooks');

    grunt.registerTask('generate-dev-config', function () {
        grunt.task.run('ngconstant:development');
    });

    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'jshint', 'ngconstant:production', 'clean:preBuild', 'copy:main', 'copy:fontawesome', 'copy:backupIndexHtml', 'requirejs', 'htmlbuild:production', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin', 'htmlmin', 'ngconstant:development', 'copy:restoreIndexHtml', 'clean:postBuild'
    ]);
};
