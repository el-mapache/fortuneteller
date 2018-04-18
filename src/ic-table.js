/**
 *
 *
 * Overview
 *
 * This file contains a table of the 64 hexagrams of the I Ching
 * and their accompanying numberical value. It exposes methods
 * to create hexagrams and resolve them into the numerical values
 * they represent.
 *
 *
 * In the I Ching, a hexagram is arranged as a groups of six lines. A line may
 * be broken or unbroken. Each of these hexagrams of lines corresponds to a number.
 *
 * For example, the figure below:
 *
 * - -
 * ---
 * ---
 * ---
 * ---
 * - -
 *
 * corresponds to the number 28.
 *
 * Each of the lines of a hexagram, depending on the values used to generate the lines,
 * may also be 'changing' lines. Changing lines are still evaluated as either broken
 * or unbroken for the purposes of retreiving the hexagram's numerical value.
 *
 * However, when a second hexagram is derived from the original, the 'changing' lines
 * will always be evaluated as their opposite:
 * a changing line representing an unbroken line will become broken.
 * Unchanging lines, of course, remain the same in the.
 *
 *
 *
 *
 * Creating the hexagram
 *
 * There are several ways to derive a hexagram, and this implementation will use
 * the three coin method e.g. a coin is flipped three times to determine the line type.
 * Each series of three flips is known as a 'cast'. The outcome of the first cast
 * will the bottom line of the hexagram. 5 more casts follow, building the hexagram
 * from the bottom up.
 *
 * The following values are assigned for each flip:
 *
 * heads: 3
 * tails: 2
 *
 *
 * In this method, the three values of the cast are summed and that sum corresponds
 * to a line type. In this system, the numbers 7 and 8 represent the two basic
 * line types, 7 as an unbroken line and 8 is a broken one.
 *
 *
 * Here is the same figure as in the overview, with the line values enumerated:
 *
 * - - (8)
 * --- (7)
 * --- (7)
 * --- (7)
 * --- (7)
 * - - (8)
 *
 *
 * If a cast generates a 6 or 9, the line is considered a changing line. As noted above
 * changing lines always become their opposite (i.e. broken becomes unbroken)
 * when a second hexagram is derived.
 *
 * For example:
 *
 * original        changed
 * -X- (6)   ->    --- (7)
 * --- (7)   ->    --- (7)
 * -O- (9)   ->    - - (8)
 *
 * When the primary hexagram has changing lines, the following conversion is used:
 *
 *   the number 6  -----becomes--->  broken line (8)
 *   the number 9  -----becomes--->  solid line (7)
 *
 * When deriving a secondary hexagram from a primary one, the following algorithm is used:
 *
 * for each number
 *  if number is 7 or 9
 *    return 7
 *  if number is 6 or 8
 *    return 8
 *
 */

const UNBROKEN_LINE = 7;
const BROKEN_LINE = 8;

const CHANGING_LINE_O = 6;
const CHANGING_LINE_X = 9;

const COIN_FLIP_HEADS_VALUE = 3;
const COIN_FLIP_TAILS_VALUE = 2;

const MAX_HEXAGRAM_LINES = 6;

/**
 * Hexagram table, according to the I Ching.
 *
 * Represented as an array of tuples, where the first element
 * is the hexagram represented as a 1d array of numbers, and the second
 * element is the number associated with that hexagram.
 */
