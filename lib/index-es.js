import 'sparkles';
import { randomBytes } from 'crypto';
import EventEmitter from 'events';

const uuid = a => a ? ((a ^ randomBytes(1)[0] % 16) >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);

class NSelector {
	constructor(matrix, selection, ns) {
		this.gangID = uuid();
	}
}

function createSelector(matrix, selection = 0, ns) {
	if (matrix === undefined || !Array.isArray(matrix)) {
		throw new Error('Selector requires an array (or an array of arrays) as the first parameter.');
	}
	return new NSelector(matrix, selection, ns);
}

export { createSelector };
