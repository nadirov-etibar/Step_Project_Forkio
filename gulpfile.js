const gulp = require("gulp"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    minifyCSS = require("gulp-clean-css"),
    imagemin = require("gulp-imagemin"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync"),
    clean = require("gulp-clean");

const path = {
    dist: {
        self: "dist/",
        css: "dist/css/",
        js: "dist/js/",
<<<<<<< HEAD
        img: "dist/img/",
=======
        img: "dist/img/**/*",
>>>>>>> fb677797f5e3fbc456b34a9eecead41024d86540
    },

    src: {
        scss: "src/scss/*.scss",
        js: "src/js/*.js",
        img: "src/img/**/*",
    }
};

const buildSCSS = () => (
    gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(minifyCSS({compatibility: "ie8"}))
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest(path.dist.css))
);

const buildJS = () => (
    gulp.src(path.src.js)
        .pipe(concat("script.min.js"))
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
);

const buildIMG =  () => (
    gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist.img))
);

const cleanDist = () => (
    gulp.src(path.dist.self, {allowEmpty: true})
        .pipe(clean())
);

const watcher = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(path.src.scss, buildSCSS).on('change', browserSync.reload);
    gulp.watch(path.src.js, buildJS).on('change', browserSync.reload);
    gulp.watch(path.src.img, buildIMG).on('change', browserSync.reload);
};

/*** CREATING TASKS ***/
gulp.task('scss', buildSCSS);

gulp.task('build', gulp.series(
    cleanDist,
    buildSCSS,
    buildJS,
    buildIMG,
    watcher
));