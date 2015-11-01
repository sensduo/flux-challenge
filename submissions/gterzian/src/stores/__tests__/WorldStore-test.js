jest.dontMock('../WorldStore');
jest.dontMock('immutable');

const WorldStore = require('../WorldStore');
const Map = require('immutable').Map;

describe('Stores: WorldStore', () => {

  describe('WorlStore.getInitialState()', () => {
    it('Should return an immutable Map with an id and name', () => {
      var state = WorldStore.getInitialState();
      expect(state.get("id")).toEqual("");
      expect(state.get("name")).toEqual("");
      expect(Map.isMap(state)).toEqual(true);
    });

  });
});
