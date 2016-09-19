import 'sparkles';
import { randomBytes } from 'crypto';

const uuid = a => a ? ((a ^ randomBytes(1)[0] % 16) >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);

class NSelector {
  constructor(matrix, selection, ns) {
    this.gang = uuid();
  }
}

function createSelector(matrix, selection = 0, ns) {
  return new NSelector();
}

export { createSelector };