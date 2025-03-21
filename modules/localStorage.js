export { getColours, saveColours, updateColour, loadColours };
import { fawn_defaults, mandrill_defaults } from "./defaults.js";
import { getCurrentPage } from "./menu.js";




function getColours(source) {
  // console.log('getColours');
  const coloursString = localStorage.getItem(`${source}Colours`);
  let coloursJSON = {};
  if (coloursString === null) {
    coloursJSON = source==='fawn' ? fawn_defaults : mandrill_defaults;
    saveColours(coloursJSON);
    console.log("first-time setup");
  } else {
    coloursJSON = JSON.parse(coloursString);
  }
  return coloursJSON;
}





saveColours(fawn_defaults);
saveColours(mandrill_defaults);
// save coloursJSON to localStorage
function saveColours(coloursJSON) {
  // console.trace('saveColours to localStorage');
  const coloursString = JSON.stringify(coloursJSON);
  if(coloursJSON === fawn_defaults) {
    localStorage.setItem("fawnColours", coloursString);
  } else {
    localStorage.setItem("mandrillColours", coloursString);
  }
}



// update colour of individual block for source
function updateColour(id, newColour) {
  const currentPage = getCurrentPage();
  if(currentPage === 'fawn') {
    let coloursJSON = getColours('fawn');
    const oldColour = fawn_defaults[id];
    coloursJSON[id] = newColour;
    // console.log(`updating ${id} from ${oldColour} to ${newColour}`);
    saveColours(coloursJSON);
  } else {
    let coloursJSON = getColours('mandrill');
    const oldColour = mandrill_defaults[id];
    coloursJSON[id] = newColour;
    // console.log(`updating ${id} from ${oldColour} to ${newColour}`);
    saveColours(coloursJSON);
  }
}


// loadColours();
// load colours from localStorage for source
function loadColours(source) {
  let coloursJSON = getColours(source);
  // console.log(coloursJSON);
  const blocks = source==='fawn' ? fawnBlocks : mandrillBlocks;
  blocks.forEach(block => {
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
      }
      block.setAttribute('fill',`url(#${valID})`);
    } else {
      const rcolour = coloursJSON[bloID];
      block.setAttribute('fill',`${rcolour}`);
    }
  });
}



