import React, {Component} from 'react';
import Titlebar from '../components/Titlebar.jsx';
import Nav from '../components/Nav.jsx';
import NavRight from '../components/NavRight.jsx';
import List from '../components/List.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <Titlebar/>
        <Nav/>
        <NavRight/>
        <main>
          <List/>
        </main>
        <div id="loader"/>
        <div id="overlay"/>
        <div id="mask"/>
      </div>
    );
  }
}
