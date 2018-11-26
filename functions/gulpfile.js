const gulp = require('gulp')
const client = require('./tasks/client')
const server = require('./tasks/server')

gulp.task('client', client)
gulp.task('server', server)