import React, {Component} from 'react';

import JediItem from '../views/JediItem.react.js';

export default class JediList extends Component {

  render() {
    const jedis = this.props.jedis;
    const jediItems = jedis.map(jedi => {
      return <JediItem name={jedi.name} homeworld={jedi.homeworld.name} />;
    })
    return (
      <ul className="css-slots">
        {jediItems}
      </ul>
    );
  }
};
