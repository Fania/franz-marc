export { blankCanvas, colourBlock };

import { getCurrentPage } from "./menu.js";
import { getColours, saveColours, updateColour, loadColours } from "./localStorage.js";
import { fawn_defaults, mandrill_defaults } from "./defaults.js";
import { fawn_whites, mandrill_whites } from "./whites.js";
import { hexTorgb } from "./rotate.js";


const [...fawnBlocks] = document.querySelector('#fawn_svg #fawn_colour_blocks').children;
const [...mandrillBlocks] = document.querySelector('#mandrill_svg #mandrill_colour_blocks').children;

const [...rGradients] = document.getElementById('fawn_gradients').children;
const [...mGradients] = document.getElementById('mandrill_gradients').children;




function blankCanvas(action) {
  const currentPage = getCurrentPage();
  const whites = currentPage==='fawn' ? fawn_whites : mandrill_whites;
  const defaults = currentPage==='fawn' ? fawn_defaults : mandrill_defaults;
  // localStorage.clear();
  if(action==='clear') {
    console.log('clearing canvas');
    saveColours(currentPage, whites);
    loadColours('clear');
  }
  if(action==='reset') {
    console.log('resetting canvas');
    saveColours(currentPage, defaults);
    loadColours('reset');
  }
}




function colourBlock(block, colour, mode) {
  const currentPage = getCurrentPage();
  const gradients = currentPage==='fawn' ? rGradients : mGradients;
  const bloID = block.id;
  let gradCols = [];
  console.log('mode',mode);
  // console.log(colour);
  for (const [k, v] of Object.entries(colour)) {
    if(k==='fill') {
      // console.log('COLOURBLOCK: FILL');
      if(v.startsWith('url')) {
        // console.log('COLOURBLOCK: STOP-COLOR');
        const valIDpre = block.attributes['fill'].value;
        const valID = valIDpre.slice(5, -1);
        const grad = gradients.find((gr) => gr.id == valID);
        const [...toddlers] = grad.children;
        console.log(valID);
        console.log(grad);
        console.log(toddlers);
        // const toddlers = colour['stop-color'];
        for(let n=0; n<toddlers.length; n++) {
          const currElem = toddlers[n];
          // console.log(currElem);
          currElem.setAttribute('stop-color',`${colour['stop-color'][n]}`);
          gradCols.push(`${colour['stop-color'][n]}`);
        }
        updateColour(bloID,'stop-color',gradCols);
        block.setAttribute('fill',`url(#${valID})`);
        updateColour(bloID,'fill',`url(#${valID})`);
      } else {
        block.setAttribute('fill',`${colour['fill']}`);
        updateColour(bloID,'fill',`${colour['fill']}`);
      }
    }
    if(k==='stroke') {
      // console.log('COLOURBLOCK: STROKE');
      updateColour(bloID,'stroke',`${colour['stroke']}`);
      block.setAttribute('stroke',`${colour['stroke']}`);
    }
    if(k==='stroke-width') {
      // console.log('COLOURBLOCK: STROKE-WIDTH');
      updateColour(bloID,'stroke-width',`${colour['stroke-width']}`);
      block.setAttribute('stroke-width',`${colour['stroke-width']}`);
    }
    if(k==='stroke-linecap') {
      // console.log('COLOURBLOCK: STROKE-LINECAP');
      updateColour(bloID,'stroke-linecap',`${colour['stroke-linecap']}`);
      block.setAttribute('stroke-linecap',`${colour['stroke-linecap']}`);
    }
  };
}
