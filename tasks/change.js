'use strict'

const gulp = require('gulp');
const themePath = "shop/layout/theme.liquid";
const replace = require("gulp-replace");

const onChange = async () => {
    return gulp
            .src([themePath])
            .pipe(replace(/\?c\=[0-9]+/g, "?c=" + Date.now()))
            .pipe(gulp.dest("shop/layout/"));
}


module.exports.change = gulp.task('change', onChange)