const hexagrams = [
  [[7, 7, 7, 7, 7, 7], 1],
  [[8, 8, 7, 7, 7, 7], 35],
  [[8, 7, 8, 7, 7, 7], 5],
  [[7, 8, 8, 7, 7, 7], 26],
  [[8, 8, 8, 7, 7, 7], 11],
  [[7, 7, 8, 7, 7, 7], 9],
  [[7, 8, 7, 7, 7, 7], 14],
  [[8, 7, 7, 7, 7, 7], 43],
  [[7, 7, 7, 8, 8, 7], 25],
  [[8, 8, 7, 8, 8, 7], 51],
  [[8, 7, 8, 8, 8, 7], 3],
  [[7, 8, 8, 8, 8, 7], 27],
  [[8, 8, 8, 8, 8, 7], 24],
  [[7, 7, 8, 8, 8, 7], 42],
  [[7, 8, 7, 8, 8, 7], 21],
  [[8, 7, 7, 8, 8, 7], 17],
  [[7, 7, 7, 8, 7, 8], 6],
  [[8, 8, 7, 8, 7, 8], 40],
  [[8, 7, 8, 8, 7, 8], 29],
  [[7, 8, 8, 8, 7, 8], 4],
  [[8, 8, 8, 8, 7, 8], 7],
  [[7, 7, 8, 8, 7, 8], 59],
  [[7, 8, 7, 8, 7, 8], 64],
  [[8, 7, 7, 8, 7, 8], 47],
  [[7, 7, 7, 7, 8, 8], 33],
  [[8, 8, 7, 7, 8, 8], 62],
  [[8, 7, 8, 7, 8, 8], 39],
  [[7, 8, 8, 7, 8, 8], 52],
  [[8, 8, 8, 7, 8, 8], 15],
  [[7, 7, 8, 7, 8, 8], 53],
  [[7, 8, 7, 7, 8, 8], 56],
  [[8, 7, 7, 7, 8, 8], 31],
  [[7, 7, 7, 8, 8, 8], 12],
  [[8, 8, 7, 8, 8, 8], 16],
  [[8, 7, 8, 8, 8, 8], 8],
  [[7, 8, 8, 8, 8, 8], 23],
  [[8, 8, 8, 8, 8, 8], 2],
  [[7, 7, 8, 8, 8, 8], 20],
  [[7, 8, 7, 8, 8, 8], 35],
  [[8, 7, 7, 8, 8, 8], 45],
  [[7, 7, 7, 7, 7, 8], 44],
  [[8, 8, 7, 7, 7, 8], 32],
  [[8, 7, 8, 7, 7, 8], 48],
  [[7, 8, 8, 7, 7, 8], 18],
  [[8, 8, 8, 7, 7, 8], 46],
  [[7, 7, 8, 7, 7, 8], 57],
  [[7, 8, 7, 7, 7, 8], 50],
  [[8, 7, 7, 7, 7, 8], 28],
  [[7, 7, 7, 7, 8, 7], 13],
  [[8, 8, 7, 7, 8, 7], 55],
  [[8, 7, 8, 7, 8, 7], 63],
  [[7, 8, 8, 7, 8, 7], 22],
  [[8, 8, 8, 7, 8, 7], 36],
  [[7, 7, 8, 7, 8, 7], 37],
  [[7, 8, 7, 7, 8 ,7], 30],
  [[8, 7, 7, 7, 8, 7], 49],
  [[7, 7, 7, 8, 7, 7], 10],
  [[8, 8, 7, 8, 7, 7], 54],
  [[8, 7, 8, 8, 7, 7], 60],
  [[7, 8, 8, 8, 7, 7], 41],
  [[8, 8, 8, 8, 7, 7], 19],
  [[7, 7, 8, 8, 7, 7], 61],
  [[7, 8, 7, 8, 7, 7], 38],
  [[8, 7, 7, 8, 7, 7], 58]
];

/**
 * Simulate a coin flip.
 * @return {Number} 3 or 2, 3 for heads, 2 for tails.
 */
function flip() {
  return Math.random() >= 0.5 ? COIN_FLIP_HEADS_VALUE : COIN_FLIP_TAILS_VALUE;
}

function isChanging(lineValue) {
  return lineValue === CHANGING_LINE_O || lineValue === CHANGING_LINE_X;
}

function assignChangingLineValue(value) {
  switch(value) {
    case CHANGING_LINE_O:
      return UNBROKEN_LINE;
    case CHANGING_LINE_X:
      return BROKEN_LINE;
    default:
      return value;
  }
}

function assignLineValue(value) {
  switch(value) {
    case CHANGING_LINE_O:
      return BROKEN_LINE;
    case CHANGING_LINE_X:
      return UNBROKEN_LINE;
    default:
      return value;
  }
}

function generateHexagram() {
  let hexagram = [];

  while (hexagram.length < MAX_HEXAGRAM_LINES) {
    hexagram.unshift(flip() + flip() + flip());
  }

  return hexagram;
}

function generateSecondaryHexagram(hexagram) {
  return hexagram.map(assignChangingLineValue);
}

/**
 * Get a random number given a hexagram.
 * @param  {Array} hexagram The hexagram to match
 * @param  {Boolean} primary  If the hexagram is a primary or moved hexagram
 * @return {Number}          The number corresponding to the hexagram
 */
function resolveHexagram(hexagram) {
  // index of the match in the hexagram table
  let matchIndex;

  // If the hexagram has moving lines (is a primary hexagram), translate them.
  const comparator = hexagram.map(assignLineValue);

  // Loop through the hexagram table for a match
  hexagrams.some((hex, hexIndex) => {
    // Get the actual hexagram out of the tuple
    const thisHexagram = hex[0];

    // Check each line of the hexagram. Returns false and moves to the next
    // hexagram as soon as a line doesn't match
    const isMatch = thisHexagram.every((line, lineIndex) => {
      return line === comparator[lineIndex];
    });

    if (isMatch) {
      // store the current index so we can look it up in the hexagram table
      matchIndex = hexIndex;
    }

    return isMatch;
  });

  return hexagrams[matchIndex][1];
}

export {
  generateHexagram,
  generateSecondaryHexagram,
  resolveHexagram
};


/**
  *
  * How to use:
  *
  * Generate a sequence of hexagrams. Pick several ranges of values. Map the value of
  * the hexagram to the corresponding range, and then assign some value to the range.
  * For example, pitches:
  *
  * 1-8: C
  * 9-16: D
  * 17-24: E
  * ...and so on...
**/
