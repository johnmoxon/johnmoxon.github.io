/**
 * contact_form.js
 * Handles Ajax handling of the simpleform
 */
;(function($, window, undefined){
  $('#simpleform').bind('submit', function(event) {
    var $this = $(this);

    // Push enquiry information to dataLayer and fire event
    var enquiryData = {};
    $.each($this.serializeArray(), function(){
        enquiryData[this.name] = this.value;
    });

    dataLayer.push({
      'event'   : 'enquiry.submit',
      'enquiry' : enquiryData,
      'enquiry.email' : enquiryData.email,
      'enquiry.fullname' : enquiryData.fullname,
      'enquiry.message' : enquiryData.message
    });

    $.ajax({
      dataType: 'jsonp',
      url: "http://getsimpleform.com/messages/ajax?form_api_token=41dc591ad6a976440d791b04906034c7",
      data: $this.serialize()
    }).done(function() {
      $this.slideUp()
        .parent()
        .find('.alert')
        .removeClass('hide')
        .hide()
        .fadeIn(700);
    });

    event.preventDefault();
  });
})(jQuery, window);
