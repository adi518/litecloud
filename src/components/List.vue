<template lang="pug">
  //- section.list#list(:class="listClasses" v-html="noMatch")
  section.list#list(:class="classes")
    .item(v-for="(track, index) in tracks" :class="getItemClasses(track)" @click="onItemClick(index)")
      .item__thumbnail(:style="getThumbnailInlineStyle(track)")
        i.item__icon
        .item__tag(v-if="track.genre" :title="track.genre") {{'#' + track.genre}}
      ul.item__meta
        li.item__title(:title="getTrackTitle(track)") {{getTrackTitle(track)}}
        li.item__creator
          small.item__author(:title="track.user.username") {{track.user.username}}
          small.item__duration(:title="getTrackDuration(track)") {{getTrackDuration(track)}}
</template>

<script>
// https://stackoverflow.com/questions/35242272/vue-js-data-bind-style-backgroundimage-not-working
// Resources
import { isDev, stripTags, msToHMS } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  updated() {
    console.info('total tracks:', this.tracks.length) // debug
    console.info('total art-covers:', this.artworkCounter) // debug TODO:
  },
  data() {
    return {
      artworkCounter: 0
    }
  },
  computed: {
    ...mapGetters(['tracks', 'keyword']),
    noMatch() {
      return this.hasResults
        ? ''
        : `Your search - <b>${this.keyword}</b> - did not match any tracks.`
    },
    hasResults() {
      return this.tracks.length ? true : false
    },
    noTracks() {
      return !this.hasResults
    },
    classes() {
      return {
        'has-results': this.hasResults,
        'no-results': !this.hasResults
      }
    }
  },
  methods: {
    onItemClick(index) {
      // detect no-results
      const tracks = this.tracks
      if (this.noTracks) {
        return
      }
      const track = tracks[index]
      track.isPlaying = true
      this.$set(tracks, index, track)
    },
    getTrackTitle(track) {
      return track.custom.title
    },
    getTrackDuration(track) {
      return msToHMS(track.duration)
    },
    getThumbnailInlineStyle(track) {
      const artworkUrl = track.artwork_url
      if (artworkUrl) {
        // this.artworkCounter++ // debug TODO:
        if (isDev) {
          artworkUrl.replace(/https:\/\/i1.sndcdn.com/g, 'assets/images/mock')
        }
        return `background-image: url(${artworkUrl.replace(
          /large/g,
          't300x300'
        )}`
      }
      return ''
    },
    getItemClasses(track) {
      return {
        'item--no-artwork': track.artwork_url ? false : true,
        'is-active': track.isPlaying ? true : false
      }
    }
  }
}
</script>
