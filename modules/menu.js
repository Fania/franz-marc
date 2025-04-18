import { rotateAll, rotateElement, stopRotating, printColour, getColourSpeed } from "./rotate.js";
import { getColours, saveColours, updateColour, loadColours, updateMenu, loadMenu } from "./localStorage.js";
import { blankCanvas, colourBlock } from "./paint.js";
import { addMouseOverListeners, removeMouseOverListeners, addFingerListeners, removeFingerListeners, startAutoColours, stopAutoColours, handleColourReplacement } from "./hover.js";
import { startMotion, stopMotion } from "./motion.js";
import { hexTorgb } from "./rotate.js";

export { getCurrentPage, getCurrentMenu };

const tabs = document.querySelector('.tabs');
const [...tabsInputs] = document.querySelectorAll('[name="tabs_radio"]');
const [...navItems] = document.querySelectorAll('.tabs a');
const options = document.querySelector('.options');
const opts = document.querySelector('.options #buttons').children;
const subOpts = document.querySelector('.subOptions').children;
const subOptsNav = document.querySelector('.subOptions');
const [...buttons] = document.getElementsByName('buttons');
const [...mandrillBlocks] = document.querySelector('#mandrill_svg #mandrill_colour_blocks').children;
const [...fawnBlocks] = document.querySelector('#fawn_svg #fawn_colour_blocks').children;

const subOpt_rotationPause = document.getElementById('rotationPause');
const subOpt_col_picker = document.getElementById('col_picker');
const subOpt_enableAuto = document.getElementById('enableAuto');
const subOpt_auto_range = document.getElementById('auto_range');




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
      const colPicker = document.getElementById('col_picker');
      const currentPage = getCurrentPage();
      const blocks = currentPage==='fawn' ? fawnBlocks : mandrillBlocks;
      blocks.forEach(block => {
        block.addEventListener('click', () => {
          const entry = {
            'fill': hexTorgb(colPicker.value),
            'stroke': 'rgb(0, 0, 0)',
            'stroke-width': '2',
            'stroke-linecap': 'round',
            'stop-color': []
          };
          colourBlock(block, entry);
        });
      });
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
  if (event.key === "f") {
    toggleInterface();
  }
});


function toggleInterface() {
  tabs.classList.toggle('hide');
  options.classList.toggle('hide');
  subOptsNav.classList.toggle('hide');
}