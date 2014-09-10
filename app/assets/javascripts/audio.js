// Browser support hack
window.AudioContext = (function (){
  return  window.webkitAudioContext ||
          window.AudioContext       ||
          window.mozAudioContext;
})();

// Audio factory
var Sound = {
  audioContextSetup: function () {
    try {
      Sound.audioContext = new webkitAudioContext();
    } catch(e) {
      alert('Web Audio API is not supported in this browser');
    }
  },
  createAudioObject: function () {
    Sound.audio0 = new Audio();
    Sound.audio0.src = '/audio/MakeYouWanna.mp3';
    Sound.audio0.controls = true;
    Sound.audio0.autoplay = false;
    Sound.audio0.loop = true;
  },
  setupAudioNodes: function () {
    Sound.sourceNode = Sound.audioContext.createMediaElementSource(Sound.audio0);
    Sound.analyserNode = Sound.audioContext.createAnalyser();
    Sound.analyserNode.fftSize = 1024,
    Sound.frequencyArray = new Uint8Array(Sound.analyserNode.frequencyBinCount);
    Sound.timeDomainArray = new Uint8Array(Sound.analyserNode.frequencyBinCount);
  },
  connectAudioNodes: function () {
    Sound.sourceNode.connect(Sound.analyserNode);
    Sound.analyserNode.connect(Sound.audioContext.destination);
  },
  getFrequencyDomain: function () {
    Sound.analyserNode.getByteFrequencyData(Sound.frequencyArray);
    return Sound.frequencyArray;
  },
  getTimeDomain: function () {
    Sound.analyserNode.getByteTimeDomainData(Sound.timeDomainArray);
    return Sound.timeDomainArray;
  }
};


$(document).ready(function () {




  $('#popUpDiv #popup').on('click', function(){
    $('#popUpDiv').fadeOut(2000);
  })

  // Initial Audio setup
  Sound.audioContextSetup();
  Sound.createAudioObject();
  Sound.setupAudioNodes();
  Sound.connectAudioNodes();
  $('#player').append(Sound.sourceNode.mediaElement);

  // Function that runs when #player audio is playing sound =).
  $('#player audio').on('playing', function () {
    // frequency data console log
  })

  // ------------- FILE DRAG & DROP ------------------- //
  // reference source for code = http://html5demos.com/dnd-upload#view-source
  var dropZone = document.getElementById('drop-zone'),
    tests = {
      filereader: typeof FileReader != 'undefined',
      dnd: 'draggable' in document.createElement('span'),
      formdata: !!window.FormData,
      progress: "upload" in new XMLHttpRequest
    },
    support = {
      filereader: document.getElementById('filereader'),
      formdata: document.getElementById('formdata'),
      progress: document.getElementById('progress')
    },
    acceptedTypes = {
      'audio/mpeg': true,
      'audio/ogg': true,
      'audio/wav': true,
      'audio/x-aiff': true
    },
    progress = document.getElementById('uploadprogress'),
    fileupload = document.getElementById('upload');

  function previewfile(file) {
      var reader = new FileReader();
      reader.onload = function (event) {
        $('footer').empty();
        var p = $('<p>');
        p.attr('id', 'upl_success');
        p.text(file.name);
        $('footer').append(p);
      };

      // Pauses current audio object, assigns a new source link, and plays.
      reader.onloadend = function() {
        Sound.audio0.pause();
        Sound.audio0.src = reader.result;
        Sound.audio0.play();

        // Closing the dropzone dom element upon filedrop completion
        $('#drop-zone').toggle('fold');
      };
      reader.readAsDataURL(file);
  }

  function readfiles(files) {
      var formData = tests.formdata ? new FormData() : null;
      for (var i = 0; i < files.length; i++) {
        if (tests.formdata) formData.append('file', files[i]);
        previewfile(files[i]);
      }
  }

  // Drag & drop listeners
  if (tests.dnd) {
    dropZone.ondragover = function () { this.className = 'hover'; return false; };
    dropZone.ondragend = function () { this.className = ''; return false; };
    dropZone.ondrop = function (e) {
      this.className = '';
      e.preventDefault();
      readfiles(e.dataTransfer.files);
    }
  } else {
    fileupload.className = 'hidden';
    fileupload.querySelector('input').onchange = function () {
      readfiles(this.files);
    };
  };

});








