
import "./style.css"
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// scene

const scene = new THREE.Scene();


// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 30;

// gltf (gl Transmition Format) loader
const gltfLoader = new GLTFLoader();
const donutGlb = await gltfLoader.loadAsync("../meshes/donut.glb");
const donutMesh = donutGlb.scene.getObjectByProperty("isMesh", true);
donutMesh.scale.set(5,5,5 )
donutMesh.material = new THREE.MeshStandardMaterial({color: 0xb35a1f});
scene.add(donutMesh);

// webgl renderer
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)



// camera.position.setZ(30);
// // objects in a scene
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({color: 0xeA9});
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);



const pointLight = new THREE.PointLight(0xffffff);
pointLight.intensity = 0;
pointLight.position.set(0,-20,0);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 30;
scene.add(pointLight, ambientLight);



const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 5)
scene.add(lightHelper, gridHelper);





function addStar(){
	const geometry = new THREE.SphereGeometry(2, 20, 20);
	// const material = new THREE.MeshStandardMaterial({color: "yellow"})
	const star = new THREE.Mesh(
		geometry,
		new THREE.MeshStandardMaterial(
			{map : imageTexture,
			 normalMap: imageNormal,
			})
	); 

	const [x,y,z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(200) );
	star.position.set(x,y,z);
	scene.add(star);

}

const imageTexture = new THREE.TextureLoader().load("./images/Ground080_1K-JPG/Ground080_1K-JPG_Color.jpg");
const imageNormal = new THREE.TextureLoader().load("./images/Ground080_1K-JPG/Ground080_1K-JPG_NormalDX.jpg");

// scene.background =(imageTexture);
const controls = new OrbitControls(camera, renderer.domElement);

for (let i = 0; i < 200; i++){
	addStar();
}
// main loop
function animate(){
	requestAnimationFrame(animate);

	// torus.rotation.x += 0.006;
	// torus.rotation.y += 0.005;
	// torus.rotation.z += 0.05;

	controls.update();
	
	renderer.render(scene, camera);
}

animate();