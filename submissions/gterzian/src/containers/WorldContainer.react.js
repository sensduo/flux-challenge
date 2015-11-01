import {Container} from 'flux/utils';
import React, {Component} from 'react';

import WorldStore from '../stores/WorldStore';
import CurrentWorld from '../views/CurrentWorld.react.js';


class WorldContainer extends Component {
  static getStores() {
    return [WorldStore];
  }

  static calculateState(prevState) {
    return {
      world: WorldStore.getState(),
    };
  }

  render() {
    return (
      <CurrentWorld world={this.state.world.name}/>
    );
  }
};

module.exports = Container.create(WorldContainer);
