let gulp = require("gulp");
let browserify = require("browserify");
let source = require('vinyl-source-stream');
let watchify = require("watchify");
let tsify = require("tsify");
let gutil = require("gulp-util");
var es = require('event-stream');

let paths = {
    pages: ['pages/*.html'],
    images: ['images/*.png'],  
    styles: ['css/*.css'],
    libs: ['js/knockout-3.3.0.js'],
    data: ['data/coindata.js']
};

let watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['ts/CoinHoarder.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    let pages = gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
    let images = gulp.src(paths.images)
        .pipe(gulp.dest("dist/images"));
    let styles = gulp.src(paths.styles)
    .pipe(gulp.dest("dist/css"));
    let libs = gulp.src(paths.libs)
    .pipe(gulp.dest("dist/lib"));
    let data = gulp.src(paths.data)
    .pipe(gulp.dest("dist/js"));
    es.concat([pages, styles, libs, data, images]);
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist/js"));
}

gulp.task("default", ["copy-html"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);