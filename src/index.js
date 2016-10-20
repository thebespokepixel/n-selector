/* ───────────╮
 │ n-selector │ ©2016 Mark Griffiths mark@thebespokepixel.com
 ╰────────────┴─────────────────────────────────────────────────────────────────*/
/**
 * Multi-gang (1 x n, 2 x n ... n x n) selection latch and emitter
 * @module n-selector
 */

import sparkles from 'sparkles'

import {uuid} from './lib/uuid'
import {addGang} from './lib/classes/gang'

class NSelector {
	constructor(matrix, selection, ns) {
		this.gangID = uuid()
	}
}

export function createSelector(matrix, selection = 0, ns) {
	if (matrix === undefined || !Array.isArray(matrix)) {
		throw new Error('Selector requires an array (or an array of arrays) as the first parameter.')
	}
	return new NSelector(matrix, selection, ns)
}
