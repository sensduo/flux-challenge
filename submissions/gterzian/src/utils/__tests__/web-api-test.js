jest.dontMock('../web-api')

const WORLDS = require('../web-api');

describe('Worlds', () => {
  it('Should return the list of worlds', () => {
    expect(WORLDS[0]).toEqual({
      id: 8,
      name: 'Cato Neimoidia'
    });
  })

})
