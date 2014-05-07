/**
 * share.js
 * Handles social sharing buttons
 * based on https://github.com/kni-labs/rrssb/blob/master/js/rrssb.js
 */
;(function($, window, undefined){
  'use strict';

  var popupCenter = function(url, title, w, h) {
    // Fixes dual-screen position Most browsers Firefox
    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 3) - (h / 3)) + dualScreenTop;

    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus();
    }
  };

  $('.share a').on('click', function(e){
    var $this = $(this);
    popupCenter($this.attr('href'), $this.attr('title'), 580, 470);
    e.preventDefault();
  });
})(jQuery, window);
