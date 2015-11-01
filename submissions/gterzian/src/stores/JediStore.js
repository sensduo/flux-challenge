import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import Dispatcher from '../dispatcher/Dispatcher';


class JediStore extends ReduceStore {
  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    switch (action.type) {

      case 'NEW_JEDIS':
        return state.clear().withMutations(new_state => {
          action.jedis.forEach(jedi => {
            new_state.set(jedi.id, jedi);
          })
          return new_state;
        });

      case 'NEW_WORLD':
        return state.map(jedi => {
          if (jedi.homeworld.id === action.id) {
            jedi.onCurrentWorld = true;
          }
          return jedi;
        });

      default:
        return state;
    }
  }
}

module.exports = new JediStore(Dispatcher);
