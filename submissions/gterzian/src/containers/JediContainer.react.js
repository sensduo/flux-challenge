import {Container} from 'flux/utils';
import React, {Component} from 'react';

import JediStore from '../stores/JediStore';
import JediList from '../views/JediList.react.js';
import JediScroll from '../views/JediScroll.react.js';


class JediContainer extends Component {
  static getStores() {
    return [JediStore];
  }

  static calculateState(prevState) {
    const JediMap = JediStore.getState();
    return {
      jedis: JediMap.toList(),
      scrollable: !JediStore.hasJediAtHome(),
      first: JediMap.first(),
      last: JediMap.last()
    };
  }

  render() {
    return (
      <section className="css-scrollable-list">
        <JediList jedis={this.state.jedis}/>
        <JediScroll scrollable={this.state.scrollable} first={this.state.first}
          last={this.state.last}/>
      </section>
    );
  }
};

module.exports = Container.create(JediContainer);
