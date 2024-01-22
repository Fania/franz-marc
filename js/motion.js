// Cross browser support to fetch the correct getUserMedia object.
// navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
//   || navigator.mozGetUserMedia || navigator.msGetUserMedia;
// // Cross browser support for window.URL.
// window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

// const [...blocks] = document.getElementById('colour_blocks').children;
// const svgElem = document.getElementById("marc");
// if (!hasGetUserMedia()) {
//   console.warn("getUserMedia() is not supported by your browser");
// }


let canvas = document.getElementById('canvas');
let stream = document.getElementById('stream');
let ctx = canvas.getContext('2d');




function onResults(handData) {
  drawHandPositions(canvas, ctx, handData);
}

function drawHandPositions(canvas, ctx, handData) {
  ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(
      handData.image, 0, 0, ctx.canvas.width, ctx.canvas.height);

  if (handData.multiHandLandmarks) {
    for (const landmarks of handData.multiHandLandmarks) {
      drawConnectors(ctx, landmarks, HAND_CONNECTIONS,
                    {color: '#00FF00', lineWidth: 3});
      drawLandmarks(ctx, landmarks, {color: '#FF0000', lineWidth: 1});
      // drawLandmarks(ctx, WorldLandmarks, {color: '#FF0000', lineWidth: 1});
      // console.log(WorldLandmarks);
      WorldLandmarks.map(l => {
        console.log(convertCoord(l.x));
        console.log(convertCoord(l.y));
        console.log(convertCoord(l.z));
      })
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


function convertCoord(c) {
  return c * 1000;
}



  // function snapshot() {
  //   if (localStream) {
  //     canvas.width = video.offsetWidth;
  //     canvas.height = video.offsetHeight;
  //     canvasFinal.width = video.offsetWidth;
  //     canvasFinal.height = video.offsetHeight;

  //     ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);
  //     // ctx.drawImage(video, 0, 0);

  //     // Must capture image data in new instance as it is a live reference.
  //     // Use alternative live references to prevent messed up data.
  //     imgDataPrev[version] = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //     version = (version == 0) ? 1 : 0;

  //     imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //     var length = imgData.data.length;
  //     var x = 0;
  //     while (x < length) {
  //       if (!greyScale) {
  //         // see https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data
  //         // Alpha blending formula: out = (alpha * new) + (1 - alpha) * old.
  //         // R value
  //         imgData.data[x] = alpha * (255 - imgData.data[x]) + ((1-alpha) * imgDataPrev[version].data[x]);
  //         // G value
  //         imgData.data[x + 1] = alpha * (255 - imgData.data[x+1]) + ((1-alpha) * imgDataPrev[version].data[x + 1]);
  //         // B value
  //         imgData.data[x + 2] = alpha * (255 - imgData.data[x+2]) + ((1-alpha) * imgDataPrev[version].data[x + 2]);
  //         // A value
  //         imgData.data[x + 3] = 255;
  //       } else {
  //         // GreyScale.
  //         var av = (imgData.data[x] + imgData.data[x + 1] + imgData.data[x + 2]) / 3;
  //         var av2 = (imgDataPrev[version].data[x] + imgDataPrev[version].data[x + 1] + imgDataPrev[version].data[x + 2]) / 3;
  //         var blended = alpha * (255 - av) + ((1-alpha) * av2);
  //         // R value
  //         imgData.data[x] = blended;
  //         // G value
  //         imgData.data[x + 1] = blended;
  //         // B value
  //         imgData.data[x + 2] = blended;
  //         // A value
  //         imgData.data[x + 3] = 255;

  //         // console.log('inside gray image');
  //       }
  //       x += 4; 
  //     }
  //     ctxFinal.putImageData(imgData, 0, 0);
  //   }
  // }


  // function pickColour(event, destination) {
  //   const bounding = canvas.getBoundingClientRect();
  //   const x = event.clientX - bounding.left;
  //   const y = event.clientY - bounding.top;
  //   const pixel = ctxFinal.getImageData(x, y, 1, 1);
  //   const data = pixel.data;
  //   const rgbColor = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
  //   destination.style.background = rgbColor;
  //   destination.textContent = rgbColor;

  //   if(rgbColor === 'rgb(128 128 128 / 1)' || 
  //      rgbColor === 'rgb(0 0 0 / 0)'){
  //     console.log('gray');
  //   } else {
  //     console.log('movement',x,y);
  //   }
  //   return rgbColor;
  // }

  






  
//   function init_() {
//     if (navigator.getUserMedia) { 
//       navigator.getUserMedia({video:true}, success, handleError);
//     } else { 
//       console.error('Your browser does not support getUserMedia');
//     }
//     window.setInterval(snapshot, 32);
//   }

//   return {
//     init: init_
//   };
// })();

// MotionDetector.init();









