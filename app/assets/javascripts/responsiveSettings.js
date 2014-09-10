$(document).ready(function () {
  // Helpers
  var getTimeDomain = function() {
    return Sound.getTimeDomain();
  };

  var getFrequencies = function() {
    return Sound.getFrequencyDomain();
  };
  // Settings helpers
  var getValues = function(id) {
    var settingHash = {};
    settingHash["visualiser"] = id;
    settingHash["setting"] = {}
    _.each($(id + ' input'), function(ele) {
      console.log($(ele).context.type)
      $ele = $(ele)
      if ($ele.context.type != 'submit') {
        settingHash["setting"][$ele.context.id] = $ele.val();
      }
    })

    return {settings: settingHash};
  }
  var sendValues = function(data) {
    $.ajax({
      url: '/settings',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(xhr, data) {
        console.log(data);
      }
    })
  }
  // made this a dirty global
  stopPrevious = function () {
    try{
      cancelAnimationFrame(currentVisualiser.currentAnimationId);
      console.log($('#visualiser-canvas').empty());
    } catch(err) {
      console.log(err);
      console.log('no id');
    }
  };
  // Initialise settings
  $("#controllsList form").hide();
  $("#sunflareControls").show();
  // Listener for dropdown
  $( "#visualisers_list" ).on('change', function(){
    console.log($( "#visualisers_list option:selected" ).val());
    switch ($( "#visualisers_list option:selected" ).val()) {
      case "lines":
        $( "#controllsList form").hide();
        $('#linesSpeedControls').show([400], 'swing');
        break;
      case "sunflare":
        $( "#controllsList form").hide();
        $('#sunflareControls').show([400], 'swing');
        break;
      case "cubeGrid":
        $( "#controllsList form").hide();
        $('#cubeGridControls').show([400], 'swing');
        break;
    }
  });
  // Listeners for creating
  $('#sunflareSubmit').on('click',function (event){
    event.preventDefault();
    stopPrevious();
    sunFlare2(getTimeDomain, getFrequencies);
  });

  $('#linesSubmit').on('click',function (event){
    event.preventDefault();
    stopPrevious();
    lines(getTimeDomain, getFrequencies);
  });


  $('#cubeGridSubmit').on('click',function (event){
    event.preventDefault();
    stopPrevious();
    var text = $('#cubeYourText').val()
    var textColor = parseInt($('#cubeText3dColor').val().slice(1,7), 16);
    cubeGrid(getTimeDomain, getFrequencies, text, textColor);
  });

  //lines controlls
  $('#speedControlX').on('change', function(){
  currentVisualiser.speedX = parseFloat($('#speedControlX').val());
  });

  $('#speedControlY').on('change', function(){
    currentVisualiser.speedY = parseFloat($('#speedControlY').val());
  });

  $('#speedControlZ').on('change', function(){
    currentVisualiser.speedZ = parseFloat($('#speedControlZ').val());
  });

  $('#lineWidthControler').on('change', function(){
    currentVisualiser.lineWidth = parseFloat($('#lineWidthControler').val());
  });

  $('#backgroundColorControl').on('change', function(){
    console.log('color change');
    currentVisualiser.backgroundColorController = parseInt($('#backgroundColorControl').val().slice(1,7), 16);
  });

  //cubeGrid controlls
  $('#particleNumber').on('change', function(){
  currentVisualiser.particleNumber = parseFloat($('#particleNumber').val());
  });

  $('#particleSpeedBase').on('change', function(){
    currentVisualiser.particleSpeedBase = parseFloat($('#particleSpeedBase').val());
  });

  $('#particleSpeedSpread').on('change', function(){
    currentVisualiser.particleSpeedSpread = parseInt($('#particleSpeedSpread').val());
  });

  $('#cubeStrength').on('change', function(){
    currentVisualiser.cubeStrength = parseInt($('#cubeStrength').val())/100;
  });

  $('#cubeYourText').on('change', function(){
    currentVisualiser.yourText = $('#cubeYourText').val();
  });

  $('#cubeBackgroundColorControl').on('change', function(){
    currentVisualiser.particleBackgroundColorController = parseInt($('#cubeBackgroundColorControl').val().slice(1,7), 16);
  });

  $('#cubeText3dColor').on('change', function(){
    currentVisualiser.text3dColor = parseInt($('#cubeText3dColor').val().slice(1,7), 16);
  });

  // Sunflare controls
  $('#sunflare-rotationX').on('change', function(){
    console.log('click');
    currentVisualiser.spinningSpeedX = parseFloat($('#sunflare-rotationX').val())/100;
  });

  $('#sunflare-rotationY').on('change', function(){
    currentVisualiser.spinningSpeedY = parseFloat($('#sunflare-rotationY').val())/100;
  });

  $('#sunflare-size').on('change', function(){
    currentVisualiser.sphereSize = parseFloat($('#sunflare-size').val())/100;
  });

  // Save listeners
  $(".save-button").on('click', function(event){
    event.preventDefault();
    switch (event.target.id) {
      case "sunflare-save":
        sendValues(getValues('#sunflareControls'));
        break;
      case "lines-save":
        sendValues(getValues('#linesSpeedControls'));
        break;
      case "cubegrid-save":
        sendValues(getValues('#cubeGridControls'));
        break;
    }
  });

  // stopPrevious();
  // lines(getTimeDomain, getFrequencies);
});



