/* jslint browser: true */
/* jslint jquery: true */
/* global $ */

'use strict';

const mockup = {
    player: {
        on: function (eventName, handler) {
            switch (eventName) {
            case 'created':
                handler();
                break;
            }
            return this;
        },
        load: function (trackUrl, options) {
            options.callback();
        },
        play: function () {
            mockup.player.paused = false;
        },
        pause: function () {
            mockup.player.paused = true;
        },
        isPlaying: function () {
            return mockup.player.paused;
        },
        seek: function () {},
        options: {
            protocols: ['http']
        },
        paused: true
    },
    SC: {
        get: function () {
            return $.getJSON('assets/json/mockup.json');
        },
        Widget: {
            Events: {
                READY: 'READY',
                FINISH: 'FINISH'
            }
        },
        stream: function () {
            return {
                then: function (callback) {
                    callback(mockup.player);
                }
            };
        }
    }
};

module.exports = mockup;

// var player = mockup.player;
//
// $('#player-playPause').click(function () {
//     if (player.paused) {
//         player.play();
//     } else {
//         player.pause();
//     }
// });
