<template lang="pug">
#app
  Titlebar
  NavigationRight
  Navigation
  List
  #loader
  #overlay
  #mask
</template>

<script>
import materialIcons from 'material-design-icons/iconfont/material-icons.css'
import normalize from 'normalize.css'
import Titlebar from './components/Titlebar'
import Navigation from './components/Nav'
import NavigationRight from './components/NavRight'
import List from './components/List'

export default {
  components: {
    Titlebar,
    Navigation,
    NavigationRight,
    List,
  }
}
</script>

<style lang="scss">
// Webpack doesn't handle globbed imports inside a .scss file,
// so for the time being we do it here
// styles.scss
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
