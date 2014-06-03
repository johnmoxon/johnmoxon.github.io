/**
 * Bg-video.js
 * Conditionally loads a video source or hides element based on device
 * @param  {function} $       jQuery passed in preserving $ in no conflict mode
 * @param  {object} window    window objct
 * @param  {null} undefined   null
 * @return {null}             null
 */
(function($, window, undefined){
  var formats = {
    webm : '/assets/video/bgclip.webm',
    mp4  : '/assets/video/bgclip.mp4',
    ogg  : '/assets/video/bgclip.ogg'
  };

  if(!Modernizr.touch) {
    var vsrc = null;
    // Test for video codec support with Modernizr
    if (Modernizr.video.webm) {
      vsrc = formats.webm;
    } else if (Modernizr.video.ogg) {
      vsrc = formats.ogg;
    } else if (Modernizr.video.h264){
      vsrc = formats.mp4;
    }

    $('#bgvid').attr({
      src : vsrc,
      poster: '/assets/img/bgclip.jpg'
    }).load();

  } else {
    $('#herounit').addClass('hidden');
    $('.navbar').addClass('top-nav-collapse disable-nav-expanded');
  }
})(jQuery, window);
