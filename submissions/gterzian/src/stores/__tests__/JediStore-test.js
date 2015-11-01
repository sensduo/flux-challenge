jest.dontMock('../JediStore');
jest.dontMock('../../dispatcher/Dispatcher');
jest.dontMock('immutable');

const JediStore = require('../JediStore');
const OrderedMap = require('immutable').OrderedMap;
const Dispatcher = require('../../dispatcher/Dispatcher');

describe('Stores: JediStore', () => {

  describe('JediStore.getInitialState()', () => {
    it('Should return an immutable OrderedMap', () => {
      const state = JediStore.getInitialState();
      expect(OrderedMap.isOrderedMap(state)).toEqual(true);
    });
  });

  describe('JediStore.getState()', () => {
    it('Should reflect dispacted changes in Jedis', () => {
      Dispatcher.dispatch({type: 'NEW_JEDIS', jedis: [{id: 1, name: 'testJedi'}]});
      const state = JediStore.getState();
      expect(state.get(1)).toEqual({id: 1, name: 'testJedi'});
    });
  });

});
