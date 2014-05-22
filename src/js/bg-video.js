/** Video **/
(function($, window, undefined){
  var formats = {
    webm : '/assets/video/bgclip.webm',
    mp4  : '/assets/video/bgclip.mp4',
    ogg  : '/assets/video/bgclip.ogg'
  };

  if(!Modernizr.touch) {
    var vsrc = null;
    // let's play some video! but what kind?
    if (Modernizr.video.webm) {
      vsrc = formats['webm'];
    } else if (Modernizr.video.ogg) {
      // try Ogg Theora + Vorbis in an Ogg container
      vsrc = formats['ogg'];
    } else if (Modernizr.video.h264){
      // try H.264 video + AAC audio in an MP4 container
      vsrc = formats['mp4'];
    }

    $('#bgvid').attr({
      src : vsrc,
      poster: '/assets/img/bgclip.jpg'
    }).load();

  } else {

  }
})(jQuery, window);
