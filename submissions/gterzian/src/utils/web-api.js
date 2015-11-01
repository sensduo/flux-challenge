import WorldActions from '../actions/WorldActions';

module.exports = {
  openWs() {
    new WebSocket('ws://localhost:4000').onmessage = (event) => {
      const world = JSON.parse(event.data);
      console.log(world);
      WorldActions.newWorld(world.id, world.name);
    }
  }

};
