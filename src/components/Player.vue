<template lang="pug">
#player
  audio#audio(type="audio/mpeg")
  progress#progress(max="100")
  nav(class="nav nav--player")
    i#player-previous(class="btn btn--player material-icons") skip_previous
    i#player-playPause(class="btn btn--player material-icons") play_arrow
    i#player-next(class="btn btn--player material-icons") skip_next
</template>