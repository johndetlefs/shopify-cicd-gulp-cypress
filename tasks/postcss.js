const path = require('path');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const stylelint = require('gulp-stylelint');
const rename = require('gulp-rename');

const directory = path.join(__dirname, '../shop/dev/css/*.css');

const postcssLinter = () => {
    return (
        gulp
            .src(directory)
            .pipe(stylelint({ reporters: { formatter: 'string', console: true }}))
    );
};

const postcssHandler = () => {
    const destination = path.join(__dirname, '../shop/assets/');
    return gulp
        .src(directory)
        .pipe(stylelint({reporters: [{formatter: 'string', console: true}]}))
        .pipe(postcss())
        .pipe(gulp.dest(destination))
        .pipe(rename('theme.min.css'))
        .pipe(gulp.dest(destination));
};


module.exports.postCSS = gulp.task('postcss', postcssHandler);
module.exports.postCSS = gulp.task('postcss-lint', postcssHandler);
