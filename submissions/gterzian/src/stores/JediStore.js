import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import Dispatcher from '../dispatcher/Dispatcher';
import WorldStore from './WorldStore'
import {emptyJedi1, emptyJedi2} from '../constants/JediConstants'
import webApi from '../utils/web-api';

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
          return list.pop().pop().unshift(emptyJedi2).unshift(emptyJedi1);
        });

      case 'SEEK_APPRENTICES':
        if(state.count() < 5) {
          return state;
        }
        return state.withMutations((list) => {
          return list.shift().shift().push(emptyJedi1).push(emptyJedi2);
        });

      case 'NEW_JEDI':
        const currentWorld = WorldStore.getState().get('id');
        const jedi = this.checkJediHome(currentWorld)(action.jedi);
        if (state.isEmpty()) {
          return state.push(jedi);
        }
        const realJedis = state.filter(jedi => jedi.homeworld.id);
        if(realJedis.count() === 5) {
          return state;
        }
        const containsJedi = state.find((existing) => {
          return existing.id === jedi.id;
        });
        if (!containsJedi) {
          const first = state.first();
          const last = state.last();
          const master = first.master;
          if (master && (master.id === jedi.id)) {
            return state.unshift(jedi);
          }
          else {
            if (first.name === emptyJedi1.name) {
              return state.withMutations((list) => {
                return list.shift().shift().unshift(jedi);
              });
            }
            if (last.name === emptyJedi2.name) {
              return state.withMutations((list) => {
                return list.pop().pop().push(jedi);
              });
            }
            return state.push(jedi);
          }
        }
        else {
          //don't update if the Jedi is already in there
          return state;
        }

      case 'NEW_WORLD':
        const newState = this.getState().map(this.checkJediHome(action.id));
        if (this.hasJediAtHome()) {
          webApi.cancelRequests();
        }
        return newState;

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
