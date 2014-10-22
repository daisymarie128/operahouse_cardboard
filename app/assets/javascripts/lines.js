function lines(getTimeDomain, getFrequencies) {
  // var camera;
  var lines = []; //Global array for animated elements
  var lines2 = []; //Global array for animated elements
  // colors = [[255,0,0],[255,230,255],[255,0,213]];
  // Set up the scene, camera, and renderer as global variables.
  var attribs = {
    lineWidth: .2,
    speedX: 0.1,
    speedY: -0.2,
    speedZ: 1,
    backgroundColorController: 0x000000,
    currentAnimationId: null
  }

  var video, videoImage, videoImageContext, videoTexture;

  // Sets up the scene.
  function init() {

    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    var mesh;
    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    element = renderer.domElement;
    renderer.shadowMapEnabled = true; //Needs to be enabled for shadows
    renderer.setSize(WIDTH, HEIGHT);
    effect = new THREE.StereoEffect(renderer);
    effect.setSize(WIDTH, HEIGHT);
    $('#visualiser-canvas').append(element);

    //add fog to the scene. zoom in and out gets brighter and darker. delete if you want
    // scene.fog = new THREE.FogExp2( 0x000000, .0235 );

    // Create a camera, zoom it out from the model a bit, and add it to the scene. .PerspectiveCamera (Feild of view, Aspect Ratio
    // .. Near(start rendering), Far (vanishing point? horizon line?))
    camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 0.1, 20000);
    //.PerspectiveCamera (zoom, )
    camera.position.set(281.5454554532732, 10.717505604326544, 9.709799474934318);
    scene.add(camera);
    renderer.setClearColor( attribs.backgroundColorController, 0 ); // the default

    // Create an event listener that resizes the renderer with the browser window.
    $(window).on('resize', function() {
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Set the background color of the scene.
    // renderer.setClearColorHex(0xfff, 1);

    //making the light factory
    var lightFactory = function(x,y,z) {
      var light = new THREE.SpotLight(0xfffff);
      light.position.set(x,y,z);
      light.castShadow = true;
      scene.add(light);
      return light;
    }

    // Create a light
    // var light1 = lightFactory(0,100,0);
    // var light2 = lightFactory(100,0,0);
    var light3 = lightFactory( 0,100,100);
    // var light3 = lightFactory( 0,0,0);

    var light = new THREE.HemisphereLight(0xfffff, 0xfffff, .5);
    scene.add(light);

    // create lines
    // var line1 = lineFactory();
    // lines.push(line1);


    // ///////////
    // // VIDEO //
    // ///////////

    // // create the video element
    // video = document.createElement( 'video' );
    // // video.id = 'video';
    // // video.type = ' video/ogg; codecs="theora, vorbis" ';
    // video.src = '/audio/output.ogg';
    // video.load(); // must call after setting/changing source
    // video.play();

    // // alternative method --
    // // create DIV in HTML:
    // // <video id="myVideo" autoplay style="display:none">
    // //    <source src="videos/sintel.ogv" type='video/ogg; codecs="theora, vorbis"'>
    // // </video>
    // // and set JS variable:
    // // video = document.getElementById( 'myVideo' );

    // videoImage = document.createElement( 'canvas' );
    // videoImage.width = 480;
    // videoImage.height = 204;

    // videoImageContext = videoImage.getContext( '2d' );
    // // background color if no video present
    // videoImageContext.fillStyle = '#000000';
    // videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

    // videoTexture = new THREE.Texture( videoImage );
    // videoTexture.minFilter = THREE.LinearFilter;
    // videoTexture.magFilter = THREE.LinearFilter;

    // var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
    // // the geometry on which the movie will be displayed;
    // //    movie image will be scaled to fit these dimensions.
    // var movieGeometry = new THREE.PlaneGeometry( 240, 100, 4, 4 );
    // var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
    // movieScreen.position.set(0,50,0);
    // scene.add(movieScreen);

    // camera.position.set(0,150,300);
    // camera.lookAt(movieScreen.position);


  }

  // Vertices builder x,y,z where y amplitude passed in from frequency
  var verticesFactory = function(x, y) {
    var vertex = new THREE.Vector3(x, y, -100)
    return vertex;
  }

  var lineFactory = function(r, g, b, vertexArray) {
    var lineMaterial = new THREE.LineBasicMaterial({
      // color: "rgb("+r+","+g+","+b+")"
      color: "rgb("+r+","+g+","+b+")",
      linewidth: attribs.lineWidth
    });
    // console.log(lineMaterial);
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices = vertexArray;

    var line = new THREE.Line( lineGeometry, lineMaterial );
    scene.add( line );
    lines.push(line);

    return line;
  }



  // Get data
  var getData = function() {
    //lineFactory build at intervals
    var freqPoints = [];
    var freqArray = getTimeDomain();
    var freqData = getFrequencies();
    var average = _.reduce(freqData, function (memo, num) {return memo + num}, 0)/freqData.length*2;
    // Get data and build vertices
    for (var i = 0; i < freqArray.length; i++) {
      var amplitude = freqArray[i]/8;
      //Don't understand how this is making the default animation change before song starts
      var freqPoint = verticesFactory((i-(freqArray.length)/2)*2, amplitude);
      freqPoints.push(freqPoint);
    };
    // lineFactory(freqData[0], freqData[5], freqData[10], freqPoints);

    // if (average < 50){
    //   lineFactory(colors[0][0], colors[0][1], colors[0][2],freqPoints);
    //   console.log("thisone");
    // }   else if (average > 50 && average < 255){
    //   lineFactory(colors[3][0], colors[3][1], colors[3][2],freqPoints);
    //   console.log("doing");
    // }
    // randomize colors to music
    // var colorArray = [];
    // for (var j = 0; j < freqArray.length; j++) {
    //   var amplitude = freqArray[j]/8;
    //   var colors = [[255,0,0],[0,230,255,],[0,255,85],[255,255,255]];
    // }
    //   if (amplitude < 50){
    //     lineFactory(colors[0][0], colors[0][1], colors[0][2],freqPoints);
    //   }
    //   if (amplitude > 50 && amplitude < 2000){
    //     lineFactory(colors[3][0], colors[3][1], colors[3][2],freqPoints);
    //     console.log("doing");
    //   }
    //   lineFactory(colors[0][0], colors[0][1], colors[0][2],freqPoints);

    lineFactory(random0255(), random0255(), random0255(),freqPoints);
  }

  var cameraCheck = function (){
    // if (camera.position.y <= 15.788705886682353){
    //   camera.position.y = 15.788705886682352;
    // }
    // if (camera.position.y >= 43.64040775696008){
    //   camera.position.y = 43.6404077569600;
    // }
    // if (camera.position.x <= 277.39813827645145){
    //   camera.position.x = 277.3981382764514;
    // }
    // if (camera.position.x >= 549.0749218863431){
    //   camera.position.x = 549.074921886343;
    // }
    // if (camera.position.z >= 126.61507971732826){
    //   camera.position.z = 126.6150797173282;
    // }
    // if (camera.position.z <= -38.54680380116381){
    //   camera.position.z = -38.5468038011638;
    // }

  }

  // Renders the scene and updates the render as needed.
  function animate() {
    // if ( video.readyState === video.HAVE_ENOUGH_DATA )
    // {
    //   consle.log('video first if')
    //   videoImageContext.drawImage( video, 0, 0 );
    //   if ( videoTexture )
    //     console.log('video second if')
    //     videoTexture.needsUpdate = true;
    // }
    renderer.setClearColor( attribs.backgroundColorController, 0 ); // the default
    getData();
    attribs.currentAnimationId = requestAnimationFrame(animate);
    // renderer.render(scene, camera);
    controls.update();
    cameraCheck();

    effect.render(scene, camera);

    // lines movement
    for ( var i = 0; i< lines.length; i++){
      var line = lines[i];
      line.position.x += attribs.speedX;
      line.position.y += attribs.speedY;
      line.position.z += attribs.speedZ;
      // line.position.y += -0.1;
    }


    if(lines.length > 300){
      lastLine = lines.shift();
      scene.remove(lastLine);
    }

  }
  function random0255() {
    // console.log("doing");
    return _.random(0,255);
    // return parseInt(result);
  }


  function randomColors() {
    return colors.sort( function() { return 0.4 - Math.random() } );
    // return parseInt(result);
  }

  // Testing on controls
  // $('#speedControls').on('submit', function(event) {
  //   event.preventDefault();
  //   attribs.speedX = parseFloat($('#speedControlX').val());
  //   speedY = parseFloat($('#speedControlY').val());
  //   speedZ = parseFloat($('#speedControlZ').val());
  //   lineWidth = parseFloat($('#lineWidthControler').val());
  //   backgroundColorControler = parseInt($('#backgroundColorControl').val().slice(1,7), 16);
  // });

  init();
  // backgroundColor = 0xFFFFFFF
  animate();
  currentVisualiser = attribs;
}

