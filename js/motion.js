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
      // console.log('inverse','x',lastHandPosX,'y',lastHandPosY);
      currHandElem = document.elementFromPoint(lastHandPosX,lastHandPosY);
      if(currHandElem && currHandElem !== null) {
        if(currHandElem.tagName === 'path') {
          handleSolids(currHandElem);
        }
      }
    }
  }
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

const camera = new Camera(stream, {
  onFrame: async () => {
    await hands.send({image: stream});
  },
  width: 1500,
  height: 1062
});
camera.start();


// console.log('outside',motionState);
// if(motionState === false) {
//   console.log('inside false',motionState);
//   // stopMotion();
//   camera.stop();
// } else {
//   console.log('inside true',motionState);
//   // startMotion();
//   camera.start();
// }

// const mocapButton = document.getElementById('motion');
// mocapButton.addEventListener('change', (event) => {
//   // console.log(mocapButton.checked === true);
//   if(mocapButton.checked === true) {
//     stopAutoColours();
//     localStorage.clear();
//     saveColours(defaults);
//     location.reload(); 
//     motionState = true;
//     camera.start();
//     // startMotion();
//     updateColour('a_button_state', 'motion');
//   }
// });