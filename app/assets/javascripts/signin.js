$(document).ready(function() {
  // setup settings after user log in
  var setUpSettings = function(settings) {
    var visualiser_id = settings.visualiser_id;
    var parameters = settings.settings;
    for (var key in parameters) {
      $('#'+ key).val(parameters[key]);
      console.log(key, parameters[key]);
    }
  };

  $( "#sign-in-link" ).on('click', function(){
    $(".sign-in-form").slideToggle('slow');
  });

  $("#sign-in-ajax").on('ajax:success', function (xhr, data) {
    $(".sign-in-form").slideToggle('slow');
    $("#sign-in-link").hide();
    $("#sign-up-link").hide();
    user_id = data.id;
    var $div = $('<div>').addClass("log-out-link")
    var a = $('<a>').text("Log out" + data.username );
    $div.append(a);
    a.attr('id','logout');
    console.log($div);
    $('#inner-nav').append($div);
    // setup settings
    var settings = data.settings;
    console.log(settings)
    for (var i = 0; i < settings.length; i++) {
      console.log('setting up');
      setUpSettings(settings[i]);
    }
  })

  $("#inner-nav").on('click',"#logout", function() {
    $.ajax({
      url: '/sessions/' + user_id,
      type: 'DELETE',
      success: function() {
        $('#logout').remove();
        // $("#sign-in-link").slideToggle('slow');
        $("#sign-up-link").slideToggle('slow');
        $(".sign-in-form").slideToggle('slow');
      }
    });
  });

});