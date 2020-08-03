'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const mainBowerFiles = require('main-bower-files');
const minimist = require('minimist');



//minimist
const envOptions = {
    string: 'env',
    default:{env: 'develop'}
};
let options = minimist(process.argv.slice(2),envOptions); 

// 刪除程式碼
gulp.task('clean', function () {
    return gulp.src(['./.tmp','./public'], {read: false})
        .pipe($.clean());
});

//pug部分
gulp.task('pug', function buildHTML() {

    return gulp.src('./source/**/*.pug')
        .pipe($.plumber())
        .pipe($.pug({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
});

//Sass部分
gulp.task('sass', function () {
    return gulp.src('./source/**/*.sass')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        //加入前贅詞
        .pipe($.postcss([autoprefixer()]))

        //gulp if判斷是  在npm  輸入 gulp sass --env production 就會壓縮  預設是develop
        .pipe($.if(options.env === 'production',$.cleanCss({compatibility: 'ie8'})))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./public/'));
});

//JS部分
gulp.task('babel',async  function() {
    gulp.src('./source/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['@babel/env']
        }))
        .pipe($.concat('all.js'))
        .pipe($.uglify({
            compress:{
            drop_console: false
        }
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./public/js'))
});


gulp.task('watch', function () {

        gulp.watch('./source/**/*.sass', gulp.series('sass'));
        gulp.watch('./source/**/*.pug', gulp.series('pug'));
        gulp.watch('./source/**/*.js', gulp.series('babel'));

    return

});

//管理js 套件  先載到.tmp 
gulp.task('bower', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('./.tmp/vendors'))
});

//.tmp 裡面的js 外掛載到 public
gulp.task('vendorJs',function () {
    return gulp.src('./.tmp/vendors/**/*.js')
    .pipe($.concat('vendor.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('./public/js'))
});


//圖片壓縮
gulp.task('image-min',async function(){

    gulp.src('./source/assets/img/*','./source/upload/*')
        .pipe($.if(options.env === 'production',$.imagemin()))
        .pipe(gulp.dest('./public/images'))

});

//字體複製

gulp.task('copyfonts',async function(){
    gulp.src('./source/assets/font/**/*.{ttf,woff,eot,svg,otf}')
        .pipe(gulp.dest('./public/assets/font'))
});




gulp.task('build'
    ,gulp.series(
        'clean',
        'bower',
        'vendorJs',
        gulp.parallel('pug','sass','babel','image-min','copyfonts')
));

gulp.task('default',
    gulp.series(
        'bower',
        'vendorJs',
        'image-min',
        'copyfonts',
        gulp.parallel('pug','sass','babel'),
        function(done){
            gulp.watch('./source/**/*.sass', gulp.series('sass'));
            gulp.watch('./source/**/*.pug', gulp.series('pug'));
            gulp.watch('./source/**/*.js', gulp.series('babel'));
            done();
        }
));
