$(document).ready(function () {
  
  //search 設定

  function changeInputValue(value,vm){

    if (value.length == 0) {
      vm.siblings('.jq_fake-placeholder').removeClass('hide has-data');
    }else{
      
      $('.jq_fake-placeholder').removeClass('hide').addClass('has-data');
      $('.jq_input-result').text(value);
      $('.jq_local-input').val('');
      $('.jq_hot-local-list').removeClass('show');
    }
  }

  // 點及時將fake-placeholder 隱藏
  $('.jq_local-input').on('focus', function(e){
    $(this).siblings('.jq_fake-placeholder').addClass('hide');
    $(this).siblings('.jq_input-result').text('');
    $('.jq_hot-local-list').addClass('show');
  })

  //輸入替換值
  $('.jq_local-input').blur(function (e) { 
    e.preventDefault();
    let vm = $(this);
    let value = $('.jq_local-input').val()
    
    changeInputValue(value, vm) ;

  });

  //選取替換值
  $('.jq_local_list_item').on('click', function () {
    let town = $(this).find('.jq_town').text();
    let country = $(this).find('.jq_country').text();
    
    let str = `${town},${country}`;
    
    changeInputValue(str) ;

    $('.jq_hot-local-list').removeClass('show');
  });



  // 日期日曆部分
  $('.jq_date').daterangepicker();

  $('.jq_local-date').on('focus', function(e){
    $(this).siblings('.jq_fake-placeholder_2').addClass('hide');
    $(this).siblings('.jq_input-date').text('');
  })

  $('.jq_local-date').blur(function (e) { 
    e.preventDefault();
    $('.jq_block').addClass('show');
  });

  // 人數部分

  $('.jq_local-guest').on('focus', function(e){
    $(this).siblings('.jq_fake-placeholder_1').addClass('hide');
    $(this).siblings('.jq_input-result').text('');
    $('.jq_guest-item').addClass('show');
  })

  $('.jq_local-guest').blur(function (e) { 
    e.preventDefault();
    $('.jq_fake-placeholder_1').removeClass('hide').addClass('has-data');
    $('.jq_guest-item').removeClass('show');
    $('.jq_input-guest').text('2 adults・1 room');
  });













  //======================search bar 搜尋列結束=====================================

  // footer , header 按鈕

  $('.jq_language_btn').on('click', function (e) {
    e.preventDefault();
    $('.jq_header_arrow , .jq_language_select').toggleClass('active');
  });

  $('.jq_footer_language_btn').on('click', function (e) {
    e.preventDefault();
    $('.jq_footer_language_arrow , .jq_footer_language_select').toggleClass('active');
  });


  $('.jq_footer_dollar_btn').on('click', function (e) {
    e.preventDefault();
    $('.jq_footer_dollar_arrow , .jq_footer_dollar_select').toggleClass('active');
  });


  // banner slick 區塊

  $('.jq_home_banner_slick').slick({
    infinite: true,
    dots: false,
    draggable: false,
    nextArrow: $('.jq_banner_slick_arrow-next'),
    prevArrow: $('.jq_banner_slick_arrow-pre')
  });

  $('.jq_home_choices_slick').slick({
    infinite: true,
    dots: false,
    slidesToShow: 4,
    nextArrow: $('.jq_home_choices_slick-arrow'),
    prevArrow: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow:3,

        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow:1
        }
      }
    ]
  });

  $('.jq_inspiration_list').slick({
    infinite: true,
    dots: false,
    slidesToShow: 3,
    draggable: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          draggable: true,
        }
      }
    ]
  })

  

  // 範圍卷軸
  $(".js-range-slider").ionRangeSlider({
    skin: 'round',
    type: "double",
    min: 800,
    max: 4000,
    from: 1400,
    to: 3000,
    hide_min_max: true,
    hide_from_to: true,
    onChange: function (data) {
      
      let fromNumber = data.from
      let toNumber = data.to

      $('.jq_range-value-min').text(fromNumber)
      $('.jq_range-value-max').text(toNumber)
    }
  });

  // 下方overlay 顯示

  $('.jq_overlay-show').on('click', function (e) {
    e.preventDefault();
    $('.detail_overlay').addClass('show');

    $(document).one('click', function(){
      $('.detail_overlay').removeClass('show');
    })

    $('.jq_overlay-cancel').on('click', function (e) {
      e.preventDefault();
      $('.detail_overlay').removeClass('show');
    });

    e.stopPropagation();

  });

  $('.detail_overlay').on('click', function (e) {
    e.stopPropagation();
  })

  // 偵測 目標頁面並更改footer 樣式

  if ($('.reserve').length) {
    $('.footer').addClass('footer-style');
  }

  if ($('.receive').length) {
    $('.footer').addClass('footer-style');
  }

  if ($('.member').length) {
    $('.footer').addClass('footer-style2');
  }

  // 偵測 目標頁面並更改header 樣式

  if ($('.login').length) {
    $('.header').addClass('header-style');
  }

  if ($('.member').length) {
    $('.header').addClass('header-acount-style');
  }


  // 結果頁 rwd sort按鈕

  $('.jq_result_aside-rwd_sort').on('click', function (e) {
    e.preventDefault();
    
    $('.jq_result_aside-rwd_sort').toggleClass('active');
    $('.jq_result_content_nav').toggleClass('show');
  });

  $('.jq_result_aside-rwd_filter').on('click', function (e) {
    e.preventDefault();
    $('body').css('overflow', 'hidden');
    $('.jq_result_side').css('display', 'block');
    $('.jq_result_side').css('overflow-y', 'scroll');
  });

  $('.jq_clear-result_side-rwd').on('click', function (e) {
    e.preventDefault();
    $('body').css('overflow', 'initial');
    $('.jq_result_side').css('display', 'none');
    $('.jq_result_side').css('overflow-y', 'initial');
  });

  //detail slick
  $('.jq_detail_content_slick').slick({
    infinite: true,
    dots: false,
    nextArrow: $('.jq_detail_content_slick-next'),
    prevArrow: $('.jq_detail_content_slick-pre')
  });

  //reservation 按鈕
  $('.jq_total-btn').on('click', function (e) {
    e.preventDefault();
    $('.reserve_check').toggleClass('show');
  });

});

