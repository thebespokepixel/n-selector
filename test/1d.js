import test from 'ava'
import sparkles from 'sparkles'
import {createSelector} from '..'

test(`Simple 1d matrix`, t => {
	const matrix = createSelector(['one', 'two', 'three'], 0)
	t.is(matrix.selected, 'one')
})

test(`Simple 1d matrix with select`, t => {
	t.plan(3)
	const matrix = createSelector(['one', 'two', 'three'], 0)
	t.is(matrix.selected, 'one')
	const newSlection = matrix.select(1)
	t.is(newSlection, 'two')
	t.is(matrix.selected, 'two')
})

test.cb(`Simple 1d matrix with select and named emission`, t => {
	t.plan(2)
	const matrix = createSelector(['one', 'two', 'three'], 0, 'ava-1')
	t.is(matrix.selected, 'one')

	sparkles('ava-1').on('select', event => {
		t.is(event, 'one')
		t.end()
	})

	matrix.select(0)
})

test.cb(`Simple 1d matrix with select and direct emission`, t => {
	t.plan(2)
	const matrix = createSelector(['one', 'two', 'three'], 0, 'ava-2')
	t.is(matrix.selected, 'one')

	matrix.emitter.on('select', event => {
		t.is(event, 'two')
		t.end()
	})

	matrix.select(1)
})
