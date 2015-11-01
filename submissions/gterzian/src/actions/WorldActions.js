module.exports = {
  'newWorld': function(worldId, worldName) {
    return {
      'type': 'NEW_WORLD',
      'id': worldId,
      'name': worldName
    };
  }
};
