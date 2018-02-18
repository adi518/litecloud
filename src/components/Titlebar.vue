<template lang="pug">
nav#titlebar
  #title Litecloud
  #titlebar-btns
    button#minimize(class="btn btn--titlebar")
    button#maximize(class="btn btn--titlebar")
    button#terminate(class="btn btn--titlebar close rounded")
</template>

<style lang="scss" scoped>
// scss-lint:disable Compass::PropertyWithMixin

#titlebar {
  @extend %flex;
  @extend %fixed;
  @extend %full-width;
  @extend %translate3d-hack;
  z-index: 2;
  height: $titlebar-height;
  padding-top: to-rem(10);
}

#logo {
  @extend %cursor-default;
  @extend %half-border-radius;
  background-image: url($logo-path);
  margin-left: to-rem(10);
  background-size: cover;
  vertical-align: top;
  height: to-rem(20);
  width: to-rem(20);
}

#title {
  @extend %cursor-default;
  padding-left: to-rem(10);
  font-size: to-rem(12);
}

#minimize {
  @extend %overflow-hidden;
  @extend %relative;
  @extend %no-outline;
  @include dim(to-rem(20));

  @include pseudo ('before') {
    @extend %no-content;
    @extend %absolute;
    width: calc(100% - #{to-rem(2)});
    margin-bottom: to-rem(3);
    border-radius: to-rem(5);
    height: to-rem(2);
    bottom: 0;
    left: 0;
  }
}

#maximize {
  // @extend %relative;
  @include dim(to-rem(16));
  border-width: to-rem(2);
  border-style: solid;
  margin-top: to-rem(2);
  border-radius: 50%;

  &.is-active {
    border-width: 0;
    background-color: $color-tundora;
    // @include pseudo('before') {
    //     @extend %block;
    //     @extend %no-content;
    //     @extend %circle;
    //     @include dim(to-rem(10));
    //     @include align('both', 'absolute');
    //     background-color: $color-pistachio;
    // }
  }
}

// #terminate {}

#titlebar-btns {
  margin-left: auto;
  margin-right: to-rem(10);
}

.btn--titlebar {
  @extend %background-transparent;
  vertical-align: top;
  margin-left: 5px;
  border-width: 0;
}
</style>
