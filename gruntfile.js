/* jslint node: true */
/* jshint esversion: 6 */

'use strict';

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

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
                files: 'src/sass/**/*',
                tasks: 'compass:dev',
                options: {
                    spawn: false,
                    interrupt: true,
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
                    pretty: true,
                },
                files: [{
                    cwd: 'src/views',
                    src: '**/*.pug',
                    dest: './',
                    expand: true,
                    ext: '.html',
                }]
            }
        }
    });

    grunt.registerTask('default', [
        'compass:dev',
        'pug',
        'watch'
    ]);
};
