import React, {Component} from 'react';
import {debounce} from 'throttle-debounce';

export default class Search extends Component {
  getTracks(event) {
    event.persist();
    let value = event.target.value;
    debounce(1500, () => {
      console.log(value);
      if (value === '') {
        return;
      }
      // call ajax

    })()
  }
  render() {
    return (<input id="search" placeholder="..." onKeyUp={this.getTracks}/>);
  }
}
