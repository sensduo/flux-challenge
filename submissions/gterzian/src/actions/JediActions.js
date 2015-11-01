var Dispatcher = require('../dispatcher/Dispatcher');

module.exports = {

  'newJedi': function(jedi) {
    var action = {
      'type': 'NEW_JEDI',
      'jedi': jedi
    };
    Dispatcher.dispatch(action);
    return action;
  },

  'scrollUp': function(currentId) {
    return {
      'type': 'SCROLL_UP',
      'from': currentId
    };
  },

  'scrollDown': function(currentId) {
    return {
      'type': 'SCROLL_DOWN',
      'from': currentId
    };
  }

};
