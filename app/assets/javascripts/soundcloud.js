$(document).ready(function () {

  $('#soundcloud-url input').keypress(function (e) {
    var key = e.which;
    console.log('key pressed', key);
    if(key == 13) {
      var trackUrl = $('#soundcloud-url input').val().trim();
      var soundCloudUrl = 'http://api.soundcloud.com/resolve.json';
      var client_id = '6e96cfcaf224ae79b356dbd500932604';
      $.ajax({
        url: soundCloudUrl,
        dataType: 'json',
        data: {
          url: trackUrl,
          client_id: client_id
        },
        success: function (result) {
          Sound.audio0.pause();
          Sound.audio0.src = result.stream_url + '?client_id=' + client_id;
          Sound.audio0.play();
          $('footer').empty();
          var p = $('<p>');
          p.attr('id', 'upl_success');
          p.text(result.title)
          $('footer').append(p);
          $('#soundcloud-url').toggle('fold');
        }
    });
    }
  });
});
