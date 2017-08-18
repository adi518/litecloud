<template lang="pug">
section.list#list(:class="listClasses")
  .item(v-for="(track, index) in tracks" :class="itemClasses(track)" :key="index" @click="onItemClick(index)")
    .item__thumbnail(:style="thumbnailInlineStyle(track)")
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
import Vue from 'vue'
import { stripTags, msToHMS } from '@/utils'

export default {
  updated() {
    console.info('total tracks:', this.tracks.length) // debug
    console.info('total art-covers:', this.artworkCounter) // TODO:
  },
  computed: {
    tracks() {
      const tracks = this.$store.state.tracks.map(track => {
        track.isPlaying = false
        if (!track.custom) {
          track.custom = this.splitTrackTitle(stripTags(track.title))
        }
        return track
      })
      return tracks
    },
    listClasses() {
      return {
        'has-results': this.tracks ? 1 : 0
      }
    },
  },
  methods: {
    onItemClick(index) {
      // detect no-results
      const tracks = this.tracks
      if (!tracks.length) {
        return
      }
      const track = tracks[index]
      track.isPlaying = true
      Vue.set(tracks, index, track)
    },
    splitTrackTitle(title) {
      let split = title.split('-')
      return {
        artist: split[0] || '',
        title: split[1] || ''
      }
    },
    getTrackTitle(track) {
      return track.custom.title
    },
    getTrackDuration(track) {
      return msToHMS(track.duration)
    },
    thumbnailInlineStyle(track) {
      const artworkUrl = track.artwork_url
      if (artworkUrl) {
        // this.artworkCounter++ // debug TODO:
        if (this.$store.state.isdev) {
          artworkUrl.replace(/https:\/\/i1.sndcdn.com/g, 'assets/images/mock')
        }
        return `background-image: url(${artworkUrl.replace(/large/g, 't300x300')}`
      }
      return ''
    },
    itemClasses(track) {
      return {
        'item--no-artwork': track.artwork_url ? 0 : 1,
        'is-active': track.isPlaying ? 1 : 0
      }
    },
  },
  data() {
    return {
      artworkCounter: 0
    }
  }
}
</script>
