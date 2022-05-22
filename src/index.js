import Movements from "./movements.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambient_light = new THREE.AmbientLight(0xbda355);
const directional_light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(directional_light);
scene.add(ambient_light);

const geometry_space = new THREE.BoxGeometry(100, 0.2, 50);
const material_space = new THREE.MeshPhongMaterial({ color: 0xffffff } );
const space = new THREE.Mesh(geometry_space, material_space);
scene.add(space);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );



const geometry_cone = new THREE.ConeGeometry( 5, 20, 32 );
const material_cone = new THREE.MeshPhongMaterial( {color: 0xed810a} );
const cone = new THREE.Mesh( geometry_cone, material_cone );
cone.position.set(-10, 5, 0);
scene.add( cone );

camera.position.set(10, 5, 40);

function animate() {
	requestAnimationFrame( animate );
    if(Movements.isPressed(37)){
        camera.position.x -= 0.05;
    }

    if(Movements.isPressed(38)){
        camera.position.x += 0.05;
        camera.position.y += 0.05;
    }

    if(Movements.isPressed(39)){
        camera.position.x += 0.05;
    }

    if(Movements.isPressed(40)){
        camera.position.x -= 0.05;
        camera.position.y -= 0.05;
    }

    camera.lookAt(space.position);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cone.rotation.x += 0.01;
	renderer.render( scene, camera );
}
animate();