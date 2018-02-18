<template lang="pug">
.playing v-if="show"
  h2.playing__header playing now
  #playing-thumbnail.playing__thumbnail
  #playing-description.playing__description
    #playing-title.playing__title
    #playing-artist.playing__artist
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    show() {
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
// scss-lint:disable Compass::PropertyWithMixin

@import '~@/sass/components/default';

//
// COMPONENT
//
@include component ('playing') {
  @extend %cursor-default;
  margin-top: to-rem(10);

  @include scope('.playing--no-artwork') {
    //
    .playing__thumbnail {
      background-image: url($no-artwork-path);
      border-radius: 0;
    }
  }
}
//
// ELEMENTS
//
@include component ('playing') {
  //
  @include element ('header') {
    @extend .component__header;
  }

  @include element ('thumbnail') {
    @include dim($playing-thumbnail-size);
    border-radius: to-rem(2);
    background-size: cover;
  }

  @include element ('description') {
    @extend %center;
    @extend %talign-center;
    width: 70%;
  }

  @include element ('title') {
    font-size: to-rem(13);

    &:not(:empty) {
      padding-top: to-rem(10);
    }
  }

  @include element ('artist') {
    font-size: to-rem(12);

    &:not(:empty) {
      padding-top: to-rem(10);
    }
  }
}
</style>
