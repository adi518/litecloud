/* jslint node: true */
/* jshint esversion: 6 */

'use strict';

module.exports = function (grunt) {

    grunt.option('stack', true);

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');
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
