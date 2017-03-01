import React, {Component} from 'react';
import {debounce} from 'throttle-debounce';

export default class Search extends Component {
  getTracks(e) {
    e.persist();
    debounce(500, () => {
      if (this.value === '') {
        return;
      }
      // call ajax
    })()
  }
  render() {
    return (<input id="search" placeholder="..." onKeyUp={this.getTracks}/>);
  }
}
