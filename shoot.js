AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        bullet.setAttribute("velocity", direction.multiplyScalar(-10));
        bullet.setAttribute('dynamic-body',{
          shape:'sphere',
          mass:0
        });

        var scene = document.querySelector("#scene");

        bullet.addEventListener('collide',this.removebullet)

        scene.appendChild(bullet);
      }
    });
  },
  removebullet:function(e){
    var element = e.detail.target.el;
    var element_hit = e.detail.body.el;
    var impulse = new CANNON.Vec3(-2,2,1)
    var world_point = new CANNON.Vec3().copy(element_hit.getAttribute('position'))

    if(element_hit.id.includes('box')){
      console.log("box-selected")
      element_hit.setAttribute('material',{
        opacity:0.6,
        transparent:true
      }
      
    )
    element_hit.body.applyImpulse(impulse,world_point)
    element.removeEventListener('collide',this.shoot)
    var scene = document.querySelector('#scene')
    scene.removeChild(element)
    }

    console.log(e.detail.target.el)
    console.log(e.detail.body.el)
  }
});


