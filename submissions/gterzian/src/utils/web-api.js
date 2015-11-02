import $ from "jquery"

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
    })
  }

};
