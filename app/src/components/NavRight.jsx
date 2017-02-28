import React, {Component} from 'react';

export default class NavRight extends Component {
  render() {
    return (
      <nav id="nav-right" className="nav">
        <button id="toggleYoutube" className="btn btn--nav btn--solo-icon center block">
          <i className="icon material-icons">subscriptions</i>
        </button>
        <button id="toggleSettings" className="btn btn--nav btn--solo-icon center block">
          <i className="icon material-icons">settings</i>
        </button>
        <button id="toggleMute" className="btn btn--nav btn--solo-icon center block">
          <i className="icon material-icons">volume_up</i>
        </button>
        <button id="addToPlaylist" className="btn btn--nav btn--solo-icon center block">
          <i className="icon material-icons">playlist_add</i>
        </button>
        <button id="toggleRepeat" className="btn btn--nav btn--solo-icon center block">
          <i className="icon material-icons">repeat</i>
        </button>
        <button id="toggleShuffle" className="btn btn--nav btn--solo-icon center block">
          <i className="icon material-icons">shuffle</i>
        </button>
        <button id="toggleGrid" className="btn btn--nav btn--solo-icon center block">
          <i className="icon material-icons">view_headline</i>
        </button>
        <button id="replay" className="btn btn--nav btn--solo-icon center block">
          <i className="icon material-icons">autorenew</i>
        </button>
        <button id="addToFavorites" className="btn btn--nav btn--solo-icon center block">
          <i className="icon material-icons">favorite_border</i>
        </button>
      </nav>
    );
  }
}
