(function($) {
	"use strict";
	var nav = $('nav');
	var navHeight = nav.outerHeight();

	$(window).trigger('scroll');
	$(window).on('scroll', function() {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});


	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
		var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	$('.navigation').onePageNav({
		scrollOffset: 0
	});

	$(".navbar-collapse a").on('click', function() {
		$(".navbar-collapse.collapse").removeClass('in');
	});


	$(window).scroll(function() {

		var scrollTop = $(window).scrollTop();

		if (scrollTop > 200) {
			$('.navbar-default').css('display', 'block');
			$('.navbar-default').addClass('fixed-to-top');

		} else if (scrollTop == 0) {

			$('.navbar-default').removeClass('fixed-to-top');
		}
	});


	function navbar() {
		if ($(window).scrollTop() > 1) {
			$('#navigation').addClass('show-nav');
		} else {
			$('#navigation').removeClass('show-nav');
		}

	}

	$(document).ready(function() {
		var browserWidth = $(window).width();
		if (browserWidth > 560) {
			$(window).scroll(function() {
				navbar();
			});
		}
	});


	$(window).resize(function() {
		var browserWidth = $(window).width();
		if (browserWidth > 560) {
			$(window).scroll(function() {
				navbar();
			});
		}
	});

	$('.js-scroll').on("click", function() {
		$('.navbar-collapse').collapse('hide');
	});


	$(window).trigger('scroll');
	$(window).on('scroll', function() {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	// $('body').scrollspy({ target: '#navbarDefault', offset: 50 });

	new WOW().init();

})(jQuery);


baguetteBox.run('.gallery', {
	fullscreen: false,
});
