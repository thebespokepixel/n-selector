/* ───────────╮
 │ n-selector │ ©2016 Mark Griffiths mark@thebespokepixel.com
 ╰────────────┴─────────────────────────────────────────────────────────────────*/
/**
 * Multi-gang (1 x n, 2 x n ... n x n) selection latch and emitter
 * @module n-selector
 */

import sparkles from 'sparkles'

import {uuid} from './uuid'
import {addGang} from './classes/gang'

class NSelector {
	constructor (matrix, selection, ns) {
		this.gang = uuid()
	}
}

export function createSelector(matrix, selection = 0, ns) {
	 return new NSelector()
}
