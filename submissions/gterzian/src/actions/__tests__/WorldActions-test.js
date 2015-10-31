jest.dontMock('../WorldActions');
var WorldActions = require('../WorldActions');

describe('Actions: WorldActions', () => {

  describe('WorldActions.newWorld', () => {
    it('Should return an Action of type NEW_WORLD', () => {
      var newWorldAction = WorldActions.newWorld();
      expect(newWorldAction.Type).toEqual('NEW_WORLD');
    });

    it('Should return an Action with the id of the new world', () => {
      var newWorldAction = WorldActions.newWorld('test_world');
      expect(newWorldAction.worldId).toEqual('test_world');
    });
  });
});
