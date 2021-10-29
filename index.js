import _ from 'lodash';
import sparkles from 'sparkles';
import { randomBytes } from 'node:crypto';

const uuid = a => a
	? ((a ^	randomBytes(1)[0] % 16) >> a / 4).toString(16)
	: ([1e7] +	-1e3 + -4e3 + -8e3 +	-1e11).replace(/[018]/g, uuid);

class Gang {
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
function addGang(members, isPrimary) {
	return new Gang(members, isPrimary)
}

class NSelector {
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
		const result = _.map(this.matrix, member => member.selection(this.selectedPosition));
		return result.length === 1 ? _.head(result) : result
	}
	get namespace() {
		return this.ns
	}
	get emitter() {
		return this.emtr
	}
	select(id) {
		this.selectedIndex = this.findSelectionIndexByID(id);
		this.selectedPosition = this.primary.position(this.selectedIndex);
		this.emtr.emit('select', this.selected);
		return this.selected
	}
}
function createSelector(matrix, selection = 0, ns = uuid()) {
	if (matrix === undefined || !Array.isArray(matrix)) {
		throw new Error('Selector requires an array (or an array of arrays) as the first parameter.')
	}
	return new NSelector(matrix, selection, ns)
}

export { NSelector, createSelector };
