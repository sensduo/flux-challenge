
module.exports = {

  'scrollUp': function(currentId) {
    return {
      'Type': 'SCROLL_UP',
      'from': currentId
    };
  },

  'scrollDown': function(currentId) {
    return {
      'Type': 'SCROLL_DOWN',
      'from': currentId
    };
  }

};
