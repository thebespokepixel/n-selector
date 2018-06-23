/* ───────────╮
 │ n-selector │ Single n-way switch channel (gang)
 ╰────────────┴──────────────────────────────────────────────────────────────── */

export class Gang {
	/**
	 * Represents a single gang of witch positions.
	 * @param  {string[]}  members The gang's named positions
	 * @param  {boolean} primaryIndex Is this gang the primary index?
	 * @property {number} memberCount Get the number of members in this gang.
	 */
	constructor(members, primaryIndex = false) {
		if (members === undefined || !Array.isArray(members)) {
			throw new Error('A selection gang requires an array of members as the first parameter.')
		}
		this.members = members
		this.index = 0
		this.isPrimaryIndex = primaryIndex
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
		const idx = this.members.indexOf(id)
		if (idx < 0) {
			throw new Error(`${id} not found.`)
		}
		return idx
	}

	indexOf(idx) {
		if (idx < 0) {
			idx = 0
		}
		if (idx > this.members.length) {
			idx = this.members.length
		}
		return idx
	}
}

export function addGang(members, isPrimary) {
	return new Gang(members, isPrimary)
}
