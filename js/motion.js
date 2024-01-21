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


var MotionDetector = (function() {
  var alpha = 0.5;
  var version = 0;
  var greyScale = false;

  var canvas = document.getElementById('canvas');
  var canvasFinal = document.getElementById('canvasFinal');
  var video = document.getElementById('camStream');

  document.addEventListener("DOMContentLoaded", ()=>{
    var vidStyleData = video.getBoundingClientRect();
    console.log(vidStyleData);
    canvas.style.width = vidStyleData.width + "px";
    canvas.style.height = vidStyleData.height + "px";
    canvas.style.left = vidStyleData.left + "px";
    canvas.style.top = vidStyleData.top + "px";
    canvasFinal.style.width = vidStyleData.width + "px";
    canvasFinal.style.height = vidStyleData.height + "px";
    canvasFinal.style.left = vidStyleData.left + "px";
    canvasFinal.style.top = vidStyleData.top + "px";
  });

  var ctx = canvas.getContext('2d');
  var ctxFinal = canvasFinal.getContext('2d');
  var localStream = null;
  var imgData = null;
  var imgDataPrev = [];

 
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
      // Use alternative live referneces to prevent messed up data.
      imgDataPrev[version] = ctx.getImageData(0, 0, canvas.width, canvas.height);
      version = (version == 0) ? 1 : 0;

      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      var length = imgData.data.length;
      var x = 0;
      while (x < length) {
        if (!greyScale) {
          // see https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data
          // Alpha blending formula: out = (alpha * new) + (1 - alpha) * old.
          // R value
          imgData.data[x] = alpha * (255 - imgData.data[x]) + ((1-alpha) * imgDataPrev[version].data[x]);
          // G value
          imgData.data[x + 1] = alpha * (255 - imgData.data[x+1]) + ((1-alpha) * imgDataPrev[version].data[x + 1]);
          // B value
          imgData.data[x + 2] = alpha * (255 - imgData.data[x+2]) + ((1-alpha) * imgDataPrev[version].data[x + 2]);
          // A value
          imgData.data[x + 3] = 255;
        } else {
          // GreyScale.
          var av = (imgData.data[x] + imgData.data[x + 1] + imgData.data[x + 2]) / 3;
          var av2 = (imgDataPrev[version].data[x] + imgDataPrev[version].data[x + 1] + imgDataPrev[version].data[x + 2]) / 3;
          var blended = alpha * (255 - av) + ((1-alpha) * av2);
          // R value
          imgData.data[x] = blended;
          // G value
          imgData.data[x + 1] = blended;
          // B value
          imgData.data[x + 2] = blended;
          // A value
          imgData.data[x + 3] = 255;

          // console.log('inside gray image');
        }
        x += 4; 
      }
      ctxFinal.putImageData(imgData, 0, 0);
    }
  }


  function pickColour(event, destination) {
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
    const pixel = ctxFinal.getImageData(x, y, 1, 1);
    const data = pixel.data;
    const rgbColor = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
    destination.style.background = rgbColor;
    destination.textContent = rgbColor;

    if(rgbColor === 'rgb(128 128 128 / 1)' || 
       rgbColor === 'rgb(0 0 0 / 0)'){
      console.log('gray');
    } else {
      console.log('movement',x,y);
    }
    return rgbColor;
  }

  const hoveredColor = document.getElementById("hovered-color");
  const selectedColor = document.getElementById("selected-color");
  const svgElem = document.getElementById("marc");

  canvasFinal.addEventListener("mousemove", (event) => pickColour(event, hoveredColor));




  
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





