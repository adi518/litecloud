/* jslint node: true */
/* jshint esversion: 6 */

'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            options: {
                bundleExec: true,
                config: 'config.rb',
            },
            dist: {
                options: {
                    sourcemap: true,
                    outputStyle: 'compressed',
                    environment: 'dist',
                }
            },
            dev: {
                options: {
                    trace: true,
                }
            }
        },
        watch: {
            sass: {
                files: 'app/src/sass/**/*',
                tasks: 'compass:dev',
                options: {
                    spawn: false,
                    interrupt: true,
                }
            },
            pug: {
                files: 'app/src/views/**/*',
                tasks: 'pug'
            }
        },
        pug: {
            compile: {
                files: {
                    'app/index.html': 'app/src/views/*'
                }
            }
        }
    });

    grunt.registerTask('default', [
        'compass:dev',
        'pug',
        'watch'
    ]);
};
