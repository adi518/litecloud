<template lang="pug">
nav.nav
  Logo.logo
  Search.search
  Playing
  Player
</template>

<script>
import Logo from './Logo'
import Search from './Search'
import Playing from './Playing'
import Player from './Player'

export default {
  components: {
    Logo,
    Search,
    Playing,
    Player
  }
}
</script>

<style lang="scss" scoped>
.nav {
  @extend %fixed;
  @extend %translate3d-hack;
  z-index: 2;
  width: $nav-width;
  border-right: to-rem(1) solid;
  height: calc(100% - #{$titlebar-height});
  padding: to-rem(35) to-rem(20) to-rem(20);
  transform: translate3d(0, $titlebar-height, 0);
}

.logo {
  margin-left: auto;
  margin-right: auto;
}

.search {
  margin-top: to-rem(36);
}
</style>
