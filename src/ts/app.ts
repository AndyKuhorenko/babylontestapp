import {
  Engine,
  Scene,
  Vector3,
  ShadowGenerator,
  DirectionalLight,
} from '@babylonjs/core';
import * as GUI from 'babylonjs-gui';

import createFountain from './fountain';
import createSkybox from './skybox';
import createDwellings from './dwellings';
import createLamp from './lamp';
import createTrees from './trees';
import createCarBody from './car';
import addWheels from './wheels';
import createDude from './dude';
import createCamera from './camera';

const createLamps = (scene: Scene) => {
  const lamp = createLamp(scene);
  lamp.position = new Vector3(2, 0, 2);
  lamp.rotation = Vector3.Zero();
  lamp.rotation.y = -Math.PI / 4;

  const lamp3 = lamp.clone('lamp3');
  lamp3.position.z = -8;

  const lamp1 = lamp.clone('lamp1');
  lamp1.position.x = -8;
  lamp1.position.z = 1.2;
  lamp1.rotation.y = Math.PI / 2;

  const lamp2 = lamp1.clone('lamp2');
  lamp2.position.x = -2.7;
  lamp2.position.z = 0.8;
  lamp2.rotation.y = -Math.PI / 2;
};

const createCar = (scene: Scene) => {
  addWheels(scene, createCarBody(scene));
};

function createScene(canvas: HTMLCanvasElement) {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);
  const light = new DirectionalLight('light', new Vector3(0, -1, 1), scene);
  light.position = new Vector3(0, 50, -10);

  const shadowGenerator = new ShadowGenerator(1024, light);

  const camera = createCamera(scene, canvas);
  createTrees(scene);
  createSkybox(scene);
  createFountain(scene);
  createLamps(scene);
  createDude(scene, shadowGenerator, camera);
  createDwellings(scene);
  createCar(scene);

  const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', true, scene);
  const panel = new GUI.StackPanel();
  panel.width = '220px';
  panel.top = '-50px';
  panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  adt.addControl(panel);

  const header = new GUI.TextBlock();
  header.text = 'Night to day';
  header.height = '30px';
  header.color = 'white';
  panel.addControl(header);

  const slider = new GUI.Slider();
  slider.minimum = 0;
  slider.maximum = 1;
  slider.borderColor = 'black';
  slider.color = '#AAAAAA';
  slider.background = '#white';
  slider.value = 1;
  slider.height = '20px';
  slider.width = '200px';
  panel.addControl(slider);

  slider.onValueChangedObservable.add((value: number) => {
    if (light) {
      light.intensity = value;
    }
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
}

window.onload = () => {
  const renderCanvas = <HTMLCanvasElement> document.getElementById('canvas');

  createScene(renderCanvas);
};
