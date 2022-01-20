import {
  Color3,
  Mesh,
  MeshBuilder,
  Scene, SpotLight, StandardMaterial, Vector3,
} from '@babylonjs/core';

const createLamp = (scene: Scene) => {
  const lampLight = new SpotLight('lampLight', Vector3.Zero(), new Vector3(0, -1, 0), Math.PI, 1, scene);
  lampLight.diffuse = Color3.Yellow();

  const lampShape = [];
  for (let i = 0; i < 20; i += 1) {
    lampShape.push(new Vector3(Math.cos((i * Math.PI) / 10), Math.sin((i * Math.PI) / 10), 0));
  }

  lampShape.push(lampShape[0]);

  const lampPath = [];
  lampPath.push(new Vector3(0, 0, 0));
  lampPath.push(new Vector3(0, 10, 0));
  for (let i = 0; i < 20; i += 1) {
    // eslint-disable-next-line max-len
    lampPath.push(new Vector3(1 + Math.cos(Math.PI - (i * Math.PI) / 40), 10 + Math.sin(Math.PI - (i * Math.PI) / 40), 0));
  }
  lampPath.push(new Vector3(3, 11, 0));

  const yellowMat = new StandardMaterial('yellowMat', scene);
  yellowMat.emissiveColor = Color3.Yellow();

  const lamp = MeshBuilder.ExtrudeShape('lamp', {
    cap: Mesh.CAP_END, shape: lampShape, path: lampPath, scale: 0.5,
  });

  const bulb = MeshBuilder.CreateSphere('bulb', { diameterX: 1.5, diameterZ: 0.8 });

  bulb.material = yellowMat;
  bulb.parent = lamp;
  bulb.position.x = 2;
  bulb.position.y = 10.5;

  lampLight.parent = bulb;

  lamp.scaling = new Vector3(0.12, 0.12, 0.12);

  return lamp;
};

export default createLamp;
