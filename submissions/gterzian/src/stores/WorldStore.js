import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

import Dispatcher from '../dispatcher/Dispatcher';


class WorldStore extends ReduceStore {
  getInitialState() {
    return Immutable.Map({id: "", name: ""});
  }
}

module.exports = new WorldStore(Dispatcher);
