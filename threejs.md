#Resources
`http://threejs.org/docs/
http://learningthreejs.com/data/lets_do_a_cube/docs/lets_do_a_cube.html
http://threejs.org/docs/#Reference/Extras.Animation/Animation
http://aerotwist.com/tutorials/getting-started-with-three-js/`

#Workflow
##1. Initialise the scene, render and camera
  `// Set up the scene, camera, and renderer as global variables.
    var scene, camera, renderer;

    init();
    animate();

    // Sets up the scene.
    function init() {

      // Create the scene and set the scene size.
      scene = new THREE.Scene();
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;

      // Create a renderer and add it to the DOM.
      renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(WIDTH, HEIGHT);
      document.body.appendChild(renderer.domElement);

      // Create a camera, zoom it out from the model a bit, and add it to the scene. .PerspectiveCamera (Feild of view, Aspect Ratio
      // .. Near(start rendering), Far (vanishing point? horizon line?))
      camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 0.1, 20000);
      //.PerspectiveCamera (zoom, )
      camera.position.set(0,20,0);
      scene.add(camera);`

##2. Object
  ###Geometry - Many different geometries

  ###Material - Add material - many different types check three.js

  ###Add to to scene - scene.addObject(x`)

##3.Lights
  ###a. Create lights
  `// Create a light, set its position, and add it to the scene.
      var light = new THREE.PointLight(0xfffff);
      light.position.set(-100,200,100);
      scene.add(light);
      var material = new THREE.MeshPhongMaterial({ambient: 0x303030, color: 0xdddddd, shininess: 1000, specular: 0xdddddd});
      // Load in the mesh and add it to the scene.
      var loader = new THREE.JSONLoader();
      loader.load( "models/treehouse_logo.js", function(geometry){
        //Put model in scene. Add Mesh to Model. Takes a bunch of different Mesh styles. Look up three.js docs.
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      });`
  ###b. Creating shadows
      - use spotlight - spotLight.castShadow = true, whole bunch of other
      - add .receiveShadow to object and/or .castShadow to true

##4.Animate

##Optional
###Resizing the window
`// Create an event listener that resizes the renderer with the browser window.
      window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
      });`

###Creating custom polygons
1. Create geometry object
`var geom = new THREE.Geometry();`

2. Create vertices
     `var v1 = new THREE.Vector3(0,0,0);
      var v2 = new THREE.Vector3(0,500,0);
      var v3 = new THREE.Vector3(0,500,500);
      var v4 = new THREE.Vector3(0,1000,1000);
      var v5 = new THREE.Vector3(0,500,500);`
3. Push into geo object
      `geom.vertices.push(v1);
      geom.vertices.push(v2);
      geom.vertices.push(v3);`
4.
      geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
      geom.computeFaceNormals();

      object = new THREE.Mesh( geom, new THREE.MeshNormalMaterial() );

      scene.add(object);`
