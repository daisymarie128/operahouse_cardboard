$(document).ready(function() {

  // ---------------------------sound Tab--------------------------- //
  var soundTab = {

    speed:300,
    containerWidth:$('.sound-panel').outerWidth(),
    containerLeft:$('.sound-panel').css('left'),
    containerHeight:$('.sound-panel').outerHeight(),
    tabWidth:$('.sound-tab').outerWidth(),


    init:function(){
      $('.sound-panel').css('height',soundTab.containerHeight + 'px');

      $('a.sound-tab').click(function(event){
        if ($('.sound-panel').hasClass('open')) {
            $('.sound-panel')
            .animate({left: soundTab.containerLeft}, soundTab.speed)
            .removeClass('open');
        } else {
            $('.sound-panel')
            .animate({left:'0'},  soundTab.speed)
            .addClass('open');
        }
        event.preventDefault();
      });
    }
  };

  soundTab.init();
  // -----------------------Visualiser Tab------------------------- //
  var visTab = {

    speed:300,
    containerWidth:$('.vis-panel').outerWidth(),
    containerHeight:$('.vis-panel').outerHeight(),
    tabWidth:$('.vis-tab').outerWidth(),


    init:function(){
      $('.vis-panel').css('height', 'auto');

      $('a.vis-tab').click(function(event){
        console.log('sdfsd')
        if ($('.vis-panel').hasClass('open')) {
          console.log('wwerw')
            $('.vis-panel')
            .animate({right:'-' + visTab.containerWidth}, visTab.speed)
            .removeClass('open');
        } else {
          console.log('xcxcv')
            $('.vis-panel')
            .animate({right:'0'},  visTab.speed)
            .addClass('open');
        }
        event.preventDefault();
      });
    }
  };

  visTab.init();

  //------------------ MENU JS --------------------//
    // show and hide mp3 / soundcloud pop outs with jquery-ui
  $('#mp3-drop-menu').on('click', function () {
    if ($('#soundcloud-url').is(':visible')) {
      $('#soundcloud-url').hide();
    };
    if ($('#drop-zone').is(':hidden')) {
      $('#drop-zone').toggle('fold');
    } else {
      $('#drop-zone').toggle('fold');
    };
  });

  $('#soundcloud-menu').on('click', function () {
    if ($('#drop-zone').is(':visible')) {
      $('#drop-zone').hide();
    };
    if ($('#soundcloud-url').is(':hidden')) {
      $('#soundcloud-url').toggle('fold');
    } else {
      $('#soundcloud-url').toggle('fold');
    };
  });



    // Sound panel menu button annimations
  $('#mp3-drop-menu').mousedown(function () {
    $('#mp3-drop-menu').css('top', '-5px');
  });

  $('#mp3-drop-menu').mouseup(function () {
    $('#mp3-drop-menu').css('top', '0px');
  });


  $('#soundcloud-menu').mousedown(function () {
    $('#soundcloud-menu').css('top', '55px')
  });

  $('#soundcloud-menu').mouseup(function () {
    $('#soundcloud-menu').css('top', '59px')
  });

});
