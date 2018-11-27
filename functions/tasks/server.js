const gulp = require('gulp')
const del = require('del')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackServerConfig = require('../webpack.server.config')
const sass = require('gulp-sass')
const named = require('vinyl-named')

const clean = () => del(['./server/templates/build/*.js',
  '!./server/templates/build/index.js'], {
    force: true
  })

const buildJS = () => gulp.src(['./server/templates/*.js'])
  .pipe(named())
  .pipe(webpackStream(webpackServerConfig, webpack))
  .pipe(gulp.dest('./server/templates/build'))

const buildSass = () => gulp.src(['./styles/*.scss', './server/styles/*.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('../public/styles'))

module.exports = done => {
  clean()
  buildJS()
  buildSass()
  done()     
}