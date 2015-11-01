import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import Dispatcher from '../dispatcher/Dispatcher';


class JediStore extends ReduceStore {
  getInitialState() {
    return Immutable.List();
  }

  reduce(state, action) {
    switch (action.type) {

      case 'CLEAR':
        return state.clear();

      case 'NEW_JEDI':
        const jedi = action.jedi;
        return state.push(jedi);

      case 'NEW_WORLD':
        return state.map(jedi => {
          if (jedi.homeworld.id === action.id) {
            jedi.onCurrentWorld = true;
          }
          else {
            jedi.onCurrentWorld = false;
          }
          return jedi;
        });

      default:
        return state;
    }
  }

  hasJediAtHome() {
    return this.getState().some(jedi => jedi.onCurrentWorld);
  }

}

module.exports = new JediStore(Dispatcher);
