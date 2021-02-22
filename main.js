var divId;

$(function () {
  $(document).scroll(function () {
    var $nav = $(".navbar");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());

    var $gameboy_title = $(".welcome-text");
    $gameboy_title.toggleClass('scrolled', $(this).scrollTop() > $nav.height())
  });
});

$('.screen-pagination').click(function (e) {
  e.preventDefault()

});

function screenJumping(tag) {
  divId = $('.screen-pagination').attr('href');
  $('html, body').animate({
    scrollTop: $(divId).offset().top - convertRemToPixels(13)
  }, 100);


  var leftPos = $('.pokemon-info').scrollLeft();
  var target = document.getElementById(tag);

  target.parentNode.scrollLeft = target.offsetLeft - 5;
}


function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}