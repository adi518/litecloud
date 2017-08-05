<template lang="pug">
#player
  audio(id="audio" type="audio/mpeg")
  progress(id="progress" max="100")
  nav(class="nav nav--player")
    i(id="player-previous" class="btn btn--player material-icons") skip_previous
    i(id="player-playPause" class="btn btn--player material-icons") play_arrow
    i(id="player-next" class="btn btn--player material-icons") skip_next
</template>