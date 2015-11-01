jest.dontMock('../JediStore');
jest.dontMock('../../dispatcher/Dispatcher');
jest.dontMock('immutable');

const JediStore = require('../JediStore');
const List = require('immutable').List;
const Dispatcher = require('../../dispatcher/Dispatcher');

describe('Stores: JediStore', () => {
  const jediFromEarth = {id: 1, name: 'testJediEarth', homeworld: {id: 12, name:'earth'}, master: {id: 3}, apprentice: {id:1}};
  const jediFromMars = {id: 2, name: 'testJediMars', homeworld: {id: 13, name:'mars'}, master: {id: 1}};
  const jediFromTheMoon = {id: 3, name: 'testJediMoon', homeworld: {id: 10, name:'moon'}, apprentice: {id: 1}};

  beforeEach(function() {
    Dispatcher.dispatch({type: 'CLEAR'});
  });

  describe('JediStore.getInitialState()', () => {
    it('Should return an immutable List', () => {
      const state = JediStore.getInitialState();
      expect(List.isList(state)).toEqual(true);
    });
  });

  describe('JediStore: update the list of jedis', () => {
    it('Should reflect dispatched changes in Jedis', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      const state = JediStore.getState();
      expect(state.get(0)).toEqual(jediFromEarth);
    });

    it('When receiving new jedis, add them and keep old ones', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      const second_state = JediStore.getState();
      expect(second_state.get(0)).toEqual(jediFromEarth);
      expect(second_state.get(1)).toEqual(jediFromMars);
    });

    it('Should ignore actions for Jedis already in there', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      const second_state = JediStore.getState();
      expect(second_state.get(0)).toEqual(jediFromEarth);
      expect(second_state.get(1)).toEqual(undefined);
    })

    it('Should push apprentices into the list, unshift masters', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      const second_state = JediStore.getState();
      expect(second_state.get(0)).toEqual(jediFromEarth);
      expect(second_state.get(1)).toEqual(jediFromMars);
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      const third_state = JediStore.getState();
      expect(third_state.get(0)).toEqual(jediFromTheMoon);
      expect(third_state.get(1)).toEqual(jediFromEarth);
      expect(third_state.get(2)).toEqual(jediFromMars);
    })
  });

  describe('JediStore: change of world', () => {
    it('Should check all Jedi against the current world', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      const state = JediStore.getState();
      expect(state.get(0)).toEqual(jediFromEarth);
      expect(state.get(1)).toEqual(jediFromMars);
      Dispatcher.dispatch({type: 'NEW_WORLD', id: 12, name: 'earth'});
      const second_state = JediStore.getState();
      expect(second_state.get(0).onCurrentWorld).toEqual(true);
      expect(second_state.get(1).onCurrentWorld).toEqual(false);
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

  describe('JediStore: firstHasMaster()', () => {
    it('Should return true if the first Jedi has a known master', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      const state = JediStore.getState();
      expect(JediStore.firstHasMaster()).toEqual(true);
    });

    it('Should return false if the first Jedi has no known master', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromTheMoon});
      const state = JediStore.getState();
      expect(JediStore.firstHasMaster()).toEqual(false);
    });

    it('Should return false for an empty state', () => {
      const state = JediStore.getState();
      expect(JediStore.firstHasMaster()).toEqual(false);
    });
  });

  describe('JediStore: lastHasApprentice()', () => {
    it('Should return true if the last Jedi has an known apprentice', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromEarth});
      const state = JediStore.getState();
      expect(JediStore.lastHasApprentice()).toEqual(true);
    });

    it('Should return false if the last Jedi has no known apprentice', () => {
      Dispatcher.dispatch({type: 'NEW_JEDI', jedi: jediFromMars});
      const state = JediStore.getState();
      expect(JediStore.lastHasApprentice()).toEqual(false);
    });

    it('Should return false for an empty state', () => {
      const state = JediStore.getState();
      expect(JediStore.firstHasMaster()).toEqual(false);
    });
  })

});
