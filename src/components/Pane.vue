<template lang="pug">
nav(id="nav" class="nav")  
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