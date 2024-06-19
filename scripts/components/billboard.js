AFRAME.registerComponent('billboard', {
    schema: {
        target: {type:'string', default: 'camera'},
        rotationOffset: {type:'vec3', default: { x: 0, y: 90, z: 0 }}
    },
    init: function () { },
    update: function () { },
    tick: function () {
      const targetEl = document.getElementById(this.data.target).object3D;
      const el = this.el.object3D;
      const posWorldTarget = new THREE.Vector3();
      const posWorld = new THREE.Vector3();
      targetEl.getWorldPosition(posWorldTarget);
      el.getWorldPosition(posWorld);
      var direction = posWorldTarget.sub(posWorld);
      var parentEntity = el.parent;
      const directionParent = new THREE.Vector3();
      parentEntity.getWorldDirection(directionParent);
      directionParent.y=0;
      direction.y=0;
      var angle=calculateSignedAngle(directionParent,direction, new THREE.Vector3(0,1,0));
      el.rotation.y=angle;
    }
  });

  function calculateSignedAngle(vector1, vector2, axis) {
    // Convert A-Frame positions to THREE.js vectors
    var vec1 = new THREE.Vector3(vector1.x, vector1.y, vector1.z);
    var vec2 = new THREE.Vector3(vector2.x, vector2.y, vector2.z);

    // Normalize vectors to ensure accurate angle calculation
    vec1.normalize();
    vec2.normalize();

    // Calculate the dot product
    var dotProduct = vec1.dot(vec2);

    // Calculate the cross product
    var crossProduct = new THREE.Vector3();
    crossProduct.crossVectors(vec1, vec2);

    // Calculate the angle in radians
    var angle = Math.atan2(crossProduct.length(), dotProduct);

    // Determine the sign of the angle based on the axis
    var axisVec = new THREE.Vector3(axis.x, axis.y, axis.z);
    var direction = Math.sign(axisVec.dot(crossProduct));

    // Calculate the signed angle
    var signedAngle = angle * direction;

    return signedAngle;
}