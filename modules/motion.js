export { startMotion, stopMotion };
import { handleColourReplacement } from "./hover.js";
import { getCurrentPage } from "./menu.js";


// const { closeSync } = require("fs");

let fawn_canvas = document.getElementById('fawn_canvas');
let mandrill_canvas = document.getElementById('mandrill_canvas');
let fawn_stream = document.getElementById('fawn_stream');
let mandrill_stream = document.getElementById('mandrill_stream');
let fawn_svg = document.getElementById('fawn_svg');
let mandrill_svg = document.getElementById('mandrill_svg');
let fctx = fawn_canvas.getContext('2d');
let mctx = mandrill_canvas.getContext('2d');
let cx,cy;
let lastHandPosX,lastHandPosY;
let currHandElem;
let fawn_svg_box = document.getElementById('fawn_svg').getBoundingClientRect();
let mandrill_svg_box = document.getElementById('mandrill_svg').getBoundingClientRect();



function startMotion() {
  // console.trace(`start Motiontracking ${motionState}`);
  // console.log(fawn_svg.offsetWidth, fawn_svg.offsetHeight);
  // console.dir(fawn_svg);
  const currentPage = getCurrentPage();
  if(currentPage==='fawn') {
    fawn_camera.start();
  } else {
    mandrill_camera.start();
  }
}
function stopMotion() {
  // console.trace(`stop Motiontracking ${motionState}`);
  fawn_camera.stop();
  mandrill_camera.stop();
}


function onResults(handData) {
  // console.log(fawn_svg.offsetWidth, fawn_svg.offsetHeight);
  drawHandPositions(handData);
}

function drawHandPositions(handData) {
  const currentPage = getCurrentPage();
  const canvas = currentPage==='fawn' ? fawn_canvas : mandrill_canvas;
  const stream = currentPage==='fawn' ? fawn_stream : mandrill_stream;
  const box = currentPage==='fawn' ? fawn_svg_box : mandrill_svg_box;
  const ctx = currentPage==='fawn' ? fctx : mctx;

  canvas.width = stream.offsetWidth;
  canvas.height = stream.offsetHeight;
  // canvas.width = box.width;
  // canvas.height = box.height;
  // canvas.height = 1062 * stream.offsetWidth / 1500;
  // for aspect ration 4:3 = 3 * window.innerWidth / 4
  // 1500 / 1062
  // canvas.height = 1062 * stream.offsetWidth / 1500;

  ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(
      handData.image, 0, 0, ctx.canvas.width, ctx.canvas.height);

  if (handData.multiHandLandmarks) {
    for (const landmarks of handData.multiHandLandmarks) {

      let landCopy = landmarks;
      let landmarksAtIndex = landCopy.at(8);
      let landmarksWithOnlyIndex = [landmarksAtIndex];
      // console.log('landmarks',landmarks);
      // console.log('landmarksAtIndex',landmarksAtIndex);
      // console.log('landmarksWithOnlyIndex',landmarksWithOnlyIndex);

      drawConnectors(ctx, landmarks, HAND_CONNECTIONS,
                    {color: '#00FF00', lineWidth: 3});
      drawLandmarks(ctx, landmarks, {color: '#7bf8fc', lineWidth: 1});
      drawLandmarks(ctx, landmarksWithOnlyIndex, {color: '#FFFFFF', lineWidth: 1, radius: Math.abs(25 * landmarksWithOnlyIndex[0].z + 15)});

      // "5" is index finger mid joint point
      // "8" is index finger tip
      let xFlipped = Math.round(landmarks[8].x * ctx.canvas.width);
      let xUnFlipped = Math.abs(xFlipped - ctx.canvas.width);
      lastHandPosX = xUnFlipped;
      lastHandPosY = Math.round(landmarks[8].y * ctx.canvas.height);
      // console.log('original','x',xFlipped,'y',lastHandPosY);
      console.log('inverse','x',lastHandPosX,'y',lastHandPosY);
      currHandElem = document.elementFromPoint(lastHandPosX,lastHandPosY);
      if(currHandElem && currHandElem !== null) {
        if(currHandElem.tagName === 'path') {
          // handleSolids(currHandElem);
          // console.log(currHandElem);
          handleColourReplacement(currHandElem);
        }
      }
    }
  } 
  // else {
  //   idleLoop();
  //   console.log('no hand data');
  // }
  ctx.restore();
}



const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  // return `data/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const fawn_camera = new Camera(fawn_stream, {
  onFrame: async () => {
    await hands.send({image: fawn_stream});
  },
  width: fawn_svg_box.width,
  height: fawn_svg_box.height,
  aspectRatio: 1.41
});
const mandrill_camera = new Camera(mandrill_stream, {
  onFrame: async () => {
    await hands.send({image: mandrill_stream});
  },
  width: mandrill_svg_box.width,
  height: mandrill_svg_box.height,
  aspectRatio: 1.46
});
