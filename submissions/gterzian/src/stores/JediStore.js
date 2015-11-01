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
          const master = state.first().master;
          if (master && (master.id === jedi.id)) {
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

  firstHasMaster() {
    if (this.getState().isEmpty()) {
      return false;
    }
    let master = this.getState().first().master;
    if (master) {
      if (master.id) {
        return true;
      }
    }
    return false;
  }

  lastHasApprentice() {
    if (this.getState().isEmpty()) {
      return false;
    }
    let apprentice = this.getState().last().apprentice;
    if (apprentice) {
      if (apprentice.id) {
        return true;
      }
    }
    return false;
  }

}

module.exports = new JediStore(Dispatcher);
