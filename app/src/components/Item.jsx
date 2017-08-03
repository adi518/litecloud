import React, {Component} from 'react';

export default class List extends Component {
  render() {
    return (
      <div className="item">
        <div className="item__thumbnail">
          <div className="item__icon"/>
          <div className="item__tag"/>
        </div>
        <ul className="item__meta">
          <li className="item__title"/>
          <li className="item__creator">
            <small className="item__author"/>
            <small className="item__duration"/>
          </li>
        </ul>
      </div>
    );
  }
}
