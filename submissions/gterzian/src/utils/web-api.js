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

  getJedi(id) {
    $.getJSON(`http://localhost:3000/dark-jedis/${id}`).done(data => {
      JediActions.newJedi(data);
    })
  }

};
