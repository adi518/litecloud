/* jslint browser: true */
/* jslint jquery: true */
/*global $, $$, mockup, SC:true */

window.$ = window.jQuery = require('jquery');
const {
    BrowserWindow
} = require('electron').remote
var drag = require('electron-drag');

'use strict';

var cache = {};

$(function () {

    cache = {
        version: '0.1',
        testKeyword: 'milky chance',
        test: true,
        isdev: window.location.hash.substring(1) === 'dev',
        keyupDebounceDelay: 500,
        devLoaderDelay: 0,
        init: {
            grid: true
        },
        clientId: 'd3cc13db45cba4f1ff6846dc46b0ef8a',
        truncatedTitleLength: 20,
        played: [],
        queryOptions: {
            limit: 50,
        },
        $window: $(window)
    };

    var selectors = [
        '#body',
        '#minimize',
        '#maximize',
        '#terminate',
        '#main',
        '#mask',
        '#header',
        '#audio',
        '#player-playPause',
        '#player-next',
        '#player-previous',
        '#player-replay',
        '#progress',
        '#playing',
        '#playing-thumbnail',
        '#playing-title',
        '#playing-artist',
        '#nav',
        '#search',
        '#list',
        '#player',
        '.toggle-grid-view',
        '.toggle-repeat',
        '.toggle-shuffle',
    ];

    selectors.forEach(function (selector) {
        try {
            /* beautify ignore:start */
            var _selector = selector;
            _selector = _selector.replace(/[#]/g, '')
                                    .replace(/\./g, '')
                                        .replace(/[-]/g, '_');
            /* beautify ignore:end */
            cache['$' + _selector] = $$(selector);
        } catch (e) {
            console.error('invalid selector');
        }
    });

    function togglePlayPause() {
        var node = cache.$player_playPause[0];
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

    function msToHMS(ms) {
        var seconds = ms / 1000;
        var hours = parseInt(seconds / 3600, 10);
        if (hours && hours < 9)
            padWithZero(hours);
        seconds = seconds % 3600;
        var minutes = parseInt(seconds / 60, 10);
        if (minutes) {
            if (minutes < 9)
                padWithZero(minutes);
        } else
            minutes = '00';
        seconds = Math.floor(seconds % 60);
        if (seconds < 10)
            seconds = padWithZero(seconds);
        else if (seconds < 1)
            seconds = '00';
        return (hours ? (hours + ':') : '') + minutes + ':' + seconds;
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
                    if (cache.isdev) {
                        track.artwork_url.replace(/https:\/\/i1.sndcdn.com/g, 'assets/images/mockup');
                    }
                }
                markup += '<div class="list__item item' + (!track.artwork_url ? ' item--no-artwork' : '') + '">';
                markup += '<span class="item__thumbnail" style="' + (track.artwork_url ? 'background-image: url(' + track.artwork_url + ')' : '') + '">';
                markup += '<i class="item__icon"></i>';
                if (track.genre) {
                    markup += '<span class="item__tag" title="' + track.genre + '">#' + track.genre + '</span>';
                }
                // markup += '<span class="item__truncated">' + track.title.substring(0, cache.truncatedTitleLength) + '</span>';
                markup += '</span>';
                markup += '<ul class="item__data">';
                markup += '<li class="item__title" title="' + track.custom.title + '">' + track.custom.title + '</li>';
                markup += '<li class="item__meta">';
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
            markup = '<div class="list__item">Your search - <b>' + cache.searchQuery + '</b> - did not match any tracks.</div>';
            cache.$body.removeClass('show-grid-view');
        }
        cache.$items = cache.$list.toggleClass('no-results', !tracks.length)[options.append ? 'append' : 'html'](markup);
        cache.$items = cache.$items.children();
    }

    function updateProgressBar(reset) {
        if (!cache.player.streamInfo) {
            reset = true;
        }
        var el = cache.$progress[0],
            percentage = reset ? 0 : Math.ceil((100 / cache.player.streamInfo.duration) * cache.player.currentTime());
        el.value = percentage;
        // Update the progress bar's text (for browsers that don't support the progress element)
        el.innerHTML = percentage + '% played';
    }

    function replayTrack() {
        updateProgressBar(true);
        cache.player.seek(0);
        cache.player.play();
    }

    function previousTrack() {
        var previousIndex = cache.index - 1;
        var $items = $('.list__item', cache.$list);
        var $previousItem = $items.get(previousIndex);
        if (cache.tracks[previousIndex] && $previousItem) {
            $previousItem.click();
        } else if (cache.repeat) {
            $items.get(0).click();
        }
    }

    function nextTrack() {
        var nextIndex = cache.index + 1;
        var $items = $('.list__item', cache.$list);
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

    // TODO: re-factor semantics
    function getTracks(query, offset, options) {
        options = $.extend({}, options);
        var fetch;
        if (offset) {
            fetch = $.get(query);
        } else {
            var queryURI = '/tracks?' + $.param($.extend({}, cache.queryOptions, {
                q: query,
                linked_partitioning: true
            }));
            cache.query = [];
            cache.query.push(queryURI);
            fetch = SC.get(queryURI);
        }
        // handle response
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
                // is partitioned response? https://developers.soundcloud.com/blog/offset-pagination-deprecated
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
            title: tmp[1] || '',
        };
    }

    function init() {

        console.info('app version:', cache.version);

        drag('#titlebar');

        if (!drag.supported) {
            document.querySelector('#title-bar').style['-webkit-app-region'] = 'drag';
        }

        cache.$audio[0].controls = false;
        cache.$body.removeClass('show-loader');

        /* bind events */

        cache.$list.on('click', '.list__item', function () {
            // detect no-results
            if (!cache.tracks.length) {
                return;
            }
            var $item = $(this);
            var track = cache.tracks[$item.index()];
            var hasArtCover = track.artwork_url ? true : false;
            // abort if user hit an already playing track
            if (cache.index === $item.index()) {
                return;
            }
            /* beautify ignore:start */
            $item.addClass('item--selected');
            if ($.isNumeric(cache.index)) {
                $(cache.$items.get(cache.index)).removeClass('item--selected').addClass('item--visited');
            }
            // cache.$mask.css('background-image', 'url(' + (track.artwork_url || '') + ')');
            // cache.$body.toggleClass('show-mask', hasArtCover).toggleClass('animate-mask', hasArtCover);

            // show what's playing
            cache.$body.addClass('show-playing-now');
            cache.$playing.toggleClass('playing--no-artcover', !hasArtCover);
            cache.$playing_title.text(track.custom.title);
            cache.$playing_artist.text(track.custom.artist);
            if (hasArtCover) {
                cache.$playing_thumbnail.css('background-image', 'url(' + track.artwork_url + ')');
            } else {
                cache.$playing_thumbnail.css('background-image', '');
            }
            cache.index = $item.index();
            /* beautify ignore:end */
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
                        cache.$player.removeClass('hidden');
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
            case 'replay':
                replayTrack();
                break;
            }
        });

        cache.$nav__buttons = $('.btn', cache.$nav).click(function () {
            var $btn = $(this);
            var action = $btn.data('action');
            var toggle = $btn.data('toggle');
            if (toggle) {
                $btn.addClass('hidden');
                cache.$nav__buttons.filter('[data-modifier = ' + toggle + ']').not(this).removeClass('hidden');
                cache.$body.toggleClass(toggle);
                return;
            }
            switch (action) {
            case 'shuffle':
                cache.shuffle = cache.shuffle ? false : true;
                break;
            case 'repeat':
                cache.repeat = cache.repeat ? false : true;
                break;
            }
            $btn.addClass('btn--selected');
        });

        cache.$progress.click(function (e) {
            var posX = e.pageX - $(this).position().left;
            if (cache.player.isPlaying()) {
                cache.player.seek(posX / cache.$progress.width() * cache.tracks[cache.index].duration);
            }
        });

        cache.$main.scroll(function () {
            var $this = $(this);
            var scrollPosition = $this.scrollTop() + $this.outerHeight();
            var totalHeight = this.scrollHeight +
                parseInt($this.css('padding-top'), 10) +
                parseInt($this.css('padding-bottom'), 10) +
                parseInt($this.css('border-top-width'), 10) +
                parseInt($this.css('border-bottom-width'), 10);
            if (scrollPosition == totalHeight) {
                if (cache.query[cache.offset + 1]) {
                    if (cache.isdev) {
                        getTracks(cache.query[cache.offset], true);
                    } else {
                        getTracks(cache.query[++cache.offset], true);
                    }
                }
            }
        });

        cache.$search.keyup($.debounce(cache.keyupDebounceDelay, function () {
            if (this.value === '') {
                return;
            }
            cache.searchQuery = this.value;
            getTracks(this.value, null, {
                new: true,
            });
        }));

        // Minimize task
        cache.$minimize.click((event) => { // eslint-disable-line
            var window = BrowserWindow.getFocusedWindow();
            window.minimize();
        });

        // Maximize window
        cache.$maximize.click((event) => { // eslint-disable-line
            var window = BrowserWindow.getFocusedWindow();
            if (window.isMaximized()) {
                window.unmaximize();
            } else {
                window.maximize();
            }
        });

        // Close app
        cache.$terminate.click((event) => { // eslint-disable-line
            var window = BrowserWindow.getFocusedWindow();
            window.close();
        });

        // now test it ;)
        if (cache.test) {
            cache.$search.val(cache.testKeyword).keyup();

            // reset search field
            setTimeout(function () {
                cache.$search.val('');
            }, cache.keyupDebounceDelay);

            if (cache.init.grid) {
                $('[data-toggle = show-grid-view]').not('.hidden').click();
            }
        }
    }

    // beam me up scotty!

    if (cache.isdev) {
        console.warn('initialized development-mode, loaded mockup data...');
        cache.player = mockup.player;
        SC = mockup.SC;
    } else {
        SC.initialize({
            client_id: cache.clientId
        });
    }

    setTimeout(init, cache.isdev ? cache.devLoaderDelay : 0);
});
