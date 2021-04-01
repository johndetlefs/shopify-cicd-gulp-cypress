const gulp = require('gulp');
const path = require('path');
const fs = require('fs');

require('./assets');
require('./javascript');
require('./postcss');
require('./change');

const handleDeleted = (file) => {
    const fileName = path.basename(file);
    const destinationDirectory = path.join(__dirname, '../shop/assets/');
    const exists = fs.existsSync(destinationDirectory + fileName);
    if(exists) fs.unlinkSync(destinationDirectory + fileName);
};

const watchRunners = () => {
    const fontDirectory = path.join(__dirname, '../shop/dev/fonts/*.{eot,svg,ttf,woff,woff2}'),
          cssDirectory = path.join(__dirname, '../shop/dev/css/*.css'),
          cssSubDirectory = path.join(__dirname, '../shop/dev/css/**/*.css'),
          javascriptDirectory = path.join(__dirname, '../shop/dev/js/*.js'),
          imageDirectory = path.join(__dirname, '../shop/dev/images/*.{jpg,jpeg,png,gif,svg}');

    gulp.watch(fontDirectory, gulp.series('assets'))
        .on('unlink', file => handleDeleted(file));

    gulp.watch(imageDirectory, gulp.series('assets'))
        .on('unlink', file => handleDeleted(file));

    gulp.watch([cssDirectory, cssSubDirectory], gulp.series('postcss-lint', 'postcss', 'change'));
    gulp.watch(javascriptDirectory, gulp.series('javascript-lint', 'javascript', 'change'))
};

module.exports.watchers = gulp.task('watchers', watchRunners);