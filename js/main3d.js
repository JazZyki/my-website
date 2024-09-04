import * as THREE from 'three';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.137.5/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
        

let scene, camera, renderer, controls;

init();

function init() {
    // Prepare for render
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Setup renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        shadowMap: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMappingExposure = 1;
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    // Setup environment
    const environment = new RoomEnvironment(renderer);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    // Setup scene
    scene = new THREE.Scene();
    //scene.background = new THREE.Color(0xbbbbbb);
    scene.environment = pmremGenerator.fromScene(environment).texture;
    environment.dispose();

    // Setup camera
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 15);
    camera.position.set(0, 3, 0);
    camera.lookAt(scene.position);

    // Setup loader
    const ktx2Loader = new KTX2Loader()
        .setTranscoderPath('jsm/libs/basis/')
        .detectSupport(renderer);
    const loader = new GLTFLoader().setPath('../sources/');
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);
    loader.load('basic.glb',
        function (gltf) {
            //gltf.scene.position.y = -0.75;
            scene.add(gltf.scene);
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            //rotateCamera();
        },

        function (xhr) {
            let number = xhr.total / 1000000;
            number = number.toFixed(2)
            
            let loadProgress = (xhr.loaded / xhr.total * 100)
            if (loadProgress < 100) {
                //loaderStart(loadProgress, number);
            }
            else {
                const delay = setTimeout(function () {
                    //preloader.style.opacity = 0;
                }, 3000)
                const delay2 = setTimeout(function () {
                    //preloader.style.display = 'none';
                }, 3500)
            }
        },
        function (error) {
            console.log('An error happened');
        }
    );

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 8;
    controls.maxDistance = 11;
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI * 0.5;
    //controls.minAzimuthAngle = Math.PI * 0.5;
    //controls.maxAzimuthAngle = Math.PI * 1;
    controls.update();
    controls.enableDamping = true;
    controls.addEventListener('change', () => {
        //isInteracting = true;
    });
    controls.addEventListener('start', () => {
        //rotateCamera = false;
    });
    controls.addEventListener('end', () => {
        //isInteracting = false;
    });

    window.addEventListener('resize', onWindowResize);
    //window.addEventListener('mousemove', onMouseMove);
    //window.addEventListener('click', onClick);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function render() {
    renderer.render(scene, camera);
}

function animate() {
    //requestAnimationFrame(animate);
    //controls.update();
    renderer.render(scene, camera);
}

// Form submission
$('#contactForm').on('submit', function(e) {
    e.preventDefault();

    $.ajax({
        type: 'POST',
        url: 'process_form.php',
        data: $(this).serialize(),
        success: function(response) {
            alert('Form submitted successfully!');
        },
        error: function() {
            alert('An error occurred. Please try again.');
        }
    });
});