/**
 * main.js
 * Handles social sharing buttons
 * based on https://github.com/kni-labs/rrssb/blob/master/js/rrssb.js
 */
;(function($,window){

  var $window = $(window);

  // Tooltips for share buttons
  $('[data-toggle="tooltip"]').tooltip();

//jQuery to collapse the navbar on scroll
$window.scroll(function() {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").not('.disable-nav-expanded').addClass("top-nav-collapse");
  } else {
    $(".navbar-fixed-top").not('.disable-nav-expanded').removeClass("top-nav-collapse");
  }

  // Show scroll to top button for posts
  if ( $('.post-single').length > 0 &&
    $window.scrollTop() > $('.post-single').offset().top) {
    if($('.scroll-to-top').length < 1) {
      $('<span class="page-scroll"><a href="#content" class="scroll-to-top btn btn-default"><i class="fa fa-play-circle fa-rotate-270"></i> top</a></span>')
        .appendTo('body')
        .hide()
        .fadeIn(300);
    } else {
      $('.scroll-to-top').css('opacity', 1);
    }

  } else {
    $('.scroll-to-top').css('opacity', 0);
  }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('body').delegate('.page-scroll a', 'click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});

// Calculate post reading time
  $('.post').each(function(){
    var $this = $(this);
    $this.find('.eta').text( $this.readingtime( $this.data('words') ) );

  });


// fade out movie on scroll
var fadeBegin = 10,
fadeFinish = 600,
fadingElement = $('video');
$(window).bind('scroll', function(){
  var offset = $(document).scrollTop(), opacity = 1;

  if( offset <= fadeBegin ){
    opacity = 1;
  } else if( offset <= fadeFinish ){
    opacity = 1 - offset / fadeFinish;
  } else {
    opacity = 0;
  }
  fadingElement.css('opacity',opacity);
});

})(jQuery, window, undefined);
/** End JM script **/
