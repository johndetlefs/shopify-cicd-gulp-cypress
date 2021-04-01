const gulp = require('gulp');
const path = require('path');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

const directory = path.join(__dirname, '../shop/dev/js/*.js');


const javascriptLint = () => {
    return (
        gulp
            .src(directory)
            .pipe(eslint())
            .pipe(eslint.format())
    );
};


const javascriptHandler = () => {
    const destination = path.join(__dirname, '../shop/assets/');
    return gulp
            .src(directory)
            .pipe(
                babel()
            )
            .pipe(concat('theme.js'))
            .pipe(gulp.dest(destination))
            .pipe(rename('theme.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(destination));
};

module.exports.javascriptGulp = gulp.task('javascript', javascriptHandler);
module.exports.javascriptGulp = gulp.task('javascript-lint', javascriptLint);