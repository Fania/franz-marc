/*********************************************************************
*  #### JS Motion Visualiser ####
*  Coded by Jason Mayes. www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it anywhere. 
*  Thanks. :-)
*  Got feedback or questions, ask here:
*  Github: https://github.com/jasonmayes/JS-Motion-Detection/
*  Updates will be posted to this site.
*********************************************************************/

// Cross browser support to fetch the correct getUserMedia object.
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
  || navigator.mozGetUserMedia || navigator.msGetUserMedia;

// Cross browser support for window.URL.
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;


let MotionDetector = (function() {
  let alpha = 0.5;
  let version = 0;
  let greyScale = false;

  let canvas = document.getElementById('canvas');
  let canvasFinal = document.getElementById('canvasFinal');
  let video = document.getElementById('camStream');
  let ctx = canvas.getContext('2d');
  let ctxFinal = canvasFinal.getContext('2d');
  let localStream = null;
  let imgData = null;
  let imgDataPrev = [];

 
  function success(stream) {
    localStream = stream;
    // Create a new object URL to use as the video's source.
    video.srcObject = stream
    video.play();
  }

  
  function handleError(error) {
    console.error(error);
  }


  function snapshot() {
    if (localStream) {
      canvas.width = video.offsetWidth;
      canvas.height = video.offsetHeight;
      canvasFinal.width = video.offsetWidth;
      canvasFinal.height = video.offsetHeight;

      ctx.drawImage(video, 0, 0);

      // Must capture image data in new instance as it is a live reference.
      // Use alternative live references to prevent messed up data.
      imgDataPrev[version] = ctx.getImageData(0, 0, canvas.width, canvas.height);
      version = (version == 0) ? 1 : 0;

      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      let length = imgData.data.length;
      let x = 0;
      while (x < length) {
        if (!greyScale) {
          // Alpha blending formula: out = (alpha * new) + (1 - alpha) * old.
          imgData.data[x] = alpha * (255 - imgData.data[x]) + ((1-alpha) * imgDataPrev[version].data[x]);
          imgData.data[x + 1] = alpha * (255 - imgData.data[x+1]) + ((1-alpha) * imgDataPrev[version].data[x + 1]);
          imgData.data[x + 2] = alpha * (255 - imgData.data[x+2]) + ((1-alpha) * imgDataPrev[version].data[x + 2]);
          imgData.data[x + 3] = 255;
        } else {
          // GreyScale.
          let av = (imgData.data[x] + imgData.data[x + 1] + imgData.data[x + 2]) / 3;
          let av2 = (imgDataPrev[version].data[x] + imgDataPrev[version].data[x + 1] + imgDataPrev[version].data[x + 2]) / 3;
          let blended = alpha * (255 - av) + ((1-alpha) * av2);
          imgData.data[x] = blended;
          imgData.data[x + 1] = blended;
          imgData.data[x + 2] = blended;
          imgData.data[x + 3] = 255;
          // imgData.data[x + 3] = 0;
        }
        x += 4;
      }
      ctxFinal.putImageData(imgData, 0, 0);
    }
  }

  
  function init_() {
    if (navigator.getUserMedia) { 
      navigator.getUserMedia({video:true}, success, handleError);
    } else { 
      console.error('Your browser does not support getUserMedia');
    }
    window.setInterval(snapshot, 32);
  }

  return {
    init: init_
  };
})();

MotionDetector.init();
