import test from 'ava'
import sparkles from 'sparkles'
import pkg from '../package.json'
import {NSelector, createSelector} from '..'

test(`Simple 2d matrix`, t => {
	const matrix = createSelector([['one', 'two', 'three'], ['red', 'green', 'blue']], 'two')
	t.deepEqual(matrix.selected, ['two', 'green'])
})

test(`Assymetric 2d matrix`, t => {
	const matrix = createSelector([['one', 'two', 'three', 'four'], ['red', 'green', 'blue']], 'three')
	t.deepEqual(matrix.selected, ['three', 'green'])
})


test(`Simple 2d matrix with select`, t => {
	t.plan(3)
	const matrix = createSelector([['one', 'two', 'three'], ['red', 'green', 'blue']], 'two')
	t.deepEqual(matrix.selected, ['two', 'green'])
	const newSlection = matrix.select(2)
	t.deepEqual(newSlection, ['three', 'blue'])
	t.deepEqual(matrix.selected, ['three', 'blue'])
})

test.cb(`Simple 2d matrix with select and named emission`, t => {
	t.plan(2)
	const matrix = createSelector([['one', 'two', 'three'], ['red', 'green', 'blue']], 'two', 'ava-3')
	t.deepEqual(matrix.selected, ['two', 'green'])

	sparkles('ava-3').on('select', event => {
		t.deepEqual(event, ['three', 'blue'])
		t.end()
	})

	matrix.select('three')

})

test.cb(`Simple 2d matrix with select and direct emission`, t => {
	t.plan(2)
	const matrix = createSelector([['one', 'two', 'three'], ['red', 'green', 'blue']], 1, 'ava-4')
	t.deepEqual(matrix.selected, ['two', 'green'])

	matrix.emitter.on('select', event => {
		t.deepEqual(event, ['three', 'blue'])
		t.end()
	})

	matrix.select(2)

})
