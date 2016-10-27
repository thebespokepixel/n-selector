/* ───────────╮
 │ n-selector │
 ╰────────────┴──────────────────────────────────────────────────────────────── */

import {randomBytes} from 'crypto'

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
const uuid = a => a ?
	((a ^	randomBytes(1)[0] % 16) >> a / 4).toString(16) :
	([1e7] +	-1e3 + -4e3 + -8e3 +	-1e11).replace(/[018]/g, uuid)

export default uuid
