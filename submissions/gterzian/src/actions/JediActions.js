
module.exports = {

  'newJedis': function(jedis) {
    return {
      'type': 'NEW_JEDIS',
      'jedis': []
    }
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
