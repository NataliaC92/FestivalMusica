const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass'); // no le hace falta los {} porque gulp-sass solo tiene una funcion. en gulp tenes varios entonces debemos determinar que elementos de gulp queremos
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');

/* utilidades css */
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps =require('gulp-sourcemaps');


/* utilidades js */
//const terser = require('gulp-terser-js');

// funcion que compila SASS
const paths = {
    imagenes: 'src/img/**/*',
    scss:'src/scss/**/*.scss',
   // js: 'src/js/**/*.js'
}

function css(){
    return src(paths.scss)
    .pipe( sourcemaps.init())
        .pipe( sass())
        .pipe( postcss([autoprefixer(), cssnano()]))
        .pipe( sourcemaps.write('.'))
        .pipe( dest('./build/css')) 
}
function minificarcss(){
    return src(paths.scss)
        .pipe( sass({
            outputStyle: 'compressed'
        }))
        .pipe( dest('./build/css') )
}
/* function javascript() {
    return src(paths.js)
    .pipe( concat('bundle.js'))
    .pipe( terser())
    .pipe( dest('./build/js'))
} */

function imagenes(){
    return src(paths.imagenes)
    .pipe( imagemin() )
    .pipe( dest('./build/img'))
    /* .pipe( notify({mensage: 'Imagen Minificada'})); */
}

function versionWebp(){
    return src(paths.imagenes)
    .pipe( webp() )
    .pipe( dest('./build/img'))
    /* .pipe( notify({mensage: 'Imagen Webp'})); */
}

function watchArchivos(){
    watch(paths.scss, css);
}

exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos; 

exports.default = series( css,  imagenes, versionWebp, watchArchivos );