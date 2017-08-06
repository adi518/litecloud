<template lang="pug">
nav(id="nav-right" class="nav")
    button(id="toggleYoutube" class="btn btn--nav btn--solo-icon center block" disabled)
        i(class="icon material-icons") subscriptions
    button(id="toggleSettings" class="btn btn--nav btn--solo-icon center block" disabled)
        i(class="icon material-icons") settings
    button(id="toggleMute" class="btn btn--nav btn--solo-icon center block")
        i(class="icon material-icons") volume_up
    button(id="addToPlaylist" class="btn btn--nav btn--solo-icon center block" disabled)
        i(class="icon material-icons") playlist_add
    button(id="toggleRepeat" class="btn btn--nav btn--solo-icon center block")
        i(class="icon material-icons") repeat
    button(id="toggleShuffle" class="btn btn--nav btn--solo-icon center block")
        i(class="icon material-icons") shuffle
    button(id="toggleGrid" class="btn btn--nav btn--solo-icon center block")
        i(class="icon material-icons") view_headline
    button(id="replay" class="btn btn--nav btn--solo-icon center block" data-stateless)
        i(class="icon material-icons") autorenew
    button(id="toggleLargePlayer" class="btn btn--nav btn--solo-icon center block" disabled)
        i(class="icon material-icons") view_carousel
    button(id="addToFavorites" class="btn btn--nav btn--solo-icon center block" disabled)
        i(class="icon material-icons") favorite_border
</template>