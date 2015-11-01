import React, {Component} from 'react';

import JediItem from '../views/JediItem.react.js';

export default class JediList extends Component {

  render() {
    const jedis = this.props.jedis;
    let jediItems = [];
    for (let jedi of jedis) {
      jediItems.push(<JediItem key={jedi.id} name={jedi.name} homeworld={jedi.homeworld.name} />);
    }
    return (
      <ul className="css-slots">
        {jediItems}
      </ul>
    );
  }
};
