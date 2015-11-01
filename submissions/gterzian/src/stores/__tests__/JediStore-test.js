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
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      const state = JediStore.getState();
      expect(state.get(1)).toEqual(jediFromEarth);
    });

    it('When receiving new jedis, add them and keep old ones', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      const second_state = JediStore.getState();
      expect(second_state.get(1)).toEqual(jediFromEarth);
      expect(second_state.get(2)).toEqual(jediFromMars);
    });
  });

  describe('JediStore: change of world', () => {
    it('Should check all Jedi against the current world', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      const state = JediStore.getState();
      expect(state.get(1)).toEqual(jediFromEarth);
      expect(state.get(2)).toEqual(jediFromMars);
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      const second_state = JediStore.getState();
      expect(second_state.get(1).onCurrentWorld).toEqual(true);
      expect(second_state.get(2).onCurrentWorld).toEqual(false);
    });
  });

  describe('JediStore: hasJediAtHome()', () => {
    it('Should return true if any Jedi is at home in the current world', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      expect(JediStore.hasJediAtHome()).toEqual(true);
    });

    it('Should return false when none of the Jedi are at home in the current world', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      expect(JediStore.hasJediAtHome()).toEqual(false);
    });
  });

});
