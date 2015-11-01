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

  getJedis() {
    $.getJSON('http://localhost:3000/dark-jedis/').done(data => {
      console.log(data)
      JediActions.newJedis(data);
      })
  }

};
