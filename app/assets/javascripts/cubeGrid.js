var cubeGrid = function(getTimeDomain, getFrequencies, text, textColor){
  //  emitter factory
  var attribs = {
    currentAnimationId: null,
    emitterFrequency: null,
    cubes: [],
    emitters: [],
    //Creating the scene and objects
    scene: null,
    camera: null,
    renderer: null,
    // Add OrbitControls so that we can pan around with the mouse.
    controls: null,
    particleNumber: 10,
    particleSpeedBase: 90,
    particleSpeedSpread: 10,
    particleBackgroundColorController: 0x000000,
    cubeStrength: 0.1,
    yourText: text,
    text3dColor: textColor
    //var controls;
  }
  // Helpers
  // Creates random colors
  function randomFairColor() {
    var min = 64;
    var max = 224;
    var r = (Math.floor(Math.random() * (max - min + 1)) + min) * 65536;
    var g = (Math.floor(Math.random() * (max - min + 1)) + min) * 256;
    var b = (Math.floor(Math.random() * (max - min + 1)) + min);
    return r + g + b;
  }

  var cubeFactory = function (x,y){

    var geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    var material = new THREE.MeshPhongMaterial({
      color: randomFairColor(),
      ambient: '0xff550d',
      specular: 0xffffff,
      shininess: 10,
      reflectivity: 1.5
    });

    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = x*2;
    cube.position.y = y*2;
    cube.position.z = 30;
    return cube;
  }

  var emitterFactory = function(x, y) {
    var scene = attribs.scene;
    var settings = {
      //where particles start, settings here for colors?, spread speed?
      positionStyle  : Type.SPHERE,
      positionBase   : new THREE.Vector3( x, y, 0 ),
      positionRadius : 10,

      velocityStyle  : Type.SPHERE,
      speedBase      : attribs.particleSpeedBase,
      speedSpread    : attribs.particleSpeedSpread,
      accelerationBase : new THREE.Vector3( 0, 0, -80  ),
      particleTexture : THREE.ImageUtils.loadTexture( 'images/white.png' ),
      blendStyle   : THREE.AdditiveBlending,

      sizeTween    : new Tween( [1], [2] ),//size of particles
      sizeBase    : 0.9,
      sizeSpread  : 0.5,
      colorBase   : new THREE.Vector3(1, 10, 0), // H,S,L
      colorSpread : new THREE.Vector3(1, 1, 1),
      opacityBase : 1,

      particlesPerSecond : attribs.particleNumber,
      particleDeathAge   : 1,
      emitterDeathAge    : .5
    };
    var engine = new ParticleEngine()
    engine.setValues(settings);//starting the particle engine
    engine.initialize(attribs.scene);
    // emitters.push(engine);
    return engine;
  };

  function init () {
    attribs.scene = new THREE.Scene();
    attribs.camera = new THREE.PerspectiveCamera(60, $(window).width() / $(window).height(), 1, 1000);
    attribs.renderer = new THREE.WebGLRenderer();
    // Add OrbitControls so that we can pan around with the mouse.
    attribs.controls = new THREE.OrbitControls(attribs.camera, attribs.renderer.domElement);

    $('#visualiser-canvas').append(attribs.renderer.domElement);
    // create cubes probably can change this setting x y ie. just change divisor
    for (i=0; i < 512; i++){
      var x = Math.floor(i/16)-16;
      var y = i % 16;
      var cube = cubeFactory(x,y);
      attribs.cubes.push(cube);
      attribs.scene.add(cube);
    };

    var directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0,-5,1);
    attribs.scene.add(directionalLight);
     var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight2.position.set(-6,1,1);
    attribs.scene.add(directionalLight2);

    attribs.camera.position.z = 50;
    attribs.camera.position.x = 0;
    attribs.camera.position.y = -50;

    attribs.renderer.setClearColor( attribs.particleBackgroundColorController, 0 ); // the default

    var material = new THREE.MeshPhongMaterial({
    color: attribs.text3dColor
    });
    textGeom = new THREE.TextGeometry( attribs.yourText, {
        font: 'helvetiker', // Must be lowercase!
        weight: 'bold',
        size: 20,
        height: 7,
        curveSegments: 5
    });
    textMesh = new THREE.Mesh( textGeom, material );

    attribs.scene.add( textMesh );

    // Do some optional calculations. This is only if you need to get the
    // width of the generated text
    textGeom.computeBoundingBox();
    textMesh.rotation.x = -62;
    textMesh.position.x = 0;
    textMesh.position.y = 10;
    textMesh.position.z = 0;
    textGeom.textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
  }

  var render = function(){
    attribs.renderer.setClearColor( attribs.particleBackgroundColorController, 0 ); // the default
    var freqPoints = [];
    var freqArray = getTimeDomain();
    var freqData = getFrequencies();
    // Get data and move blocks
    for (var i = 0; i < freqArray.length; i++) {
      attribs.cubes[i].position.z = (freqArray[i]-128) * attribs.cubeStrength;
    };
    attribs.emitters.push(emitterFactory(_.random(0, 50), _.random(0, 50)));// create explosions
    // update emissions
    for (var i = 0; i < attribs.emitters.length; i++) {
      attribs.emitters[i].update(.15);
    }
    attribs.currentAnimationId = requestAnimationFrame(render);
    attribs.renderer.render(attribs.scene, attribs.camera);
    attribs.controls.update();
  };

  // Begin program
  init()
  render();
  attribs.renderer.setSize($(window).width(), $(window).height());
  currentVisualiser = attribs;
}