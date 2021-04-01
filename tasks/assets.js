'use strict'

const gulp = require('gulp');
const changed = require('gulp-changed');
const path = require('path');

const destination = path.join(__dirname, '../shop/assets/');
const fontDirectory = path.join(__dirname, '../shop/dev/fonts/**');
const imageDirectory = path.join(__dirname, '../shop/dev/images/**');

const assetsHandler = () => {
    return gulp
            .src([
                fontDirectory,
                imageDirectory,
            ])
            .pipe(changed(destination))
            .pipe(gulp.dest(destination));
};



module.exports.compileImages = gulp.task('assets', assetsHandler);
