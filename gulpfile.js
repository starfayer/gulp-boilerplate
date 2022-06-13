const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const prefix = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();

const inputStyleFolder = 'assets/*.scss';
const outputStyleFolder = 'assets';
const inputJSFolder = 'assets/js/*.js';
const outputJSFolder = 'assets';

const nothing = () => {};

function scss() {
  const plugins = [
    prefix(),
    cssnano(),
  ];
  return src(inputStyleFolder)
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(dest(outputStyleFolder))
    .pipe(browserSync.stream());
}

const jsWatched = false;
function js() {
  return src(inputJSFolder)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(outputJSFolder))
}

function serve() {
  browserSync.init({
    server: "./"
  });

  jsWatched ? watch(inputJSFolder, { ignoreInitial: false }, js) : nothing;
  watch("*.html").on('change', browserSync.reload);
  watch(inputStyleFolder, { ignoreInitial: false }, scss);
}

module.exports.default = serve;