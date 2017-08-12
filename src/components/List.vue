<template lang="pug">
section(id="list" class="list" :class="listClasses")
  div(class="item" :class="itemClasses(track)" v-for="track in tracks")
    div(class="item__thumbnail" :style="thumbnailStyle(track.artwork_url)")
      i.item__icon
</template>

<script>
// https://stackoverflow.com/questions/35242272/vue-js-data-bind-style-backgroundimage-not-working

export default {
  computed: {
    tracks() {
      return this.$store.state.tracks
    },    
    listClasses() {
      return {
        'has-results': !!this.tracks
      }
    },
  },
  methods: {
    thumbnailStyle(artworkUrl) {
      if (artworkUrl) {
        if (this.$store.state.isdev) {
          artworkUrl.replace(/https:\/\/i1.sndcdn.com/g, 'assets/images/mock')
        }
        return `background-image: url(${artworkUrl.replace(/large/g, 't300x300')}`
      }
      return ''
    },
    itemClasses(track) {
      return {
        'item--no-artwork': !track.artwork_url
      }
    }
  }
}
</script>
