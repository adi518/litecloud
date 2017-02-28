import React, {Component} from 'react';
import Item from '../components/Item.jsx';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [1, 2, 3]
    };
  }

  fill() {
    return this.state.items.map((item, index) => <li key={index}>{item}</li>);
  }

  render() {
    return (
      <section id="list" className="list">
        {this.fill()}
      </section>
    );
  }
}
