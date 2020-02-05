var ictable = require('./dist/build.js');
var hexagram1 = [7, 7, 7, 7, 7, 7];
var primaryHexagram = [7,7,7,7,6,9];
console.log(ictable)
function expect(description = '', actual, expected) {
  var msg = `Expected value of ${expected} and got ${actual}`;

  console.log('Expecting '+ description);

  if (actual === expected) {
    console.log('Test passed');
  } else {
    throw new Error(msg);
  }
}

function expectArray(description, actual, expected) {
  if (actual.every((v, i) => v === expected[i])) {
    expect(description, true, true);
  } else {
    expect(desctiption, true, false);
  }
}

expect(
  'Hexagram to resolve to the correct number',
  ictable.resolveHexagram(hexagram1),
  1
);

expect(
  'Primary hexagram with changing lines to resolve to correct number',
  ictable.resolveHexagram([6,6,7,7,9,6]),
  32
);

expectArray(
  'Secondary hexagram is correctly derived from the first',
  ictable.generateSecondaryHexagram(primaryHexagram),
  [7,7,7,7,7,8]
);
