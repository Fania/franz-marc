import { rotateElement, printColour, getColourSpeed } from "./rotate.js";


const opts = document.querySelector('.options #buttons').children;
const subOpts = document.querySelector('.subOptions').children;
const [...buttons] = document.getElementsByName('buttons');


console.log(opts);
console.log(subOpts);




buttons.forEach(butt => {
  butt.addEventListener('click', (event) => {
    if(butt.id == 'original') {
      console.log('original');
      // stopAutoColours();
      // localStorage.clear();
      // saveColours(reh_defaults);
      // location.reload(); 
    }
    if(butt.id == 'rotate') {
      console.log('rotate');
      // stopAutoColours();
      // localStorage.clear();
      // saveColours(reh_defaults);
      // location.reload(); 
    }
    if(butt.id == 'paint') {
      console.log('paint');
      // stopAutoColours();
      // clearCanvas();
      // clickListeners(handlePaint);
      // updateColour('a_button_state', 'paint');
    }
    if(butt.id == 'solids') {
      console.log('solids');
      // stopAutoColours();
      // mouseOverListeners(handleSolids);
      // updateColour('a_button_state', 'solids');
    }
    if(butt.id == 'gradientsR') {
      console.log('gradientsR');
      // stopAutoColours();
      // mouseOverListeners(handleGradients);
      // updateColour('a_button_state', 'gradientsR');
    }
    if(butt.id == 'automatic') {
      console.log('automatic');
      // startAutoColours();
      // updateColour('a_button_state', 'automatic');
    }
  });
});