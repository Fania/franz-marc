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
  localStorage.clear();
  if(action==='clear') {
    console.log('clearing canvas');
    saveColours(currentPage, whites);
  }
  if(action==='reset') {
    console.log('resetting canvas');
    saveColours(currentPage, defaults);
  }
  loadColours();
}




function colourBlock(block, colour) {
  const currentPage = getCurrentPage();
  const gradients = currentPage==='fawn' ? rGradients : mGradients;
  let fawnObject = {};
  let mandrillObject = {};
  const bloID = block.id;
  let fillCol = '';
  let strokeCol = '';
  let strokeWidth = '';
  let strokeLineCap = '';
  let gradCols = [];
  let entry = {
    'fill': '',
    'stroke': '',
    'stroke-width': '',
    'stroke-linecap': '',
    'stop-color': []
  };
  fawnObject[bloID] = entry;
  mandrillObject[bloID] = entry;
  const atts = Object.values(block.attributes);
  atts.forEach(a => {
    if(a.name === 'fill') {
      if(block.attributes['fill'].value.startsWith('url')) {
        const valIDpre = block.attributes['fill'].value;
        const valID = valIDpre.slice(5, -1);
        const grad = gradients.find((gr) => gr.id == valID);
        const [...toddlers] = grad.children;
        fawnObject[valID] = entry;
        mandrillObject[valID] = entry;
        for(let n=0; n<toddlers.length; n++) {
          const currElem = toddlers[n];
          currElem.setAttribute('stop-color',`${hexTorgb(colour)}`);
          gradCols.push(`${hexTorgb(colour)}`);
        }
        if(currentPage==='fawn') {
          fawnObject[valID]['stop-color'] = gradCols;
          updateColour(valID,'stop-color',gradCols);
        } else {
          mandrillObject[valID]['stop-color'] = gradCols;
          updateColour(valID,'stop-color',gradCols);
        }
        fillCol = `${block.attributes['fill'].value}`;
        if(currentPage==='fawn'){
          fawnObject[bloID]['fill'] = fillCol;
        } else {
          mandrillObject[bloID]['fill'] = fillCol;
        }
        block.setAttribute('fill',`url(#${valID})`);
        updateColour(bloID,'fill',`url(#${valID})`);
      } else {
        block.setAttribute('fill',`${hexTorgb(colour)}`);
        updateColour(bloID,'fill',`${hexTorgb(colour)}`);
      }
    }
    if(a.name === 'stroke') {
      strokeCol = `${block.attributes['stroke'].value}`;
      updateColour(bloID,'stroke',strokeCol);
    }
    if(a.name === 'stroke-width') {
      strokeWidth = `${block.attributes['stroke-width'].value}`;
      updateColour(bloID,'stroke-width',strokeWidth);
    }
    if(a.name === 'stroke-linecap') {
      strokeLineCap = `${block.attributes['stroke-linecap'].value}`;
      updateColour(bloID,'stroke-linecap',strokeLineCap);
    }
  });
}



