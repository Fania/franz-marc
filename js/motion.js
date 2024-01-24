// const { closeSync } = require("fs");

let canvas = document.getElementById('canvas');
let stream = document.getElementById('stream');
let ctx = canvas.getContext('2d');
let cx,cy;
let lastHandPosX,lastHandPosY;
let currHandElem;

function onResults(handData) {
  drawHandPositions(canvas, ctx, handData);
}

function drawHandPositions(canvas, ctx, handData) {
  canvas.width = stream.offsetWidth;
  canvas.height = stream.offsetHeight;
  ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(
      handData.image, 0, 0, ctx.canvas.width, ctx.canvas.height);
  if (handData.multiHandLandmarks) {
    for (const landmarks of handData.multiHandLandmarks) {
      drawConnectors(ctx, landmarks, HAND_CONNECTIONS,
                    {color: '#00FF00', lineWidth: 3});
      drawLandmarks(ctx, landmarks, {color: '#FF0000', lineWidth: 1});
      
      lastHandPosX = landmarks[5].x * 1500;
      lastHandPosY = landmarks[5].y * 1062;
      currHandElem = document.elementFromPoint(lastHandPosX,lastHandPosY);
      // console.log(currHandElem);
      // console.log(currHandElem === null);

      if(currHandElem && currHandElem !== null) {
        console.log('test', currHandElem);
      }

      // console.log(currHandElem.tagName);
      // if(currHandElem.tagName) console.log('hallo');
      // if(currHandElem.tagName === 'path' 
      // && currHandElem !== null) {
      //   console.log('path element');
      //   // handleSolids(currHandElem);
      // } else {
      //   console.log('not path element');
      // }

    }
  }
  ctx.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(stream, {
  onFrame: async () => {
    await hands.send({image: stream});
  },
  width: 1500,
  height: 1062
});
camera.start();
