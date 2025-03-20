import { rotateElement, printColour, getColourSpeed } from "./rotate.js";


const opts = document.querySelector('.options #buttons').children;
const subOpts = document.querySelector('.subOptions').children;
const subOptsNav = document.querySelector('.subOptions');
const [...buttons] = document.getElementsByName('buttons');







buttons.forEach(butt => {
  butt.addEventListener('change', (event) => {

    const current = document.querySelector('[name="buttons"]:checked').value;
    const currentElem = document.querySelector('[name="buttons"]:checked');
    console.log(current);

    if(butt.id == 'original') {
      console.log('original');
      subOptsNav.classList.remove('show');
      // stopAutoColours();
      // localStorage.clear();
      // saveColours(reh_defaults);
      // location.reload(); 
    }
    if(butt.id == 'rotate') {
      console.log('rotate');
      subOptsNav.classList.remove('show');
      // stopAutoColours();
      // localStorage.clear();
      // saveColours(reh_defaults);
      // location.reload(); 
    }
    if(butt.id == 'paint') {
      console.log('paint');

      if(current === 'paint') {
        subOptsNav.classList.add('show');
        subOpts[0].classList.add('show');
        subOpts[1].classList.remove('show');
      }
      // stopAutoColours();
      // clearCanvas();
      // clickListeners(handlePaint);
      // updateColour('a_button_state', 'paint');
    }
    if(butt.id == 'solids') {
      console.log('solids');
      subOptsNav.classList.remove('show');
      // stopAutoColours();
      // mouseOverListeners(handleSolids);
      // updateColour('a_button_state', 'solids');
    }
    if(butt.id == 'gradientsR') {
      console.log('gradientsR');
      subOptsNav.classList.remove('show');
      // stopAutoColours();
      // mouseOverListeners(handleGradients);
      // updateColour('a_button_state', 'gradientsR');
    }
    if(butt.id == 'automatic') {
      console.log('automatic');
      subOptsNav.classList.add('show');
      subOpts[0].classList.remove('show');
      subOpts[1].classList.add('show');
      // startAutoColours();
      // updateColour('a_button_state', 'automatic');
    }
  });
});