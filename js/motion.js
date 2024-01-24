let canvas = document.getElementById('canvas');
let stream = document.getElementById('stream');
let ctx = canvas.getContext('2d');

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
      let cx,cy;
      landmarks.map(l => {
        cx = l.x * 1500;
        cy = l.y * 1062;
      })
      console.log(cx, cy);
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
