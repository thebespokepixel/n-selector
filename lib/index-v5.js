'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sparkles = require('sparkles');
var crypto = require('crypto');

const uuid = a => a ? ((a ^ crypto.randomBytes(1)[0] % 16) >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);

class NSelector {
  constructor(matrix, selection, ns) {
    this.gang = uuid();
  }
}

function createSelector(matrix) {
  let selection = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  let ns = arguments[2];

  return new NSelector();
}

exports.createSelector = createSelector;