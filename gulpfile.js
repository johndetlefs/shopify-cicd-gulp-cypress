'use strict'

const gulp = require("gulp");


require('./tasks/liveReload');
require('./tasks/change');
require('./tasks/assets');
require('./tasks/javascript');
require('./tasks/postcss');
require('./tasks/watchers');


/**
 * Default task
 */
gulp.task(
  "default",
  gulp.parallel('live-reload', 'javascript-lint', 'javascript', 'postcss', 'assets', 'change', 'watchers')
);

