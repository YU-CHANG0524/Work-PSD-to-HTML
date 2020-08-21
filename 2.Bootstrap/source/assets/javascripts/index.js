
$(document).ready(function () {
  
  $('.home_slick').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay:true,
    speed:900,
    focusOnSelect: true,
    autoplaySpeed: 1000,
    responsive:[
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      },
    ]
  });

  if ($('.product').length) {
    $('.header').addClass('header-style2');
    $('.header.header li').eq(0).addClass('active');
  }


  if ($('.detail').length) {
    $('.header').addClass('header-style2');
  }

  if ($('.success_page').length) {
    $('.header').addClass('header-style3');
  }

  
});