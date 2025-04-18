export { getCurrentPage, getCurrentMenu };

import { rotateAll, stopRotating } from "./rotate.js";
import { loadColours, updateMenu } from "./localStorage.js";
import { blankCanvas, colourBlock, addClickListeners, removeClickListeners } from "./paint.js";
import { addMouseOverListeners, removeMouseOverListeners, addFingerListeners, removeFingerListeners, stopAutoColours, handleColourReplacement } from "./hover.js";
import { startMotion, stopMotion } from "./motion.js";
import { hexTorgb } from "./rotate.js";


const tabs = document.querySelector('.tabs');
const [...tabsInputs] = document.querySelectorAll('[name="tabs_radio"]');
const options = document.querySelector('.options');
const subOpts = document.querySelector('.subOptions').children;
const subOptsNav = document.querySelector('.subOptions');
const [...buttons] = document.getElementsByName('buttons');
const [...mandrillBlocks] = document.querySelector('#mandrill_svg #mandrill_colour_blocks').children;
const [...fawnBlocks] = document.querySelector('#fawn_svg #fawn_colour_blocks').children;




function getCurrentPage() {
  // return location.hash.slice(1);
  return document.querySelector('[name="tabs_radio"]:checked').value;
}

function getCurrentMenu() {
  return document.querySelector('[name="buttons"]:checked').value;
}


// stop rotating on first load for default original page
window.onload = () => {
  stopRotating();
  loadColours('none');
};


tabsInputs.forEach(tab => {
  tab.addEventListener('change', () => {
    updateMenu();
  });
});



buttons.forEach(butt => {
  butt.addEventListener('change', () => {
    console.log(butt.value);
    const currentElem = document.querySelector('[name="buttons"]:checked');
    // console.log(current);
    const currentPage = getCurrentPage();
    console.log(currentPage);

    if(butt.id == 'original') {
      // console.log('original');
      subOptsNav.classList.remove('show');
      stopRotating();
      stopAutoColours();
      stopMotion();
      removeMouseOverListeners();
      removeFingerListeners();
      removeClickListeners();
      blankCanvas('reset');
      updateMenu();
    }
    if(butt.id == 'rotate') {
      // console.log('rotate');
      blankCanvas('reset');
      stopAutoColours();
      stopMotion();
      removeMouseOverListeners();
      removeFingerListeners();
      removeClickListeners();
      rotateAll(currentPage);
      subOptsNav.classList.add('show');
      subOpts[0].classList.add('show');
      subOpts[1].classList.remove('show');
      subOpts[2].classList.remove('show');
      updateMenu();
    }
    if(butt.id == 'paint') {
      // console.log('paint');
      stopRotating();
      stopAutoColours();
      stopMotion();
      removeMouseOverListeners();
      removeFingerListeners();
      blankCanvas('clear');
      addClickListeners(colourBlock);
      subOptsNav.classList.add('show');
      subOpts[0].classList.remove('show');
      subOpts[1].classList.add('show');
      subOpts[2].classList.remove('show');
      updateMenu();
    }
    if(butt.id == 'hover') {
      // console.log('solids');
      stopRotating();
      stopMotion();
      blankCanvas('reset');
      addMouseOverListeners(handleColourReplacement);
      addFingerListeners(handleColourReplacement);
      removeClickListeners();
      subOptsNav.classList.add('show');
      subOpts[0].classList.remove('show');
      subOpts[1].classList.remove('show');
      subOpts[2].classList.add('show');
      updateMenu();
    }
    if(butt.id == 'camera') {
      // console.log('automatic');
      blankCanvas('reset');
      stopRotating();
      stopAutoColours();
      removeMouseOverListeners();
      removeFingerListeners();
      removeClickListeners();
      startMotion();
      subOptsNav.classList.remove('show');
      updateMenu();
    }
  });
});







// FULLSCREEN OPTIONS
// for live display screens

// | Shortcut  | Description          |
// |-----------|----------------------|
// | F         | Hide Interface       |
// | ^⌘F       | Fullscreen (Mac)     |
// | F11       | Fullscreen (Win)     |

document.addEventListener("keydown", event => {
  if (event.key === "i") {
    toggleInterface();
  }
});


function toggleInterface() {
  tabs.classList.toggle('hide');
  options.classList.toggle('hide');
  subOptsNav.classList.toggle('hide');
}