import { rotateAll, rotateElement, stopRotating, printColour, getColourSpeed } from "./rotate.js";


const [...navItems] = document.querySelectorAll('.tabs a');
const opts = document.querySelector('.options #buttons').children;
const subOpts = document.querySelector('.subOptions').children;
const subOptsNav = document.querySelector('.subOptions');
const [...buttons] = document.getElementsByName('buttons');



// make sure main nav items have 'current' class on it
// navItems.forEach(ni => {
//   ni.addEventListener('click', () => {
//     navItems.map(n => n.classList.remove('current'));
//     ni.classList.add('current');
//   });
// });




function getCurrentPage() {
  return location.hash.slice(1);
}






buttons.forEach(butt => {
  butt.addEventListener('change', () => {

    const current = document.querySelector('[name="buttons"]:checked').value;
    const currentElem = document.querySelector('[name="buttons"]:checked');
    console.log(current);

    const currentPage = getCurrentPage();
    // console.log(currentPage);

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
      rotateAll(currentPage);

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