export { clearCanvas, replaceColour, resetCanvas };

import { getCurrentPage } from "./menu.js";
import { getColours, saveColours, updateColour, loadColours } from "./localStorage.js";
import { fawn_defaults, mandrill_defaults } from "./defaults.js";


const [...fawnBlocks] = document.querySelector('#fawn_svg #fawn_colour_blocks').children;
const [...mandrillBlocks] = document.querySelector('#mandrill_svg #mandrill_colour_blocks').children;

const [...rGradients] = document.getElementById('fawn_gradients').children;
const [...mGradients] = document.getElementById('mandrill_gradients').children;
// console.log(rGradients);
// console.log(mGradients);




function clearCanvas() {
  console.log('clearing canvas');
  const currentPage = getCurrentPage();
  if(currentPage==='fawn') {
    fawnBlocks.forEach(block => {
      replaceColour(block, 'clear');
    });
  } else {
    mandrillBlocks.forEach(block => {
      replaceColour(block, 'clear');
    });
  }
}




function resetCanvas() {
  console.log('resetting canvas');
  const currentPage = getCurrentPage();
  if(currentPage==='fawn') {
    fawnBlocks.forEach(block => {
      replaceColour(block, 'reset');
    });
  } else {
    mandrillBlocks.forEach(block => {
      replaceColour(block, 'reset');
    });
  }
}






function replaceColour(block, type) {
  const currentPage = getCurrentPage();
  const gradients = currentPage==='fawn' ? rGradients : mGradients;
  console.log(gradients);
  console.log(block);
  console.log(currentPage);
  if(type === 'clear') {
    const bloID = block.id;
    console.log(block.attributes['fill'].value);
    if(block.attributes['fill'].value.startsWith('url')) {
      const valIDpre = block.attributes['fill'].value;
      const valID = valIDpre.slice(5, -1);
      console.log(valID);
      const grad = gradients.find((gr) => gr.id == valID);
      console.log(grad);
      const [...toddlers] = grad.children;
      let coloursList = [];
      for(let n=0; n<toddlers.length; n++) {
        const currElem = toddlers[n];
        currElem.setAttribute('stop-color','rgb(255,255,255)');
        coloursList.push(`stop-color: rgb(255,255,255)`);
      }
      block.setAttribute('fill',`url(#${valID})`);
      block.setAttribute('stroke','rgb(0,0,0)');
      block.setAttribute('stroke-width',`2`);
      updateColour(valID, coloursList);
    } else {
      block.setAttribute('fill','rgb(255,255,255)');
      block.setAttribute('stroke','rgb(0,0,0)');
      block.setAttribute('stroke-width',`2`);
      updateColour(bloID, 'fill:rgb(255,255,255);stroke:rgb(0,0,0);stroke-width:2;');
    }
  } else {
    let coloursJSON = currentPage == 'fawn' ? fawn_defaults : mandrill_defaults;
    const bloID = block.id;
    if(block.attributes['fill'].value.startsWith('url')) {
      const valIDpre = block.attributes['fill'].value;
      const valID = valIDpre.slice(5, -1);
      const elem = document.getElementById(valID);
      const childrs = elem.children;
      const len = childrs.length;
      for(let i=0; i<len; i++) {
        const currElem = childrs[i];
        currElem.setAttribute('stop-color',`${coloursJSON[valID]}`);
        // updateColour(valID, coloursList);
      }
      block.setAttribute('fill',`url(#${valID})`);
    } else {
      const rcolour = coloursJSON[bloID];
      block.setAttribute('fill',`${rcolour}`);
    }
  }
}