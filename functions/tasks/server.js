const gulp = require('gulp')
const del = require('del')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackServerConfig = require('../webpack.server.config')
const sass = require('gulp-sass')
const named = require('vinyl-named')

const clean = () => del(['./server/build*.js',
  '!./server/build/index.js', '../public/styles*'], {
    force: true
  })

const buildJS = () => gulp.src(['./server/templates/*/*.js'])
  .pipe(named())
  .pipe(webpackStream(webpackServerConfig, webpack))
  .pipe(gulp.dest('./server/app/build'))

const buildSass = () => gulp.src(['./server/templates/*/*.scss'])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('../public/styles'))

module.exports = done => {
  clean()
  buildJS()
  buildSass()
  done()     
}