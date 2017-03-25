/* eslint-disable */
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// https://www.w3.org/2010/05/video/mediaevents.html
// Soundcloud Player (methods & events)
// https://developers.soundcloud.com/docs/api/sdks#player

// jslint browser: true
// jslint jquery: true
/*global $, $$ */

const pjson = require('../package.json');
const electron = require('electron')
const remote = electron.remote;
/* beautify ignore:start */
const {BrowserWindow, globalShortcut} = remote;
/* beautify ignore:end */
// remote.getCurrentWindow().removeAllListeners();
const drag = require('electron-drag');
window.$ = window.jQuery = require('jquery');
require('./assets/js/vendor/jquery.$$.min.js');
const debounce = require('debounce');
const isdev = window.location.hash.substring(1) === 'dev';
let cache = {};
// we use `let` because SC is set to `mock.SC` on development-mode
let SC = require('soundcloud');

if (isdev) {
    const mock = require('./assets/js/dev/mock.js');
    SC = mock.SC;
    cache.player = mock.player;
}

'use strict';

cache = $.extend({}, cache, {
    version: pjson.version,
    test: true,
    testKeyword: 'lana del rey',
    keyupDebounceDelay: 500,
    loaderDelay: 1500,
    init: {
        grid: true
    },
    grid: true,
    clientId: 'd3cc13db45cba4f1ff6846dc46b0ef8a',
    truncatedTitleLength: 20,
    played: [],
    queryOptions: {
        limit: 50
    },
    $window: $(window)
});

