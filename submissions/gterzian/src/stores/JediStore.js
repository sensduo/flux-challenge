import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import Dispatcher from '../dispatcher/Dispatcher';
import WorldStore from './WorldStore'


class JediStore extends ReduceStore {
  getInitialState() {
    return Immutable.List();
  }

  reduce(state, action) {
    switch (action.type) {

      case 'CLEAR':
        return state.clear();

      case 'SEEK_MASTERS':
        if(state.count() < 5) {
          return state;
        }
        return state.withMutations((list) => {
          return list.pop().pop().unshift(undefined).unshift(undefined);
        });

      case 'SEEK_APPRENTICES':
        if(state.count() < 5) {
          return state;
        }
        return state.withMutations((list) => {
          return list.shift().shift().push(undefined).push(undefined);
        });

      case 'NEW_JEDI':
        const currentWorld = WorldStore.getState().get('id');
        const jedi = this.checkJediHome(currentWorld)(action.jedi);
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
        return this.getState().map(this.checkJediHome(action.id));

      default:
        return state;
    }
  }

  checkJediHome(homeId) {
    return (jedi) => {
      if (jedi.homeworld.id === homeId) {
        jedi.onCurrentWorld = true;
      }
      else {
        jedi.onCurrentWorld = false;
      }
      return jedi;
    };
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
