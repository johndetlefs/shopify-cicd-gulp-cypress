"use strict";

const gulp = require("gulp");
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");
const changed = require("gulp-changed");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const sass = require("gulp-dart-sass");
const uglify = require("gulp-uglify");
const scsslint = require("gulp-scss-lint");
const replace = require("gulp-replace");
const eslint = require("gulp-eslint");

/**
 * Asset paths.
 */
const sassPaths = ["./node_modules/"];
const srcSCSS = "shop/dev/scss/**/*.scss";
const srcJS = "shop/dev/js/*.js";
const assetsDir = "shop/assets/";
const themePath = "shop/layout/theme.liquid";

/**
 * Cache Buster -- forces clearing of the cache for minified resources
 */

gulp.task("change", async function () {
  gulp
    .src([themePath])
    .pipe(replace(/\?c\=[0-9]+/g, "?c=" + Date.now()))
    .pipe(gulp.dest("shop/layout/"));
});

/**
 * SCSS lint
 */
gulp.task("scss-lint", () => {
  return gulp.src(srcSCSS).pipe(scsslint());
});

/**
 * SCSS task
 */
gulp.task(
  "scss",
  gulp.series("scss-lint", () => {
    return gulp
      .src("shop/dev/scss/theme.scss")
      .pipe(sass({ includePaths: sassPaths }))
      .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
      .pipe(autoprefixer({ cascade: false }))
      .pipe(rename("theme.min.css"))
      .pipe(gulp.dest(assetsDir));
  })
);

/**
 * JS task
 *
 * Note: use npm to install libraries and add them below, like the babel-polyfill example
 */
const jsFiles = [
  "node_modules/jquery/dist/jquery.js",
  "node_modules/bootstrap/dist/js/bootstrap.js",
  srcJS,
];

gulp.task("js-check", () => {
  return (
    gulp
      .src([srcJS])
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
  );
});

gulp.task("js", () => {
  return gulp
    .src(jsFiles)
    .pipe(babel())
    .pipe(concat("theme.js"))
    .pipe(gulp.dest(assetsDir))
    .pipe(rename("theme.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(assetsDir));
});

/**
 * Images task
 */
gulp.task("images", () => {
  return gulp
    .src("shop/images/**")
    .pipe(changed(assetsDir)) // ignore unchanged files
    .pipe(gulp.dest(assetsDir));
});

/**
 * Fonts task
 */
gulp.task("fonts", () => {
  return gulp
    .src("shop/fonts/**")
    .pipe(changed(assetsDir)) // ignore unchanged files
    .pipe(gulp.dest(assetsDir));
});

/**
 * Watch task
 */
gulp.task("watch", () => {
  gulp.watch(srcSCSS, gulp.series("scss", "change"));
  gulp.watch(srcJS, gulp.series("js-check", "js", "change"));
  gulp.watch("shop/images/*.{jpg,jpeg,png,gif,svg}", gulp.series("images"));
  gulp.watch("shop/fonts/*.{eot,svg,ttf,woff,woff2}", gulp.series("fonts"));
});

/**
 * Default task
 */
gulp.task(
  "default",
  gulp.series("scss", "js-check", "js", "images", "fonts", "change", "watch")
);
