/* ───────────╮
 │ n-selector │ Multi-gang (1 x n, 2 x n ... n x n) selection latch and emitter
 ╰────────────┴──────────────────────────────────────────────────────────────── */

import _ from 'lodash'
import sparkles from 'sparkles'
import uuid from './lib/uuid'
import {addGang} from './lib/classes/gang'

/**
 * Create an NSelector instance
 * @return {NSelector}        NSelector ganged selector.
 */
export class NSelector {
	/**
	 * @param  {Array[]} matrix    An array or array of arrays of selectable items.
	 * @param  {Number} selection Current selection.
	 * @param  {String} ns        Sparkles namespace.
	 */
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

	/**
	 * Find the largest (maximal) index in the selector.
	 * @return {Number} Largest index value.
	 */
	findLargestIndex() {
		return _.maxBy(this.matrix, member => member.memberCount)
	}

	/**
	 * Find the primary index.
	 * @param  {String} idx The index to find.
	 * @return {Number}     The position of the index.
	 */
	findSelectionIndex(idx) {
		return this.primary.indexOf(idx)
	}

	/**
	 * Find the position of the ID string.
	 * @param  {integer|String} id The ID to find.
	 * @return {String}    [description]
	 */
	findSelectionIndexByID(id) {
		return this.findSelectionIndex(_.isInteger(id) ?
			id : this.primary.indexOfMember(id))
	}

	/**
	 * Get currently selected item.
	 * @return {Value} Selected value.
	 */
	get selected() {
		const result = _.map(this.matrix, member => member.selection(this.selectedPosition))
		return result.length === 1 ? _.head(result) : result
	}

	/**
	 * Get Sparkles namespace
	 * @return {String} Namespace.
	 */
	get namespace() {
		return this.ns
	}

	/**
	 * Get Sparkles emitter
	 * @return {EventEmitter} Event emitter.
	 */
	get emitter() {
		return this.emtr
	}

	/**
	 * Select an index in the selector.
	 * @param  {Number} id Index.
	 * @return {Value} Returned value.
	 */
	select(id) {
		this.selectedIndex = this.findSelectionIndexByID(id)
		this.selectedPosition = this.primary.position(this.selectedIndex)
		this.emtr.emit('select', this.selected)
		return this.selected
	}
}

/**
 * Create a new n-selector.
 * @param  {Array[]} matrix    Array or array of arrays of selectable options.
 * @param  {Number} selection Current selection.
 * @param  {String} ns        Sparkles emitter namespace.
 * @return {NSelector} NSelector ganged selector.
 */
export function createSelector(matrix, selection = 0, ns = uuid()) {
	if (matrix === undefined || !Array.isArray(matrix)) {
		throw new Error('Selector requires an array (or an array of arrays) as the first parameter.')
	}

	return new NSelector(matrix, selection, ns)
}
