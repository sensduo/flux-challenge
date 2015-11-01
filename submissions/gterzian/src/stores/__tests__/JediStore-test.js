jest.dontMock('../JediStore');
jest.dontMock('../../dispatcher/Dispatcher');
jest.dontMock('immutable');

const JediStore = require('../JediStore');
const OrderedMap = require('immutable').OrderedMap;
const Dispatcher = require('../../dispatcher/Dispatcher');

describe('Stores: JediStore', () => {
  const jediFromEarth = {id: 1, name: 'testJedi', homeworld: {id: 12, name:'earth'}};
  const jediFromMars = {id: 2, name: 'testJediMars', homeworld: {id: 13, name:'mars'}};
  const jediFromTheMoon = {id: 1, name: 'testJedi', homeworld: {id: 10, name:'moon'}};

  describe('JediStore.getInitialState()', () => {
    it('Should return an immutable OrderedMap', () => {
      const state = JediStore.getInitialState();
      expect(OrderedMap.isOrderedMap(state)).toEqual(true);
    });
  });

  describe('JediStore: update the list of jedis', () => {
    it('Should reflect dispatched changes in Jedis', () => {
      Dispatcher.dispatch({type: 'NEW_JEDIS', jedis: [{id: 1, name: 'testJedi'}]});
      const state = JediStore.getState();
      expect(state.get(1)).toEqual({id: 1, name: 'testJedi'});
    });

    it('Should remove Jedis not in the latest action', () => {
      Dispatcher.dispatch({type: 'NEW_JEDIS', jedis: [{id: 1, name: 'testJedi'}]});
      const first_state = JediStore.getState();
      expect(first_state.get(1)).toEqual({id: 1, name: 'testJedi'});
      Dispatcher.dispatch({type: 'NEW_JEDIS', jedis: [{id: 2, name: 'test2Jedi'}]});
      const second_state = JediStore.getState();
      expect(second_state.get(2)).toEqual({id: 2, name: 'test2Jedi'});
      expect(second_state.get(1)).toEqual(undefined);
    });
  });

  describe('JediStore: change of world', () => {
    it('Should check all Jedi against the current world', () => {
      Dispatcher.dispatch({type: 'NEW_JEDIS', jedis: [jediFromEarth, jediFromMars]});
      const state = JediStore.getState();
      expect(state.get(1)).toEqual(jediFromEarth);
      expect(state.get(2)).toEqual(jediFromMars);
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      const second_state = JediStore.getState();
      const jediOnHomeWorld = {id: 1, name: 'testJedi', onCurrentWorld: true, homeworld: {id: 12, name:'earth'}}
      expect(second_state.get(1)).toEqual(jediOnHomeWorld);
      expect(second_state.get(2)).toEqual(jediFromMars);
    });
  });

  describe('JediStore: hasJediAtHome()', () => {
    it('Should return true if any Jedi is at home in the current world', () => {
      Dispatcher.dispatch({type: 'NEW_JEDIS', jedis: [jediFromEarth, jediFromMars]});
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      expect(JediStore.hasJediAtHome()).toEqual(true);
    });

    it('Should return false when none of the Jedi are at home in the current world', () => {
      Dispatcher.dispatch({type: 'NEW_JEDIS', jedis: [jediFromTheMoon, jediFromMars]});
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      expect(JediStore.hasJediAtHome()).toEqual(false);
    });
  });

});
