export { getColours, saveColours, updateColour, loadColours, updateMenu, loadMenu };

import { fawn_defaults, mandrill_defaults } from "./defaults.js";
import { getCurrentPage, getCurrentMenu } from "./menu.js";
import { colourBlock } from "./paint.js";


const [...fawnBlocks] = document.querySelector('#fawn_svg #fawn_colour_blocks').children;
const [...mandrillBlocks] = document.querySelector('#mandrill_svg #mandrill_colour_blocks').children;

const [...subOpts] = document.querySelectorAll('[name^="sub_"]');
// console.log(subOpts);
const subOptsNav = document.querySelector('.subOptions');





function getColours() {
  // console.log('getColours');
  const currentPage = getStoredMenu().tabs;
  const coloursString = localStorage.getItem(`${currentPage}Colours`);
  let coloursJSON = {};
  if (coloursString === null) {
    coloursJSON = currentPage==='fawn' ? fawn_defaults : mandrill_defaults;
    saveColours(currentPage, coloursJSON);
    updateMenu();
    console.log("first-time setup");
  } else {
    coloursJSON = JSON.parse(coloursString);
  }
  return coloursJSON;
}



function getStoredMenu() {
  const menuString = localStorage.getItem('franzMarcMenu');
  const menuJSON = JSON.parse(menuString);
  return menuJSON;
}



// update localStorage after change on Page
function updateMenu(currentOpt=getCurrentMenu()) {
  // console.log('updateMenu');
  const currentPage = getCurrentPage();
  // console.log('currentPage',currentPage);
  // const currentOpt = getCurrentMenu();
  // console.log('currentOpt',currentOpt);
  let subOptsStatus = 'hide';
  if(currentOpt==='rotate' || currentOpt==='paint' || currentOpt==='hover') {
    subOptsStatus = 'show'
  } else {
    subOptsStatus = 'hide'
  }
  let menuJSON = {
    "tabs": currentPage,
    "options": currentOpt,
    "subOptions": subOptsStatus
  };
  const menuString = JSON.stringify(menuJSON);
  // localStorage.removeItem("franzMarcMenu");
  localStorage.setItem("franzMarcMenu", menuString);
}




// update Menu options on Page from localStorage
function loadMenu() {
  const storedMenu = getStoredMenu();
  document.getElementById(`${storedMenu.tabs}`).checked = true;
  document.getElementById(`${storedMenu.options}`).checked = true;
  if(storedMenu.subOptions==='show') {
    subOptsNav.classList.add('show');
    subOptsNav.classList.remove('hide');
  } else {
    subOptsNav.classList.remove('show');
    subOptsNav.classList.add('hide');
  }
}







// saveColours('fawn', fawn_defaults);
// saveColours('mandrill', mandrill_defaults);
// save coloursJSON to localStorage
function saveColours(source, coloursJSON, mode) {
  // console.log('saveColours to localStorage');
  const coloursString = JSON.stringify(coloursJSON);
  if(source === 'fawn') {
    // localStorage.removeItem("fawnColours");
    localStorage.setItem("fawnColours", coloursString);
  } else {
    // localStorage.removeItem("mandrillColours");
    localStorage.setItem("mandrillColours", coloursString);
  }
  updateMenu();
}



// update colour of individual block for source
function updateColour(id, property, newColour) {
  // console.log('updateColour');
  const currentPage = getCurrentPage();
  // console.log('property',property);
  if(currentPage==='fawn') {
    let coloursJSON = getColours();
    // const oldColour = fawn_defaults[id][property];
    coloursJSON[id][property] = newColour;
    // console.log(`updating ${id} from ${oldColour} to ${newColour}`);
    saveColours('fawn', coloursJSON);
  } else {
    let coloursJSON = getColours();
    // const oldColour = mandrill_defaults[id][property];
    coloursJSON[id][property] = newColour;
    // console.log(`updating ${id} from ${oldColour} to ${newColour}`);
    saveColours('mandrill', coloursJSON);
  }
}




// load colours from localStorage for source
function loadColours(mode='none') {
  // console.log('loading colours', mode);
  if(mode==='fromScratch') {
    console.log('from inside fromScratch');
    saveColours('fawn', fawn_defaults);
    saveColours('mandrill', mandrill_defaults);
    updateMenu();
  }
  if(mode==='fromData') {
    console.log('from inside fromData');
    const currentMenu = getStoredMenu();
    const currentPage = currentMenu.tabs;
    const currentOpt = currentMenu.options;
    let coloursJSON = getColours();
    const blocks = currentPage==='fawn' ? fawnBlocks : mandrillBlocks;
    loadMenu();
    blocks.forEach((block,i) => {
      const bloID = block.id;
      let entry = {};
      entry = coloursJSON[bloID];
      colourBlock(block, entry, mode);
    }); // end blocks
  }
}







// print defaults to JSON 
// printColour();
function printColour() {
  const currentPage = getCurrentPage();
  const blocks = currentPage==='fawn' ? fawnBlocks : mandrillBlocks;
  let fawnObject = {};
  let mandrillObject = {};
  blocks.forEach(block => {
    console.log(block.id);
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
          // fawnObject[valID] = entry;
          // mandrillObject[valID] = entry;
          const elem = document.getElementById(valID);
          const childrs = elem.children;
          const len = childrs.length;
          for(let i=0; i<len; i++) {
            gradCols.push(`${elem.children[i].attributes[1].value}`);
          }
          if(currentPage==='fawn') {
            // fawnObject[valID]['stop-color'] = gradCols;
            fawnObject[bloID]['stop-color'] = gradCols;
          } else {
            // mandrillObject[valID]['stop-color'] = gradCols;
            mandrillObject[bloID]['stop-color'] = gradCols;
          }
        }
        fillCol = `${block.attributes['fill'].value}`;
        if(currentPage==='fawn'){
          fawnObject[bloID]['fill'] = fillCol;
          // fawnObject[valID]['fill'] = `url(#${valID})`;
        } else {
          mandrillObject[bloID]['fill'] = fillCol;
          // mandrillObject[valID]['fill'] = `url(#${valID})`;
        }
      }
      if(a.name === 'stroke') {
        strokeCol = `${block.attributes['stroke'].value}`;
        if(currentPage==='fawn'){
          fawnObject[bloID]['stroke'] = strokeCol;
        } else {
          mandrillObject[bloID]['stroke'] = strokeCol;
        }
      }
      if(a.name === 'stroke-width') {
        strokeWidth = `${block.attributes['stroke-width'].value}`;
        if(currentPage==='fawn'){
          fawnObject[bloID]['stroke-width'] = strokeWidth;
        } else {
          mandrillObject[bloID]['stroke-width'] = strokeWidth;
        }
      }
      if(a.name === 'stroke-linecap') {
        strokeLineCap = `${block.attributes['stroke-linecap'].value}`;
        if(currentPage==='fawn'){
          fawnObject[bloID]['stroke-linecap'] = strokeLineCap;
        } else {
          mandrillObject[bloID]['stroke-linecap'] = strokeLineCap;
        }
      }
    });
  });
  if(currentPage === 'fawn'){
    console.log(fawnObject);
  } else {
    console.log(mandrillObject);
  }
}


