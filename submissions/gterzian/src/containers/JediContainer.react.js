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
    return {
      jedis: JediStore.getState().toList(),
      scrollable: JediStore.hasJediAtHome()
    };
  }

  render() {
    return (
      <section className="css-scrollable-list">
        <JediList jedis={this.state.jedis}/>
        <JediScroll scrollable={this.state.scrollable}/>
      </section>
    );
  }
};

module.exports = Container.create(JediContainer);
