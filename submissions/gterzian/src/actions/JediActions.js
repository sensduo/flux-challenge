var Dispatcher = require('../dispatcher/Dispatcher');

module.exports = {

  'newJedi': function(jedi) {
    var action = {
      'type': 'NEW_JEDI',
      'jedi': jedi
    };
    Dispatcher.dispatch(action);
    return action;
  }
  
};
