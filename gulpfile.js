/**
 * @license
 * Copyright ASW (A Software World) All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */
'use strict';

var gulp = require('gulp'),
    del = require('del');

gulp.task('images', function () {
    return gulp.src(['blue.svg'])
        .pipe(gulp.dest('dist'));
});

//Cleaning previous gulp tasks from project
gulp.task('clean', function () {
    return del(['dist/assets']);
});

//Copy readme
gulp.task('readme', function () {
    return gulp.src(['README.md', 'LICENSE'])
        .pipe(gulp.dest('dist'));
});

//Building project with run sequence
gulp.task('build-assets',
    gulp.series('clean',
        'images',
        'readme'));

