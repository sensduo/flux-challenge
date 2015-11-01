jest.dontMock('../WorldStore');
jest.dontMock('../../dispatcher/Dispatcher');
jest.dontMock('immutable');

const WorldStore = require('../WorldStore');
const Map = require('immutable').Map;
const Dispatcher = require('../../dispatcher/Dispatcher');

describe('Stores: WorldStore', () => {

  describe('WorlStore.getInitialState()', () => {
    it('Should return an immutable Map with an id and name', () => {
      var state = WorldStore.getInitialState();
      expect(state.get("id")).toEqual("");
      expect(state.get("name")).toEqual("");
      expect(Map.isMap(state)).toEqual(true);
    });
  });

  describe('WorldStore.reduce', () => {
    it('Should reduce the sate when receiving world actions', () => {
      var state = WorldStore.reduce(WorldStore.getInitialState(), {type: 'NEW_WORLD', id: 123, name: 'earth'});
      //console.log(state)
      expect(state.get("id")).toEqual(123);
      expect(state.get("name")).toEqual("earth");
      expect(Map.isMap(state)).toEqual(true);
    });
  });
});
