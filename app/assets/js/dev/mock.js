/* jslint browser: true */
/* jslint jquery: true */
/* global $ */

'use strict';

const mock = {
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
            mock.player.paused = false;
        },
        pause: function () {
            mock.player.paused = true;
        },
        isPlaying: function () {
            return mock.player.paused;
        },
        seek: function () {},
        options: {
            protocols: ['http']
        },
        paused: true
    },
    SC: {
        get: function () {
            return $.getJSON('assets/json/tracks.json');
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
                    callback(mock.player);
                }
            };
        }
    }
};

module.exports = mock;

// var player = mock.player;
//
// $('#player-playPause').click(function () {
//     if (player.paused) {
//         player.play();
//     } else {
//         player.pause();
//     }
// });
