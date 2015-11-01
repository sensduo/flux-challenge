import React, {Component} from 'react';

export default class JediItem extends Component {

  render() {
    <li class="css-slot">
      <h3>{this.props.name}</h3>
      <h6>Homeworld: {this.props.homeworld}</h6>
    </li>
    );
  }
};
