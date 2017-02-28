import React, {Component} from 'react';
import Player from '../components/Player.jsx';
import Search from '../components/Search.jsx';

export default class Nav extends Component {
  render() {
    return (
      <nav id="nav" className="nav">
        <Search/>
        <Player/>
      </nav>
    );
  }
}
