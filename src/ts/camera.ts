import { FollowCamera, Scene, Vector3 } from '@babylonjs/core';

const createCamera = (scene: Scene, canvas: HTMLCanvasElement) => {
  // eslint-disable-next-line max-len
  // const camera = new ArcRotateCamera('camera1', -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 5, -10), scene);
  // eslint-disable-next-line max-len
  // const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2.5, 5, new Vector3(0, 20, 0), scene);
  // camera.upperBetaLimit = Math.PI / 2.2;
  // camera.attachControl(canvas, true);
  const camera = new FollowCamera('followCam', new Vector3(-20, 0, -20), scene);

  // camera.heightOffset = 5;
  camera.radius = 1;
  camera.cameraDirection = new Vector3(-20, 0, -20);
  // camera.rotationOffset = 0;
  // camera.maxCameraSpeed = 2;

  camera.attachControl();

  return camera;
};

export default createCamera;
