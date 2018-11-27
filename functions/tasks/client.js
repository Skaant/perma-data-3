const gulp = require('gulp')
const del = require('del')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackClientConfig = require('../webpack.client.config')
const sass = require('gulp-sass')
const named = require('vinyl-named')

const clean = () => del(['../public/modules*.js', '../modules/styles/*.css'], {
    force: true
  })

const buildJS = () => gulp.src(['./client/modules/*.js'])
  .pipe(named())
  .pipe(webpackStream(webpackClientConfig, webpack))
  .pipe(gulp.dest('../public/modules'))

const buildSass = () => gulp.src('./client/styles/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('../public/modules/styles'))

module.exports = done => {
  clean()
  buildJS()
  buildSass()
  done()     
}