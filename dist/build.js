/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ic-table.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ic-table.js":
/*!*************************!*\
  !*** ./src/ic-table.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n *\n *\n * Overview\n *\n * This file contains a table of the 64 hexagrams of the I Ching\n * and their accompanying numberical value. It exposes methods\n * to create hexagrams and resolve them into the numerical values\n * they represent.\n *\n *\n * In the I Ching, a hexagram is arranged as a groups of six lines. A line may\n * be broken or unbroken. Each of these hexagrams of lines corresponds to a number.\n *\n * For example, the figure below:\n *\n * - -\n * ---\n * ---\n * ---\n * ---\n * - -\n *\n * corresponds to the number 28.\n *\n * Each of the lines of a hexagram, depending on the values used to generate the lines,\n * may also be 'changing' lines. Changing lines are still evaluated as either broken\n * or unbroken for the purposes of retreiving the hexagram's numerical value.\n *\n * However, when a second hexagram is derived from the original, the 'changing' lines\n * will always be evaluated as their opposite:\n * a changing line representing an unbroken line will become broken.\n * Unchanging lines, of course, remain the same in the.\n *\n *\n *\n *\n * Creating the hexagram\n *\n * There are several ways to derive a hexagram, and this implementation will use\n * the three coin method e.g. a coin is flipped three times to determine the line type.\n * Each series of three flips is known as a 'cast'. The outcome of the first cast\n * will the bottom line of the hexagram. 5 more casts follow, building the hexagram\n * from the bottom up.\n *\n * The following values are assigned for each flip:\n *\n * heads: 3\n * tails: 2\n *\n *\n * In this method, the three values of the cast are summed and that sum corresponds\n * to a line type. In this system, the numbers 7 and 8 represent the two basic\n * line types, 7 as an unbroken line and 8 is a broken one.\n *\n *\n * Here is the same figure as in the overview, with the line values enumerated:\n *\n * - - (8)\n * --- (7)\n * --- (7)\n * --- (7)\n * --- (7)\n * - - (8)\n *\n *\n * If a cast generates a 6 or 9, the line is considered a changing line. As noted above\n * changing lines always become their opposite (i.e. broken becomes unbroken)\n * when a second hexagram is derived.\n *\n * For example:\n *\n * original        changed\n * -X- (6)   ->    --- (7)\n * --- (7)   ->    --- (7)\n * -O- (9)   ->    - - (8)\n *\n * When the primary hexagram has changing lines, the following conversion is used:\n *\n *   the number 6  -----becomes--->  broken line (8)\n *   the number 9  -----becomes--->  solid line (7)\n *\n * When deriving a secondary hexagram from a primary one, the following algorithm is used:\n *\n * for each number\n *  if number is 7 or 9\n *    return 7\n *  if number is 6 or 8\n *    return 8\n *\n */\n\nvar UNBROKEN_LINE = 7;\nvar BROKEN_LINE = 8;\n\nvar CHANGING_LINE_O = 6;\nvar CHANGING_LINE_X = 9;\n\nvar COIN_FLIP_HEADS_VALUE = 3;\nvar COIN_FLIP_TAILS_VALUE = 2;\n\nvar MAX_HEXAGRAM_LINES = 6;\n\n/**\n * Hexagram table, according to the I Ching.\n *\n * Represented as an array of tuples, where the first element\n * is the hexagram represented as a 1d array of numbers, and the second\n * element is the number associated with that hexagram.\n */\nvar hexagrams = [[[7, 7, 7, 7, 7, 7], 1], [[8, 8, 7, 7, 7, 7], 35], [[8, 7, 8, 7, 7, 7], 5], [[7, 8, 8, 7, 7, 7], 26], [[8, 8, 8, 7, 7, 7], 11], [[7, 7, 8, 7, 7, 7], 9], [[7, 8, 7, 7, 7, 7], 14], [[8, 7, 7, 7, 7, 7], 43], [[7, 7, 7, 8, 8, 7], 25], [[8, 8, 7, 8, 8, 7], 51], [[8, 7, 8, 8, 8, 7], 3], [[7, 8, 8, 8, 8, 7], 27], [[8, 8, 8, 8, 8, 7], 24], [[7, 7, 8, 8, 8, 7], 42], [[7, 8, 7, 8, 8, 7], 21], [[8, 7, 7, 8, 8, 7], 17], [[7, 7, 7, 8, 7, 8], 6], [[8, 8, 7, 8, 7, 8], 40], [[8, 7, 8, 8, 7, 8], 29], [[7, 8, 8, 8, 7, 8], 4], [[8, 8, 8, 8, 7, 8], 7], [[7, 7, 8, 8, 7, 8], 59], [[7, 8, 7, 8, 7, 8], 64], [[8, 7, 7, 8, 7, 8], 47], [[7, 7, 7, 7, 8, 8], 33], [[8, 8, 7, 7, 8, 8], 62], [[8, 7, 8, 7, 8, 8], 39], [[7, 8, 8, 7, 8, 8], 52], [[8, 8, 8, 7, 8, 8], 15], [[7, 7, 8, 7, 8, 8], 53], [[7, 8, 7, 7, 8, 8], 56], [[8, 7, 7, 7, 8, 8], 31], [[7, 7, 7, 8, 8, 8], 12], [[8, 8, 7, 8, 8, 8], 16], [[8, 7, 8, 8, 8, 8], 8], [[7, 8, 8, 8, 8, 8], 23], [[8, 8, 8, 8, 8, 8], 2], [[7, 7, 8, 8, 8, 8], 20], [[7, 8, 7, 8, 8, 8], 35], [[8, 7, 7, 8, 8, 8], 45], [[7, 7, 7, 7, 7, 8], 44], [[8, 8, 7, 7, 7, 8], 32], [[8, 7, 8, 7, 7, 8], 48], [[7, 8, 8, 7, 7, 8], 18], [[8, 8, 8, 7, 7, 8], 46], [[7, 7, 8, 7, 7, 8], 57], [[7, 8, 7, 7, 7, 8], 50], [[8, 7, 7, 7, 7, 8], 28], [[7, 7, 7, 7, 8, 7], 13], [[8, 8, 7, 7, 8, 7], 55], [[8, 7, 8, 7, 8, 7], 63], [[7, 8, 8, 7, 8, 7], 22], [[8, 8, 8, 7, 8, 7], 36], [[7, 7, 8, 7, 8, 7], 37], [[7, 8, 7, 7, 8, 7], 30], [[8, 7, 7, 7, 8, 7], 49], [[7, 7, 7, 8, 7, 7], 10], [[8, 8, 7, 8, 7, 7], 54], [[8, 7, 8, 8, 7, 7], 60], [[7, 8, 8, 8, 7, 7], 41], [[8, 8, 8, 8, 7, 7], 19], [[7, 7, 8, 8, 7, 7], 61], [[7, 8, 7, 8, 7, 7], 38], [[8, 7, 7, 8, 7, 7], 58]];\n\n/**\n * Simulate a coin flip.\n * @return {Number} 3 or 2, 3 for heads, 2 for tails.\n */\nfunction flip() {\n  return Math.random() >= 0.5 ? COIN_FLIP_HEADS_VALUE : COIN_FLIP_TAILS_VALUE;\n}\n\nfunction isChanging(lineValue) {\n  return lineValue === CHANGING_LINE_O || lineValue === CHANGING_LINE_X;\n}\n\nfunction assignChangingLineValue(value) {\n  switch (value) {\n    case CHANGING_LINE_O:\n      return UNBROKEN_LINE;\n    case CHANGING_LINE_X:\n      return BROKEN_LINE;\n    default:\n      return value;\n  }\n}\n\nfunction assignLineValue(value) {\n  switch (value) {\n    case CHANGING_LINE_O:\n      return BROKEN_LINE;\n    case CHANGING_LINE_X:\n      return UNBROKEN_LINE;\n    default:\n      return value;\n  }\n}\n\nfunction generateHexagram() {\n  var hexagram = [];\n\n  while (hexagram.length < MAX_HEXAGRAM_LINES) {\n    hexagram.unshift(flip() + flip() + flip());\n  }\n\n  return hexagram;\n}\n\nfunction generateSecondaryHexagram(hexagram) {\n  return hexagram.map(assignChangingLineValue);\n}\n\n/**\n * Get a random number given a hexagram.\n * @param  {Array} hexagram The hexagram to match\n * @param  {Boolean} primary  If the hexagram is a primary or moved hexagram\n * @return {Number}          The number corresponding to the hexagram\n */\nfunction resolveHexagram(hexagram) {\n  // index of the match in the hexagram table\n  var matchIndex = void 0;\n\n  // If the hexagram has moving lines (is a primary hexagram), translate them.\n  var comparator = hexagram.map(assignLineValue);\n\n  // Loop through the hexagram table for a match\n  hexagrams.some(function (hex, hexIndex) {\n    // Get the actual hexagram out of the tuple\n    var thisHexagram = hex[0];\n\n    // Check each line of the hexagram. Returns false and moves to the next\n    // hexagram as soon as a line doesn't match\n    var isMatch = thisHexagram.every(function (line, lineIndex) {\n      return line === comparator[lineIndex];\n    });\n\n    if (isMatch) {\n      // store the current index so we can look it up in the hexagram table\n      matchIndex = hexIndex;\n    }\n\n    return isMatch;\n  });\n\n  return hexagrams[matchIndex][1];\n}\n\nexports.generateHexagram = generateHexagram;\nexports.generateSecondaryHexagram = generateSecondaryHexagram;\nexports.resolveHexagram = resolveHexagram;\n\n/**\n  *\n  * How to use:\n  *\n  * Generate a sequence of hexagrams. Pick several ranges of values. Map the value of\n  * the hexagram to the corresponding range, and then assign some value to the range.\n  * For example, pitches:\n  *\n  * 1-8: C\n  * 9-16: D\n  * 17-24: E\n  * ...and so on...\n**/\n\n//# sourceURL=webpack:///./src/ic-table.js?");

/***/ })

/******/ });