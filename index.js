import _ from 'lodash';
import sparkles from 'sparkles';
import { randomBytes } from 'node:crypto';

/**
 * Calculate a valid RFC4122 UUID
 * @function
 * @private
 * @param  {String} a Recursive parameter used to build UUID.
 * @return {String}   Resultant UUID
 * @example
 * import uuid from './uuid'
 * const UUID = uuid()
 */
const uuid = a => a
	? ((a ^	randomBytes(1)[0] % 16) >> a / 4).toString(16)
	: ([1e7] +	-1e3 + -4e3 + -8e3 +	-1e11).replace(/[018]/g, uuid);

/**
 * @private
 */
class Gang {
	/**
	 * Represents a single gang of switch positions.
	 * @param  {string[]}  members The gang's named positions
	 * @param  {boolean} primaryIndex Is this gang the primary index?
	 * @property {number} memberCount Get the number of members in this gang.
	 */
	constructor(members, primaryIndex = false) {
		if (members === undefined || !Array.isArray(members)) {
			throw new Error('A selection gang requires an array of members as the first parameter.')
		}
		this.members = members;
		this.index = 0;
		this.isPrimaryIndex = primaryIndex;
	}
	get memberCount() {
		return this.members.length
	}
	get isPrimary() {
		return this.isPrimaryIndex
	}
	selection(position) {
		return this.members[Math.floor(position * this.members.length)]
	}
	position(idx) {
		return this.indexOf(idx) / this.members.length
	}
	indexOfMember(id) {
		const idx = this.members.indexOf(id);
		if (idx < 0) {
			throw new Error(`${id} not found.`)
		}
		return idx
	}
	indexOf(idx) {
		if (idx < 0) {
			idx = 0;
		}
		if (idx > this.members.length) {
			idx = this.members.length;
		}
		return idx
	}
}
/**
 * Add a gang of members.
 * @private
 * @param {Array}  members   Gang members.
 * @param {Boolean} isPrimary Is the primary gang.
 * @returns {Gang} Gang object.
 */
function addGang(members, isPrimary) {
	return new Gang(members, isPrimary)
}

/**
 * Create an NSelector instance
 * @return {NSelector}        NSelector ganged selector.
 */
class NSelector {
	/**
	 * @param  {Array[]} matrix    An array or array of arrays of selectable items.
	 * @param  {number} selection Current selection.
	 * @param  {string} ns        Sparkles namespace.
	 */
	constructor(matrix, selection, ns = uuid()) {
		this.ns = ns;
		this.emtr = sparkles(this.ns);
		if (Array.isArray(matrix[0])) {
			this.matrix = _.map(matrix, (gang, idx) => addGang(gang, idx === 0));
		} else {
			this.matrix = [addGang(matrix, true)];
		}
		this.primary = _.head(_.filter(this.matrix, member => member.isPrimary));
		this.select(selection);
	}
	/**
	 * Find the largest (maximal) index in the selector.
	 * @return {number} Largest index value.
	 */
	findLargestIndex() {
		return _.maxBy(this.matrix, member => member.memberCount)
	}
	/**
	 * Find the primary index.
	 * @param  {string} idx The index to find.
	 * @return {number}     The position of the index.
	 */
	findSelectionIndex(idx) {
		return this.primary.indexOf(idx)
	}
	/**
	 * Find the position of the ID string.
	 * @param  {number|string} id The ID to find.
	 * @return {string}    [description]
	 */
	findSelectionIndexByID(id) {
		return this.findSelectionIndex(_.isInteger(id) ?
			id : this.primary.indexOfMember(id))
	}
	/**
	 * Get currently selected item.
	 * @return {any} Selected value.
	 */
	get selected() {
		const result = _.map(this.matrix, member => member.selection(this.selectedPosition));
		return result.length === 1 ? _.head(result) : result
	}
	/**
	 * Get Sparkles namespace
	 * @return {string} Namespace.
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
	 * @param  {number} id Index.
	 * @return {any} Returned value.
	 */
	select(id) {
		this.selectedIndex = this.findSelectionIndexByID(id);
		this.selectedPosition = this.primary.position(this.selectedIndex);
		this.emtr.emit('select', this.selected);
		return this.selected
	}
}
/**
 * Create a new n-selector.
 * @param  {Array[]} matrix    Array or array of arrays of selectable options.
 * @param  {number} selection Current selection.
 * @param  {string} ns        Sparkles emitter namespace.
 * @return {NSelector} NSelector ganged selector.
 */
function createSelector(matrix, selection = 0, ns = uuid()) {
	if (matrix === undefined || !Array.isArray(matrix)) {
		throw new Error('Selector requires an array (or an array of arrays) as the first parameter.')
	}
	return new NSelector(matrix, selection, ns)
}

export { NSelector, createSelector };
