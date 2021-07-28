


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var object, newObj, controls, tControls;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 100;

controls = new THREE.OrbitControls(camera, renderer.domElement);
//tControls = new THREE.TransformControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
/*tControls.addEventListener('dragging-changed', (e) => {
	controls.enabled = !e.value
})*/


var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var objLoader = new THREE.OBJLoader();
objLoader.setPath('examples/3d-obj-loader/assets/');
objLoader.load('human.obj', function (object) {
	object.position.y = 10;
	scene.add(object);
})

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseDown(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera(mouse, camera);
	// calculate objects intersecting the picking ray
	//console.log(scene.children);
	var intersects = raycaster.intersectObjects(scene.children, true);
	console.log(intersects.length);

	for (var i = 0; i < intersects.length; i++) {
		document.getElementById('menu').style.display = 'block';

		//controls.detach(o);




		newObj = intersects[i].object;
		//tControls.attach(newObj);
		//scene.add(tControls);
		//tControls.setMode('translate');
		intersects[i].object.material.color.set(0xff0000);

		//newObj.position.x = 200;
		/*var objLoader = new THREE.OBJLoader();
		objLoader.setPath('/examples/3d-obj-loader/assets/');
		objLoader.load('human.obj', function (objectNew) {
			objectNew.position.y += 20;
			scene.add(objectNew);
		})*/

	}
}


window.addEventListener('mousedown', onMouseDown, false);

var duplicate = function () {
	objLoader.setPath('examples/3d-obj-loader/assets/');
	objLoader.load('human.obj', function (objectNew) {
		objectNew.position.y += 20;
		scene.add(objectNew);
	})
}

var del = function () {
	
		if (!(newObj instanceof THREE.Object3D)) return false;
		// for better memory management and performance
		if (newObj.geometry) {
			newObj.geometry.dispose();
		}
		if (newObj.material) {
			if (newObj.material instanceof Array) {
				// for better memory management and performance
				newObj.material.forEach(material => material.dispose());
			} else {
				// for better memory management and performance
				newObj.material.dispose();
			}
		}
		if (newObj.parent) {
			newObj.parent.remove(newObj);
		}
		// the parent might be the scene or another Object3D, but it is sure to be removed this way
		return true;
	
}
var animate = function () {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;

	renderer.render(scene, camera);
};

animate();