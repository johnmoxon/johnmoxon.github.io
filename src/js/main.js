(function($,window){

  var $window = $(window);

//jQuery to collapse the navbar on scroll
$window.scroll(function() {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").not('.disable-nav-expanded').addClass("top-nav-collapse");
  } else {
    $(".navbar-fixed-top").not('.disable-nav-expanded').removeClass("top-nav-collapse");
  }

  // Show scroll to top button for posts
  if ($window.scrollTop() > $('.post-single').offset().top) {
    if($('.scroll-to-top').length < 1) {
      $('<span class="page-scroll"><a href="#content" class="scroll-to-top btn btn-default"><i class="fa fa-play-circle fa-rotate-270"></i> to top</a></span>')
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

/**
//Google Map Skin - Get more at http://snazzymaps.com/
var myOptions = {
    zoom: 15,
    center: new google.maps.LatLng(53.385873, -1.471471),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 29
        }, {
            "weight": 0.2
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 18
        }]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 16
        }]
    }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 21
        }]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
        }, {
            "color": "#000000"
        }, {
            "lightness": 16
        }]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [{
            "saturation": 36
        }, {
            "color": "#000000"
        }, {
            "lightness": 40
        }]
    }, {
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 19
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 20
        }]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#000000"
        }, {
            "lightness": 17
        }, {
            "weight": 1.2
        }]
    }]
};

var map = new google.maps.Map(document.getElementById('map'), myOptions);
*/
