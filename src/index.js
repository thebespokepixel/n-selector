/* ───────────╮
 │ n-selector │ Multi-gang (1 x n, 2 x n ... n x n) selection latch and emitter
 ╰────────────┴──────────────────────────────────────────────────────────────── */

import _ from 'lodash'
import sparkles from 'sparkles'
import uuid from './lib/uuid'
import {addGang} from './lib/classes/gang'

export class NSelector {
	constructor(matrix, selection, ns = uuid()) {
		this.ns = ns
		this.emtr = sparkles(this.ns)

		if (Array.isArray(matrix[0])) {
			this.matrix = _.map(matrix, (gang, idx) => addGang(gang, idx === 0))
		} else {
			this.matrix = [addGang(matrix, true)]
		}

		this.primary = _.head(_.filter(this.matrix, member => member.isPrimary))
		this.select(selection)
	}

	findLargestIndex() {
		return _.maxBy(this.matrix, member => member.memberCount)
	}

	findSelectionIndex(idx) {
		return this.primary.indexOf(idx)
	}

	findSelectionIndexByID(id) {
		return this.findSelectionIndex(_.isInteger(id) ?
			id : this.primary.indexOfMember(id))
	}

	get selected() {
		const result = _.map(this.matrix, member => member.selection(this.selectedPosition))
		return result.length === 1 ? _.head(result) : result
	}

	get namespace() {
		return this.ns
	}

	get emitter() {
		return this.emtr
	}

	select(id) {
		this.selectedIndex = this.findSelectionIndexByID(id)
		this.selectedPosition = this.primary.position(this.selectedIndex)
		this.emtr.emit('select', this.selected)
		return this.selected
	}
}

export function createSelector(matrix, selection = 0, ns) {
	if (matrix === undefined || !Array.isArray(matrix)) {
		throw new Error('Selector requires an array (or an array of arrays) as the first parameter.')
	}

	return new NSelector(matrix, selection, ns)
}
