<template lang="pug">
.player
  audio.audio(type="audio/mpeg")
  progress.progress(max="100")
  nav.nav
    i.player-previous(class="btn btn--player material-icons") skip_previous
    i.player-playPause(class="btn btn--player material-icons") play_arrow
    i.player-next(class="btn btn--player material-icons") skip_next
</template>

<style lang="scss" scoped>
// https://css-tricks.com/html5-progress-element/
// scss-lint:disable Compass::PropertyWithMixin

@import '~@/sass/components/buttons';

.player {
  margin-top: to-rem(16);
}

.progress {
  @extend %block;
  @extend %full-width; // override user-agent
  @extend %pointer;
  appearance: none; // TODO: add linter ignore comment
  height: to-rem(6);
  border-radius: to-rem(2);

  &::-webkit-progress {
    //
    &-bar {
      transition: width 0.2s;
      border-radius: to-rem(2);
    }

    &-value {
      border-radius: to-rem(2);
    }
  }
}

.nav {
  @extend %talign-center;
  margin-top: to-rem(10);
}

.btn.btn--player {
  // we need stronger specificity
  @extend %btn--clear;
  font-size: to-rem(45);
}
</style>
