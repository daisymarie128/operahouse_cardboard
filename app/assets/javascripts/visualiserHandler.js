$(document).ready(function(){
  var getTimeDomain = function() {
    return Sound.getTimeDomain();
  };

  var getFrequencies = function() {
    return Sound.getFrequencyDomain();
  };
  var currentAnimationId;

  function stopPrevious () {
    try{
      cancelAnimationFrame(currentAnimationId);
      $('#container').empty();
    } catch(err) {
      console.log('no id');
    }
  };
  // Visual click listeners
  $('#lines').on('click',function(){
    // console.log(currentAnimationId);
    stopPrevious();
    lines();
  });

  $('#sunflare').on('click',function(){
    // console.log(currentAnimationId);
    stopPrevious();
    sunFlare(getTimeDomain, getFrequencies);
  });
  $('#emitter').on('click', function(){
    stopPrevious();
    emitter();
  });

  $('#galaxy').on('click', function(){
    stopPrevious();
    galaxy();
  })

  $('#cubeGrid').on('click', function(){
    stopPrevious();
    cubeGrid();
  });

  $('#flat').on('click', function(){
    stopPrevious();
    flat();
  });
});