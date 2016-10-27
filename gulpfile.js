/*
 * Client Gulp Template Tasks
 * (Work in progress)
 */
 /* eslint import/no-extraneous-dependencies: 0 */

const gulp = require('gulp')
const cordial = require('@thebespokepixel/cordial')()

// transpilation/formatting
gulp.task('bundle', cordial.macro({
	source: 'src/index.js'
}).bundle())

gulp.task('master', cordial.macro({
	master: true,
	source: 'src/index.js'
}).bundle())

// Clean
gulp.task('clean', cordial.shell({
	source: ['npm-debug.*', './nyc_output', './test/coverage']
}).trash())

// Docs
gulp.task('docs', cordial.shell({
	source: 'npm run doc-build'
}).job())

// ReadMe
gulp.task('readme', cordial.shell({
	source: 'npm run readme'
}).job())

// Tests
gulp.task('ava', cordial.test().ava(['test/*.js']))
gulp.task('xo', cordial.test().xo(['src/lib/*.js']))
gulp.task('test', gulp.parallel('xo', 'ava'))

// Default
gulp.task('default', gulp.series('bump', 'bundle'))

// Hooks
gulp.task('start-release', gulp.series('reset', 'clean', 'master', 'readme'))
gulp.task('post-flow-release-start', gulp.series('start-release', 'version-release', 'docs', 'commit'))

// Default
gulp.task('default', gulp.series('bump', 'clean', gulp.parallel('docs', 'bundle', 'readme')))
