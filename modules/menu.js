import { rotateAll, rotateElement, stopRotating, printColour, getColourSpeed } from "./rotate.js";
import { getColours, saveColours, updateColour, loadColours } from "./localStorage.js";
import { clearCanvas } from "./paint.js";


export { getCurrentPage };

const [...navItems] = document.querySelectorAll('.tabs a');
const opts = document.querySelector('.options #buttons').children;
const subOpts = document.querySelector('.subOptions').children;
const subOptsNav = document.querySelector('.subOptions');
const [...buttons] = document.getElementsByName('buttons');





function getCurrentPage() {
  return location.hash.slice(1);
}






buttons.forEach(butt => {
  butt.addEventListener('change', () => {

    console.log(butt.value);
    // const current = document.querySelector('[name="buttons"]:checked').value;
    const currentElem = document.querySelector('[name="buttons"]:checked');
    // console.log(current);

    const currentPage = getCurrentPage();
    // console.log(currentPage);

    if(butt.id == 'original') {
      // console.log('original');
      subOptsNav.classList.remove('show');
      stopRotating();
      // stopAutoColours();
      // localStorage.clear();
      // saveColours(reh_defaults);
      // location.reload(); 
    }
    if(butt.id == 'rotate') {
      // console.log('rotate');
      if(butt.value === 'rotate') {
        subOptsNav.classList.add('show');
        subOpts[0].classList.add('show');
        subOpts[1].classList.remove('show');
        subOpts[2].classList.remove('show');
      }
      rotateAll(currentPage);

      // stopAutoColours();
      // localStorage.clear();
      // saveColours(reh_defaults);
      // location.reload(); 
    }
    if(butt.id == 'paint') {
      // console.log('paint');
      stopRotating();
      clearCanvas();
      subOptsNav.classList.add('show');
      subOpts[0].classList.remove('show');
      subOpts[1].classList.add('show');
      subOpts[2].classList.remove('show');

      // stopAutoColours();
      // clearCanvas();
      // clickListeners(handlePaint);
      // updateColour('a_button_state', 'paint');
    }
    if(butt.id == 'hover') {
      // console.log('solids');
      stopRotating();
      if(butt.value === 'hover') {
        subOptsNav.classList.add('show');
        subOpts[0].classList.remove('show');
        subOpts[1].classList.remove('show');
        subOpts[2].classList.add('show');
      }
      // stopAutoColours();
      // mouseOverListeners(handleSolids);
      // updateColour('a_button_state', 'solids');
    }
    if(butt.id == 'camera') {
      // console.log('automatic');
      stopRotating();
      subOptsNav.classList.remove('show');
      // startAutoColours();
      // updateColour('a_button_state', 'automatic');
    }
  });
});