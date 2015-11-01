
module.exports = {

  'newJedis': function(jedis) {
    return {
      'Type': 'NEW_JEDIS',
      'jedis': []
    }
  },

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
