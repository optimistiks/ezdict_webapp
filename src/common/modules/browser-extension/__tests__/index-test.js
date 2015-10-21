jest.dontMock('../index.js');

describe('browser-extension', function () {

  it('is null by default', function () {

    var browserExtension = require('../index.js');

    expect(browserExtension).toBeDefined();
    expect(browserExtension).toBeNull();

  });

  it('is not null if chrome api is present in global scope', function () {

    global.chrome = {runtime: {}};

    var browserExtension = require('../index.js');

    expect(browserExtension).toBeDefined();
    expect(browserExtension).not.toBeNull();

    global.chrome = undefined;

  });

});
