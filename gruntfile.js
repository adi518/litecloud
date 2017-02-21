/* jslint node: true */
/* jshint esversion: 6 */

'use strict';

module.exports = function(grunt) {

    grunt.option('stack', true);

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            options: {
                bundleExec: true,
                config: 'config.rb',
            },
            dist: {
                options: {
                    force: true,
                    sourcemap: true,
                    outputStyle: 'compressed',
                    environment: 'production',
                }
            },
            dev: {
                options: {
                    // debugInfo: true,
                    trace: true,
                }
            }
        },
        watch: {
            sass: {
                files: 'src/sass/**/*',
                tasks: 'compass:dev',
                options: {
                    spawn: false,
                }
            },
            pug: {
                files: 'src/views/**/*',
                tasks: 'pug'
            }
        },
        pug: {
            compile: {
                options: {
                    // pretty: true,
                    // debug: true
                },
                files: {
                    'index.html': 'src/views/*'
                }
            }
        }
        // htmlmin: {
        //     dist: {
        //         options: {
        //             removeComments: true,
        //             collapseWhitespace: true
        //         },
        //         files: {
        //             'public/carStart.html': 'public/carStart.html',
        //             // 'public/start.html': 'public/start.html',
        //         }
        //     },
        // },
    });

    grunt.registerTask('default', [
        'compass:dev',
        'pug',
        'watch'
    ]);
};
