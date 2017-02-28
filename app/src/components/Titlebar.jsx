import React, {Component} from 'react';

export default class Titlebar extends Component {
  render() {
    return (
      <nav id="titlebar">
        <div id="logo"/>
        <div id="title">Litecloud</div>
        <div id="titlebar-btns">
          <button id="minimize" className="btn btn--titlebar"/>
          <button id="maximize" className="btn btn--titlebar"/>
          <button id="terminate" className="btn btn--titlebar close rounded"/>
        </div>
      </nav>
    );
  }
}
