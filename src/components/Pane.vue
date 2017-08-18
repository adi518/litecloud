<template lang="pug">
nav.nav#nav
    Search
    Playing
    Player
</template>

<script>
// Components
import Search from './Search'
import Playing from './Playing'
import Player from './Player'

export default {
  components: {
    Search,
    Playing,
    Player,
  }
}
</script>