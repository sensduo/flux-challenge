jest.dontMock('../JediActions');
var JediActions = require('../JediActions');

describe('Actions: JediActions', () => {

  describe('JediActions.scrollUp', () => {
    it('Should return an Action of type SCROLL_UP', () => {
      var scrollUpAction = JediActions.scrollUp();
      expect(scrollUpAction.type).toEqual('SCROLL_UP');
    });

    it('Should return an Action with the id passed to it under "from"', () => {
      var scrollUpAction = JediActions.scrollUp("test");
      expect(scrollUpAction.from).toEqual("test");
    });
  });

  describe('JediActions.scrollDown', () => {
    it('Should return an Action of type SCROLL_DOWN', () => {
      var scrollDownAction = JediActions.scrollDown();
      expect(scrollDownAction.type).toEqual('SCROLL_DOWN');
    });

    it('Should return an Action with the id passed to it under "from"', () => {
      var scrollDownAction = JediActions.scrollDown('test');
      expect(scrollDownAction.from).toEqual('test');
    });
  });
});
