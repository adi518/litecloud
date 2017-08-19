<template lang="pug">
#app(:class="classes")
  Titlebar
  Pane
  PaneRight
  main#main(@scroll="onScroll")
    List
  #loader
  #overlay
  #mask
</template>

<script>
// Assets
import 'material-design-icons/iconfont/material-icons.css'
import 'normalize.css'
import { log, onScrolled } from '@/utils'

// Components
import Titlebar from '@/components/Titlebar'
import Pane from '@/components/Pane'
import PaneRight from '@/components/PaneRight'
import List from '@/components/List'

export default {
  components: {
    Titlebar,
    Pane,
    PaneRight,
    List,
  },
  computed: {
    classes() {
      return {
        'show-grid': this.$store.state.grid
      }
    }
  },
  methods: {
    onScroll(event) {
      onScrolled(event.target).then(() => {
        const state = this.$store.state
        const query = state.query[state.offset + 1]
        if (query) {
          this.$store.commit('OFFSET', true)
          this.$store.dispatch('GET_TRACKS', query)
        }
      })
    }
  }
}
</script>

<style lang="scss">
// Webpack doesn't handle globbed imports inside a .scss file,
// so for the time being we do it here
// styles.scss
// TODO: replace hardcoded path with a resolve token
@import './sass/functions';
@import './sass/variables';
@import './sass/mixins';
@import './sass/placeholders';
@import './sass/utils';
@import './sass/reset';
@import './sass/components/*.*';
@import './sass/components';
@import './sass/layout';
@import './sass/states/*.*';
@import './sass/states';
@import './sass/themes/*.*';
@import './sass/themes/default-theme/states/*.*';
@import './sass/themes';
</style>
