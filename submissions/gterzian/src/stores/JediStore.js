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
        if (state.isEmpty()) {
          return state.push(jedi);
        }
        const containsJedi = state.find((existing) => {
          return existing.id === jedi.id;
        });
        if (!containsJedi) {
          if(state.first().master.id === jedi.id) {
            //put masters on top
            return state.unshift(jedi);
          }
          else {
            return state.push(jedi);
          }
        }
        else {
          //don't update if the Jedi is already in there
          return state;
        }


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
