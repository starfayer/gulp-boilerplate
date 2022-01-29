const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const nothing = () => {};

function scss() {
  return src('app/scss/*.scss')
    .pipe(sass())
    .pipe(dest("app"))
    .pipe(browserSync.stream());
}

const jsWatched = false;
function js() {
  return src('app/js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('app'))
}

function serve() {
  browserSync.init({
    server: "./"
  });

  jsWatched ? watch("app/js/*.js", { ignoreInitial: false }, js) : nothing;
  watch("*.html").on('change', browserSync.reload);
  watch('app/scss/*.scss', { ignoreInitial: false }, scss);
}

module.exports.default = serve;