jQuery(function ($) {

  $('html').removeClass('no-js');


  // Galery
  $(document).ready(function () {
    $('.venobox').venobox({
        titleattr: 'data-title',    // default: 'title'
        numeratio: true,            // default: false
        infinigall: true            // default: false
    });
  });
  // OUTDATED MSIE NOTIFICATION
  if ($.browser.msie && $.browser.version >= 8 && $.browser.version <= 10) {
    $('body').prepend('<div class="old_browsers"><a href="//windows.microsoft.com/en-us/internet-explorer/download-ie"><i class="fa fa-warning"></i><b>You are using an outdated version of Internet Explorer.</b><span>For a faster, safer browsing experience</span><span class="btn">upgrade now</span> </a></div>');
  };




  // PRELOADER
  $(window).load(function () {
    $('#page_preloader').addClass('off');

    setTimeout(function () {
      $('#page_preloader').hide()
    }, 600);
  });




  // IOS HOVER
  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
    $('a').on("touchstart", function () { });
  };




  // PLACEHOLDER JS
  $('[placeholder]').each(function () {
    if ($(this).val() === '') {
      var hint = $(this).attr('placeholder');
      $(this).val(hint).addClass('hint');
    }
  });

  $('[placeholder]').focus(function () {
    if ($(this).val() === $(this).attr('placeholder')) {
      $(this).val('').removeClass('hint');
    }
  }).blur(function () {
    if ($(this).val() === '') {
      $(this).val($(this).attr('placeholder')).addClass('hint');
    }
  });




  // RTE YOUTUBE VIDEO
  $('.rte iframe[src *= youtube]').wrap('<div class="youtube_wrap"></div>');




  // FORM VALIDATION MINI
  $.fn.formValidation = function () { this.find("input, textarea").after('<p class="alert-form-info"></p>'), this.on("submit", function (t) { if ($(this).find("input, textarea").each(function () { "" == $(this).val() && ($(this).addClass("alert-form").next().html("Field can&#39;t be blank").slideDown(), $(this).on("focus", function () { $(this).removeClass("alert-form").next().slideUp() }), t.preventDefault()) }), $(this).find("input[type=email]").length) { var e = $(this).find("input[type=email]"); e.val().length > 0 && (e.val().length < 6 || -1 == e.val().indexOf("@") || -1 == e.val().indexOf(".")) && (e.addClass("alert-form").next().html("Incorrect email").slideDown(), e.on("focus", function () { $(this).removeClass("alert-form").next().slideUp() }), t.preventDefault()) } if (2 == $(this).find("input[type=password]").length) { var n = $(this).find("input[type=password]:eq(0)"), i = $(this).find("input[type=password]:eq(1)"); n.val() != i.val() && (i.addClass("alert-form").next().html("Passwords do not match").slideDown(), i.on("focus", function () { i.removeClass("alert-form").next().slideUp() }), t.preventDefault()) } }) };




  // FORM STYLES
  $('.address_table form, .customer_address form').addClass('form-horizontal');




  // CUSTOM SELECTS
  $('.header_currency select, #navigation select').styler();
  $('.jq-selectbox__trigger').append('<i class="fa fa-angle-down"></i>');




  // SEARCH FORMS
  $('.search_form').on('submit', function (e) {
    var searchQuery = $(this).find('input').val().replace(/ /g, '+');
    var placeHolder = $(this).find('input').attr('placeholder').replace(/ /g, '+');

    if (!(searchQuery.length && searchQuery != placeHolder)) {
      e.preventDefault();
      e.stopPropagation();
    };
  });



  // MAIN PRODUCT LISTING IMAGE CHANGE
  imgChange = function () {
    if (device.desktop()) {
      $(document).on({
        mouseenter: function () {
          $(this).find(".img__2").stop().animate({ "opacity": 1 });
        },
        mouseleave: function () {
          $(this).find(".img__2").stop().animate({ "opacity": 0 });
        }
      }, '.img_change');
    };
  };
  $(window).load(imgChange);




  // BACK TO TOP BUTTON
  $(document).ready(function () {
    $(document.body).append('<a id="back_top" href="#"></a>');
    $('#back_top').hide();

    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $('#back_top').fadeIn("slow");
      }
      else {
        $('#back_top').fadeOut("slow");
      };
    });

    $('#back_top').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 800);
      $('#back_top').fadeOut("slow").stop();
    });
  });

 


  // PRODUCT QUANTITY FORM MINI, USED ON:
  // 1. PRODUCT PAGE
  // 2. PRODUCT QUICK VIEW
  // 3. CART PAGE
  $(document).on("focusout", ".quantity_input", function () { var t = $(this).val(); $(this).val(isNaN(parseFloat(t)) && !isFinite(t) || 0 == parseInt(t) || "" == t ? 1 : parseInt(t) < 0 ? parseInt(t) - 2 * parseInt(t) : parseInt(t)) }), $(document).on("click", ".quantity_up", function () { var t = $(this).parent().find(".quantity_input"); t.val(!isNaN(parseFloat(t.val())) && isFinite(t.val()) ? parseInt(t.val()) + 1 : 1) }), $(document).on("click", ".quantity_down", function () { var t = $(this).parent().find(".quantity_input"); t.val(!isNaN(parseFloat(t.val())) && isFinite(t.val()) && t.val() > 1 ? parseInt(t.val()) - 1 : 1) });




  // MEGAMENU TOGGLE
  var mobFlag = 0;

  megamenuToggle = function () {
    if ($(window).width() > 991) {
      $('#megamenu').removeClass('megamenu_mobile').addClass('megamenu_desktop');

      $('#megamenu .level_1').superfish({
        animation: { height: 'show' },
        speed: 'fast'
      });

      $('#megamenu .level_1, #megamenu .level_3').removeAttr('style');

      $('#megamenu_mobile_toggle').unbind('.mobileMenu');

      $('.level_1_trigger').unbind('.mobileMenu');
      $('.level_2_trigger').unbind('.mobileMenu');

      $(document).unbind('.mobileMenu');

      mobFlag = 0;
    } else {
      $('#megamenu').removeClass('megamenu_desktop').addClass('megamenu_mobile');

      $('#megamenu .level_1').superfish('destroy');

      if (mobFlag == 0) {
        menuMobile();
        mobFlag = 1;
      };
    };
  };

  $(window).on('load resize', function () {
    megamenuToggle();
  });




  // MEGAMENU MOBILE
  menuMobile = function () {
    $("#megamenu_mobile_toggle").on('click.mobileMenu', function () {
      $(".level_1").stop().slideToggle("slow");

      $(this).toggleClass("active");
    });

    $('.level_1_trigger').on('click.mobileMenu', function () {
      $(this).parent().parent().find('.level_2_wrap').slideToggle('slow');

      $(this).toggleClass('active');

      return false;
    });

    $('.level_2_trigger').on('click.mobileMenu', function () {
      $(this).parent().find('.level_3').slideToggle('slow');

      $(this).toggleClass('active');

      return false;
    });

    $('.megamenu_mobile h2').on('click touchstart', function (e) {
      e.stopPropagation();
    });

    $(document).bind('click.mobileMenu', function () {
      $(".level_1").slideUp("slow");
      $(".megamenu_mobile").find("h2").removeClass("active");
    });
  };



  // STICKY MENU
  stickUp = function () {

    var target = $('#header_stuck');
    var pseudo = $('#pseudo_sticky_block');
    var stick_class = 'megamenu_stuck';

    $(document).on('scroll', function () {

      var scrolledValue = parseInt($(window).scrollTop());
      var offsetValue = parseInt(pseudo.offset().top);
      var headHeight = target.outerHeight();

      if (scrolledValue > offsetValue) {
        target.addClass(stick_class);
        pseudo.css({ 'height': headHeight });
      }
      else {
        target.removeClass(stick_class);
        pseudo.css({ 'height': 0 });
      };

    });
  };
  stickUp();


  // SHOW/HIDE USER PANNEL AND SEARCH
  var pannel_toggle = $("#user_pannel_toggle"),
    search = $(".header_search"),
    background_block = $("#user_pannel_bg"),
    parentElement = $('body');

  pannel_toggle.click(function () {
    parentElement.addClass("bg_active pannel_active");
  });
  background_block.click(function () {
    parentElement.removeClass("bg_active pannel_active");
  });

  $(window).on('load resize', function () {
    if ($(this).width() > 991) {
      $(document).click(function (event) {
        if (search.is(event.target) || search.has(event.target).length !== 0) {
          parentElement.addClass("search_active");
        } else {
          if (parentElement.hasClass("search_active")) {
            parentElement.removeClass("search_active");
          }
        }
      })
    }
  });


  //   	DETECTION OF INTERNET EXPLORER
  var IE = '\v' == 'v';
  if (IE || navigator.userAgent.match(/Trident\/7\./)) {
    $("body").addClass("ie-browser");
  }

});