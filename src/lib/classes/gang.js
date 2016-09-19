/* ───────────╮
 │ n-selector │ Single n-way switch channel (gang)
 ╰────────────┴─────────────────────────────────────────────────────────────────*/
/**
 * This is a test.
 */

class Mode {
	constructor(mode = 'soft', index = false) {
		this.modes = [
			'soft',
			'hard',
			'container',
			'keep'
		]

		this.selection =

		this.hyphenation = hyphenation

		this.mode = (function () {
			switch (mode) {
				case 'soft':
					return 0
				case 'hard':
					return 1
				case 'container':
					return 2
				case 'keep':
					return 3
				default:
					throw new Error(`Unrecognised mode: ${mode} `)
			}
		})()
	}

	select(mode) {
		const enumerated = this.modes.indexOf(mode)
		if (enumerated === -1) {
			throw new Error(`Unrecognised mode: ${mode} `)
		}
		this.mode = enumerated
		return enumerated
	}
}
