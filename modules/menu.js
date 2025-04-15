import { rotateAll, rotateElement, stopRotating, printColour, getColourSpeed } from "./rotate.js";
import { getColours, saveColours, updateColour, loadColours } from "./localStorage.js";
import { blankCanvas, colourBlock } from "./paint.js";
import { addMouseOverListeners, removeMouseOverListeners, addFingerListeners, removeFingerListeners, startAutoColours, stopAutoColours, handleColourReplacement } from "./hover.js";
import { startMotion, stopMotion } from "./motion.js";

export { getCurrentPage };

const [...navItems] = document.querySelectorAll('.tabs a');
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



updateTabs();
function updateTabs() {

  const currentPage = getCurrentPage();
  // put new page into hash in url?

  let coloursJSON = getColours(currentPage);
  // console.log(coloursJSON);
  console.log(coloursJSON['menu'].tabs);
  console.log(coloursJSON['menu'].options);
  console.log(coloursJSON['menu'].subOptions);
  console.log(currentPage);
  console.log(location.hash);

}








function getCurrentPage() {
  return location.hash.slice(1);
}


// stop rotating on first load for default original page
window.onload = () => {
  stopRotating();
  loadColours();
};



buttons.forEach(butt => {
  butt.addEventListener('change', () => {

    console.log(butt.value);
    // const current = document.querySelector('[name="buttons"]:checked').value;
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
      // resetCanvas();
      blankCanvas('reset');
      updateColour('menu','options','original');
      updateColour('menu','subOptions','hide');
    }
    if(butt.id == 'rotate') {
      // console.log('rotate');
      // resetCanvas();
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
      updateColour('menu','options','rotate');
      updateColour('menu','subOptions','show');
    }
    if(butt.id == 'paint') {
      // console.log('paint');
      stopRotating();
      stopAutoColours();
      stopMotion();
      removeMouseOverListeners();
      removeFingerListeners();
      // clearCanvas();
      blankCanvas('clear');
      const colPicker = document.getElementById('col_picker');
      const currentPage = getCurrentPage();
      const blocks = currentPage==='fawn' ? fawnBlocks : mandrillBlocks;
      blocks.forEach(block => {
        block.addEventListener('click', () => {
          colourBlock(block, colPicker.value);
        });
      });
      subOptsNav.classList.add('show');
      subOpts[0].classList.remove('show');
      subOpts[1].classList.add('show');
      subOpts[2].classList.remove('show');
      updateColour('menu','options','paint');
      updateColour('menu','subOptions','show');
    }
    if(butt.id == 'hover') {
      // console.log('solids');
      stopRotating();
      stopMotion();
      // resetCanvas();
      blankCanvas('reset');
      addMouseOverListeners(handleColourReplacement);
      addFingerListeners(handleColourReplacement);
      subOptsNav.classList.add('show');
      subOpts[0].classList.remove('show');
      subOpts[1].classList.remove('show');
      subOpts[2].classList.add('show');
      updateColour('menu','options','hover');
      updateColour('menu','subOptions','show');
    }
    if(butt.id == 'camera') {
      // console.log('automatic');
      // resetCanvas();
      blankCanvas('reset');
      stopRotating();
      stopAutoColours();
      removeMouseOverListeners();
      removeFingerListeners();
      startMotion();
      subOptsNav.classList.remove('show');
      updateColour('menu','options','camera');
      updateColour('menu','subOptions','hide');
    }
  });
});

