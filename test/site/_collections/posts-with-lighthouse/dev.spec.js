const assert = require('assert');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(
  __dirname,
  '..',
  '.tmp',
  path.basename(__dirname),
  'pages',
  'collection',
  'index.html'
);

describe('posts-with-lighthouse', function() {
  describe('postsWithLighthouse', function() {
    it('creates postsWithLighthouse collection in dev env', async function() {
      const expected = '<p>test-3</p><p>test-5</p>';
      const actual = fs.readFileSync(outputPath, 'utf8');
      assert.equal(actual, expected);
    });
  });
});
