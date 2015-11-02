import $ from "jquery"
import Q from "q";

import WorldActions from '../actions/WorldActions';
import JediActions from '../actions/JediActions';

module.exports = {
  openWs() {
    new WebSocket('ws://localhost:4000').onmessage = (event) => {
      const world = JSON.parse(event.data);
      WorldActions.newWorld(world.id, world.name);
    }
  },

  getJedi(url, side) {
    let deferred = Q.defer();
    $.getJSON(url).done(first => {
      JediActions.newJedi(first);
      if (side === 'Master') {
        $.getJSON(first.master.url).done(second => {
          JediActions.newJedi(second);
        });
      }
      else {
        $.getJSON(first.apprentice.url).done(second => {
          JediActions.newJedi(second);
        });
      }
      deferred.resolve(first);
    })
    return deferred.promise;
  }

};
