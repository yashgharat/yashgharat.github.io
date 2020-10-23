$(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());

      var $gameboy_title = $(".welcome-text");
      $gameboy_title.toggleClass('scrolled', $(this).scrollTop() > $nav.height())
    });
  });