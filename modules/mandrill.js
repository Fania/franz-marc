import { fawn_defaults, mandrill_defaults } from "./defaults.js";
import { getColours, saveColours, updateColour, loadColours } from "./localStorage.js";

// let bodyCont = document.getElementsByTagName('body')[0];
const mandrill_svg = document.getElementById('mandrill_svg');
const fawn_svg = document.getElementById('fawn_svg');
const [...mandrillBlocks] = document.querySelector('#mandrill_svg #mandrill_colour_blocks').children;
const [...mandrillGradients] = document.querySelector('#mandrill_svg #mandrill_gradients').children;
const [...fawnBlocks] = document.querySelector('#fawn_svg #fawn_colour_blocks').children;
const [...fawnGradients] = document.querySelector('#fawn_svg #fawn_gradients').children;

// const urlParams = new URLSearchParams(window.location.search);
// console.log(`There are a total of ${mandrillBlocks.length} colour blocks in the Mandrill painting.`);
// console.log(`And there are ${mandrillGradients.length} unique gradients in the Mandrill painting.`);
// console.log(`There are a total of ${fawnBlocks.length} colour blocks in the Fawn painting.`);
// console.log(`And there are ${fawnGradients.length} unique gradients in the Fawn painting.`);



// print coords of click
// rotate element under click
mandrill_svg.addEventListener("click", async (ev) => {
  console.log(`(${ev.offsetX}, ${ev.offsetY})`);
});
fawn_svg.addEventListener("click", async (ev) => {
  console.log(`(${ev.offsetX}, ${ev.offsetY})`);
});



// print block id on double click
mandrillBlocks.forEach(block => {
  block.addEventListener("dblclick", async (ev) => {
    console.log(block.id);
  });
});
fawnBlocks.forEach(block => {
  block.addEventListener("dblclick", async (ev) => {
    console.log(block.id);
  });
});



document.addEventListener("keydown", event => {
  if (event.key === "p") { 
    if(!mandrill_svg.animationsPaused() && !fawn_svg.animationsPaused()) {
      fawn_svg.pauseAnimations();
      mandrill_svg.pauseAnimations();
      console.log('Animations paused');
    } else {
      fawn_svg.unpauseAnimations();
      mandrill_svg.unpauseAnimations();
      console.log('Animations unpaused');
    }
  }
  if (event.key === "h") { 
    const mainElem = document.getElementsByTagName('main')[0];
    mainElem.classList.toggle('outline');
  }
});