$(function () {

    var selectors = [
        '#body', '.toggle-grid-view', '.toggle-repeat', '.toggle-shuffle',
        // components
        '#minimize',
        '#maximize',
        '#terminate',
        'nav',
        '#mute',
        '#audio',
        '#main',
        '#list',
        '#search',
        '#player',
        '#progress',
        '#mask',
        // player
        '#player-playPause',
        '#player-next',
        '#player-previous',
        '#player-replay',
        // playing-now
        '#playing',
        '#playing-thumbnail',
        '#playing-title',
        '#playing-artist'
    ];

    selectors.forEach(function (selector) {
        try {
            /* beautify ignore:start */
            var _selector = selector;
            _selector = _selector.replace(/[#]/g, '').replace(/\./g, '').replace(/[-]/g, '_');
            /* beautify ignore:end */
            cache['$' + _selector] = $$(selector);
        } catch (e) {
            console.error('invalid selector');
        }
    });

    function togglePlayPause() {
        var node = cache.$player_playPause[0];
        if (!cache.player)
            return;
        if (cache.player.paused || cache.player.isPlaying()) {
            changeButtonType(node, 'play_arrow');
            cache.player.pause();
        } else {
            changeButtonType(node, 'pause');
            cache.player.play();
        }
    }

    function changeButtonType(btn, value) {
        btn.innerHTML = value;
    }

    function changeIconButtonType(btn, value) {
        $(btn).find('i').html(value);
    }

    function msToHMS(ms) {
        var seconds = ms / 1000;
        var hours = parseInt(seconds / 3600, 10);
        if (hours && hours < 9)
            padWithZero(hours);
        seconds = seconds % 3600;
        var minutes = parseInt(seconds / 60, 10);
        if (minutes) {
            if (minutes < 9) {
                padWithZero(minutes);
            }
        } else {
            minutes = '00';
        }
        seconds = Math.floor(seconds % 60);
        if (seconds < 10) {
            seconds = padWithZero(seconds);
        } else if (seconds < 1) {
            seconds = '00';
        }
        return (hours ?
            (hours + ':') :
            '') + minutes + ':' + seconds;
    }

    function padWithZero(val) {
        return ('0' + val).slice(-2);
    }

    function stripHTML(val) {
        return $('<p>' + val + '</p>').text();
    }

    function drawItems(tracks, options) {
        options = $.extend({}, options);
        var markup = '';
        var counter = 0;
        var duration;
        if (tracks.length) {
            tracks.forEach(function (track) {
                if (!track.custom) {
                    track.custom = splitTrackTitle(stripHTML(track.title));
                }
                if (track.artwork_url) {
                    counter++;
                    track.artwork_url = track.artwork_url.replace(/large/g, 't300x300');
                    if (isdev) {
                        track.artwork_url.replace(/https:\/\/i1.sndcdn.com/g, 'assets/images/mock');
                    }
                }
                markup += '<div class="item' + (!track.artwork_url ?
                    ' item--no-artwork' :
                    '') + '">';
                markup += '<div class="item__thumbnail" style="' + (track.artwork_url ?
                    'background-image: url(' + track.artwork_url + ')' :
                    '') + '">';
                markup += '<i class="item__icon"></i>';
                if (track.genre) {
                    markup += '<div class="item__tag" title="' + track.genre + '">#' + track.genre + '</div>';
                }
                // markup += '<span class="item__truncated">' + track.title.substring(0, cache.truncatedTitleLength) + '</span>';
                markup += '</div>';
                markup += '<ul class="item__meta">';
                markup += '<li class="item__title" title="' + track.custom.title + '">' + track.custom.title + '</li>';
                markup += '<li class="item__creator">';
                markup += '<small class="item__author" title="' + track.user.username + '">' + track.user.username + '</small>';
                duration = msToHMS(track.duration);
                markup += '<small class="item__duration" title="' + duration + '">' + duration + '</small>';
                // markup += '<small class="item__views">views: ' + track.playback_count + '</small>';
                markup += '</li>';
                markup += '</div>';
            });
            console.info('total tracks:', tracks.length);
            console.info('total art-covers:', counter);
        } else {
            markup = 'Your search - <b>' + cache.searchQuery + '</b> - did not match any tracks.';
            cache.$body.removeClass('show-grid-view');
        }
        if (tracks.length) {
            cache.$list.addClass('has-results').removeClass('no-results');
        } else {
            cache.$list.removeClass('has-results').addClass('no-results');
        }
        cache.$items = cache.$list[options.append ?
            'append' :
            'html'](markup);
        cache.$items = cache.$items.children();
    }

    function updateProgressBar(reset) {
        if (!cache.player.streamInfo) {
            reset = true;
        }
        var el = cache.$progress[0],
            percentage = reset ?
            0 :
            Math.ceil((100 / cache.player.streamInfo.duration) * cache.player.currentTime());
        el.value = percentage;
        // Update the progress bar's text (for browsers that don't support the progress element)
        el.innerHTML = percentage + '% played';
    }

    function replayTrack() {
        if (!cache.player) {
            return;
        }
        updateProgressBar(true);
        cache.player.seek(0);
        cache.player.play();
    }

    function previousTrack() {
        var previousIndex = cache.index - 1;
        var $items = $('.item', cache.$list);
        var $previousItem = $items.get(previousIndex);
        if (cache.tracks[previousIndex] && $previousItem) {
            $previousItem.click();
        } else if (cache.repeat) {
            $items.get(0).click();
        }
    }

    function nextTrack() {
        var nextIndex = cache.index + 1;
        var $items = $('.item', cache.$list);
        var $nextItem = $items.get(nextIndex);
        if (cache.shuffle) {
            var randomIndex = getRandomTrackIndex();
            if (cache.tracks[randomIndex]) {
                $items.get(randomIndex).click();
            }
        } else if (cache.tracks[nextIndex] && $nextItem) {
            $nextItem.click();
        } else if (cache.repeat) {
            $items.get(0).click();
        }
    }

    function getTracks(query, offset, options) {
        options = $.extend({}, options);
        var fetch;
        if (offset) {
            fetch = $.get(query);
        } else {
            // geo filtering
            // US 37.0902° N, 95.7129° W
            // EU 54.5260° N, 15.2551° W
            // https://developers.soundcloud.com/docs/api/reference#tracks
            var queryURI = '/tracks?tag_list=geo:lat=54.5260%20geo:lon=15.2551&' + $.param($.extend({}, cache.queryOptions, {
                q: query,
                linked_partitioning: true
            }));
            cache.query = [];
            cache.query.push(queryURI);
            fetch = SC.get(queryURI);
        }
        fetch.then(function (response) {
            cache.response = response;
            // new search?
            if (!cache.tracks || options.new) {
                cache.$main.scrollTop(0);
                cache.offset = 0;
                cache.tracks = [];
            }
            if (response.collection.length) {
                cache.tracks = cache.tracks.concat(response.collection);
                // is partitioned response?
                // https://developers.soundcloud.com/blog/offset-pagination-deprecated
                if (response.next_href) {
                    cache.query.push(response.next_href);
                }
            }
            drawItems(response.collection || [], {
                append: offset || false
            });
        });
    }

    function getRandomTrackIndex() {
        if (cache.played.length === cache.tracks.length) {
            console.log('played all tracks!');
            return 0;
        }
        var randomIndex = getRandomInt(0, cache.tracks.length - 1);
        if ($.inArray(randomIndex, cache.played) === -1) {
            return randomIndex;
        }
        getRandomTrackIndex();
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function splitTrackTitle(raw) {
        var tmp = raw.split('-');
        return {
            artist: tmp[0] || '',
            title: tmp[1] || ''
        };
    }

    function init() {

        console.info('app version:', cache.version);

        drag('#titlebar');

        if (!drag.supported) {
            document.querySelector('#titlebar').style['-webkit-app-region'] = 'drag';
        }

        cache.$body.removeClass('show-loader');

        /* bind events */

        cache.$list.on('click', '.item', function () {
            // detect no-results
            if (!cache.tracks.length) {
                return;
            }
            var $item = $(this);
            var track = cache.tracks[$item.index()];
            var hasArtwork = track.artwork_url ?
                true :
                false;
            // abort if user hit a playing track
            if (cache.index === $item.index()) {
                return;
            }
            $item.addClass('is-active');
            if ($.isNumeric(cache.index)) {
                $(cache.$items.get(cache.index)).toggleClass('is-active item--visited');
            }
            // cache.$mask.css('background-image', 'url(' + (track.artwork_url || '') + ')');
            // cache.$body.toggleClass('show-mask', hasArtwork).toggleClass('animate-mask', hasArtwork);
            // show what's playing
            cache.$body.addClass('show-playing');
            cache.$playing.toggleClass('playing--no-artwork', !hasArtwork);
            cache.$playing_title.text(track.custom.title);
            cache.$playing_artist.text(track.custom.artist);
            if (hasArtwork) {
                cache.$playing_thumbnail.css('background-image', 'url(' + track.artwork_url + ')');
            } else {
                cache.$playing_thumbnail.css('background-image', '');
            }
            cache.index = $item.index();
            SC.stream('/tracks/' + track.id).then(function (player) {
                // avoid triggering flash, as per: https://github.com/soundcloud/soundcloud-javascript/issues/39
                if (player.options.protocols[0] === 'rtmp') {
                    player.options.protocols.splice(0, 1);
                }
                if (cache.player && cache.player.isPlaying()) {
                    cache.player.pause();
                }
                cache.player = player;
                cache.player.on('created', function () {
                    if (cache.$player.is(':hidden')) {
                        cache.$body.addClass('show-player');
                    }
                }).on('play-start', function () {
                    // updateProgressBar(true); // TODO: inspect necessity
                }).on('finish', function () {
                    cache.played.push(cache.index);
                    nextTrack();
                }).on('time', function () {
                    updateProgressBar();
                });
                cache.$player_playPause.click();
                console.info('playing:', track.title);
            });
        });

        cache.$player__buttons = $('i', cache.$player).click(function () {
            switch (this.id.replace(/player-/g, '')) {
            case 'playPause':
                togglePlayPause();
                break;
            case 'next':
                nextTrack();
                break;
            case 'previous':
                previousTrack();
                break;
            }
        });

        cache.$nav__buttons = $('.btn--nav', cache.$nav).click(function () {
            var $btn = $(this);
            var id = $btn.prop('id');
            switch (id) {
            case 'toggleGrid':
                cache.$body.toggleClass('show-grid');
                if (cache.$body.hasClass('show-grid')) {
                    changeIconButtonType(this, 'view_module');
                } else {
                    changeIconButtonType(this, 'view_headline');
                }
                break;
            case 'toggleMute':
                if (!cache.player) {
                    return;
                }
                if (cache.player.getVolume() > 0) {
                    cache.volume = cache.volume;
                    cache.player.setVolume(0);
                    changeIconButtonType(this, 'volume_off');
                } else {
                    cache.player.setVolume(cache.volume);
                    changeIconButtonType(this, 'volume_up');
                }
                break;
            case 'shuffle':
                cache.shuffle = cache.shuffle ?
                    false :
                    true;
                break;
            case 'repeat':
                cache.repeat = cache.repeat ?
                    false :
                    true;
                break;
            case 'replay':
                replayTrack();
                break;
            }
            if (!$btn.data().hasOwnProperty('stateless')) {
                $btn.toggleClass('is-active');
            }
        });

        cache.$progress.click(function (e) {
            var posX = e.pageX - $(this).position().left;
            if (cache.player.isPlaying()) {
                cache.player.seek(posX / cache.$progress.width() * cache.tracks[cache.index].duration);
            }
        });

        // http://stackoverflow.com/questions/6271237/detecting-when-user-scrolls-to-bottom-of-div-with-jquery
        cache.$main.scroll(function () {
            var $this = $(this);
            var scrollPosition = $this.scrollTop() + $this.outerHeight();
            var totalHeight = this.scrollHeight + parseInt($this.css('padding-top'), 10) + parseInt($this.css('padding-bottom'), 10) + parseInt($this.css('border-top-width'), 10) + parseInt($this.css('border-bottom-width'), 10);
            if (scrollPosition == totalHeight) {
                if (cache.query[cache.offset + 1]) {
                    if (isdev) {
                        getTracks(cache.query[cache.offset], true);
                    } else {
                        getTracks(cache.query[++cache.offset], true);
                    }
                }
            }
        });

        cache.$search.keyup(debounce(function () {
            if (this.value === '') {
                return;
            }
            cache.searchQuery = this.value;
            getTracks(this.value, null, {
                new: true
            });
        }, cache.keyupDebounceDelay));

        // Minimize
        cache.$minimize.click(() => {
            var window = BrowserWindow.getFocusedWindow();
            window.minimize();
        });

        // Maximize
        cache.$maximize.click(() => {
            var window = BrowserWindow.getFocusedWindow();
            if (window.isMaximized()) {
                window.unmaximize();
            } else {
                window.maximize();
            }
        });

        // Terminate
        cache.$terminate.click(() => {
            var window = BrowserWindow.getFocusedWindow();
            window.close();
        });

        // Bind Media-keys
        // Namespaces: MediaPlayPause, MediaStop, MediaNextTrack,
        // MediaPreviousTrack, VolumeUp, VolumeDown, VolumeMute,
        globalShortcut.register('MediaPlayPause', function () {
            cache.$player_playPause.click();
        })

        globalShortcut.register('MediaNextTrack', function () {
            cache.$player_next.click();
        })

        globalShortcut.register('MediaPreviousTrack', function () {
            cache.$player_previous.click();
        })

        // now test it ;)
        if (cache.test) {
            cache.$search.val(cache.testKeyword).keyup();

            // reset search field
            setTimeout(function () {
                cache.$search.val('');
            }, cache.keyupDebounceDelay);

            if (cache.init.grid) {
                $('[data-toggle = show-grid-view]').not(':hidden').click();
            }
        }
    }

    // beam me up scotty!

    if (isdev) {
        console.warn('initialized development-mode, loaded mockup data...');
    } else {
        SC.initialize({
            client_id: cache.clientId
        });
    }

    setTimeout(init, cache.loaderDelay || 0);
});
