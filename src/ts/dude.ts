import {
  Axis,
  FollowCamera,
  Scene, SceneLoader, ShadowGenerator, Space, Tools, Vector3,
} from '@babylonjs/core';

const createDude = (scene: Scene, shadowGenerator: ShadowGenerator, camera: FollowCamera) => {
  SceneLoader.ImportMeshAsync('mixamorig:Skin', '../scenes/', 'dude.babylon', scene).then((result) => {
    const dude = result.meshes[0];
    camera.lockedTarget = dude;
    dude.scaling = new Vector3(0.3, 0.3, 0.3);
    dude.position = new Vector3(-6, 0, 0);
    dude.rotate(Axis.Y, Tools.ToRadians(85), Space.LOCAL);
    shadowGenerator.addShadowCaster(dude, true);
    const startRotation = dude.rotationQuaternion.clone();

    scene.beginAnimation(result.skeletons[0], 91, 126, true, 1.0);

    const Walk = function (turn: number, dist: number) {
      this.turn = turn;
      this.dist = dist;
    };

    const track = [];
    track.push(new Walk(86, 7));
    track.push(new Walk(-85, 14.8));
    track.push(new Walk(-93, 16.5));
    track.push(new Walk(48, 25.5));
    track.push(new Walk(-112, 30.5));
    track.push(new Walk(-72, 33.2));
    track.push(new Walk(42, 37.5));
    track.push(new Walk(-98, 45.2));
    track.push(new Walk(0, 47));

    let distance = 0;
    const step = 0.010;
    let p = 0;

    scene.onBeforeRenderObservable.add(() => {
      dude.movePOV(0, 0, -step);
      distance += step;

      if (distance > track[p].dist) {
        dude.rotate(Axis.Y, Tools.ToRadians(track[p].turn), Space.LOCAL);
        p += 1;
        p %= track.length;
        if (p === 0) {
          distance = 0;
          dude.position = new Vector3(-6, 0, 0);
          dude.rotationQuaternion = startRotation.clone();
        }
      }
    });
  });
};

export default createDude;
