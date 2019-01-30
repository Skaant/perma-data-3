const gulp = require('gulp')
const del = require('del')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackClientConfig = require('../webpack.client.config')
const sass = require('gulp-sass')
const named = require('vinyl-named')

const clean = () => del('../public/modules*', {
    force: true
  })

const buildJS = () => gulp.src(['./client/modules/bundles/*/*.js'])
  .pipe(named(file => file.history[0].split('bundles')[1].split('.js')[0]))
  .pipe(webpackStream(webpackClientConfig, webpack))
  .pipe(gulp.dest('../public/modules'))

const buildSass = () => gulp.src('./client/modules/bundles/*/*.scss')
  .pipe(named())
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('../public/modules'))

module.exports = done => {
  clean()
  buildJS()
  buildSass()
  done()     
}