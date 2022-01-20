import {
  Engine,
  Scene,
  Vector3,
  ShadowGenerator,
  DirectionalLight,
} from '@babylonjs/core';
import * as GUI from 'babylonjs-gui';

import createFountain from './Prefabs/fountain';
import createSkybox from './Prefabs/skybox';
import createDwellings from './Prefabs/dwellings';
import createLamps from './Prefabs/lamp';
import createTrees from './Prefabs/trees';
import createDude from './Prefabs/dude';
import createCar from './Prefabs/car';
import createCamera from './camera';

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
