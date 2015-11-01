jest.dontMock('../web-api')

const webApi = require('../web-api');

describe('webApi', () => {
  it('Should be an object', () => {
    expect(webApi).toBeDefined();;
  });
});
