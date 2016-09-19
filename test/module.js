import test from 'ava'

import pkg from '../package.json'
import NSelector from '..'

const expectedVersion = pkg.build_number === (0 && pkg.version) || `${pkg.version}-Δ${pkg.build_number}`

test(`Module version is '${expectedVersion}'.`, t => {
	t.is(`${expectedVersion}`, NSelector.getVersion())
})
