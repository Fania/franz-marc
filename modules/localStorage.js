export { getColours, saveColours, updateColour, loadColours };
import { fawn_defaults, mandrill_defaults } from "./defaults.js";
import { getCurrentPage } from "./menu.js";



const [...fawnBlocks] = document.querySelector('#fawn_svg #fawn_colour_blocks').children;
const [...mandrillBlocks] = document.querySelector('#mandrill_svg #mandrill_colour_blocks').children;






function getColours(source) {
  // console.log('getColours');
  const coloursString = localStorage.getItem(`${source}Colours`);
  let coloursJSON = {};
  if (coloursString === null) {
    coloursJSON = source==='fawn' ? fawn_defaults : mandrill_defaults;
    saveColours(source, coloursJSON);
    console.log("first-time setup");
  } else {
    coloursJSON = JSON.parse(coloursString);
  }
  return coloursJSON;
}





saveColours('fawn', fawn_defaults);
saveColours('mandrill', mandrill_defaults);
// save coloursJSON to localStorage
function saveColours(source, coloursJSON) {
  // console.trace('saveColours to localStorage');
  const coloursString = JSON.stringify(coloursJSON);
  if(source === 'fawn') {
    localStorage.setItem("fawnColours", coloursString);
  } else {
    localStorage.setItem("mandrillColours", coloursString);
  }
}



// update colour of individual block for source
function updateColour(id, property, newColour) {
  const currentPage = getCurrentPage();
  console.log('property',property);
  if(currentPage==='fawn') {
    let coloursJSON = getColours('fawn');
    const oldColour = fawn_defaults[id][property];
    coloursJSON[id][property] = newColour;
    console.log(`updating ${id} from ${oldColour} to ${newColour}`);
    saveColours('fawn', coloursJSON);
  } else {
    let coloursJSON = getColours('mandrill');
    const oldColour = mandrill_defaults[id][property];
    coloursJSON[id][property] = newColour;
    console.log(`updating ${id} from ${oldColour} to ${newColour}`);
    saveColours('mandrill', coloursJSON);
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
    // console.dir(block);
    // console.log(block.nodeName);
    if(block.attributes['fill'].value.startsWith('url')) {
      const valIDpre = block.attributes['fill'].value;
      const valID = valIDpre.slice(5, -1);
      const elem = document.getElementById(valID);
      const childrs = elem.children;
      const len = childrs.length;
      // console.log('coloursJSON[valID]',coloursJSON[valID],len);
      for(let i=0; i<len; i++) {
        const currElem = childrs[i];
        currElem.setAttribute('stop-color',`${coloursJSON[valID]['stop-color'][i]}`);
      }
      block.setAttribute('fill',`url(#${valID})`);
    } else {
      const rcolour = coloursJSON[bloID]['fill'];
      block.setAttribute('fill',`${rcolour}`);
    }
    if(block.nodeName === 'path') {
      block.setAttribute('stroke',`none`);
    }
  });
}






function loadColoursNEW(source) {
  let coloursJSON = getColours(source);
  // console.log(coloursJSON);
  const blocks = source==='fawn' ? fawnBlocks : mandrillBlocks;
  blocks.forEach(block => {
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
            currElem.setAttribute('stop-color','rgb(255,255,255)');
            gradCols.push(`rgb(255,255,255)`);
          }
          if(currentPage==='fawn') {
            fawnObject[valID]['stop-color'] = gradCols;
          } else {
            mandrillObject[valID]['stop-color'] = gradCols;
          }
          fillCol = `${block.attributes['fill'].value}`;
          if(currentPage==='fawn'){
            fawnObject[bloID]['fill'] = fillCol;
            // updateColour(bloID, 'fill', fillCol);
          } else {
            mandrillObject[bloID]['fill'] = fillCol;
            // updateColour(bloID, 'fill', fillCol);
          }
          block.setAttribute('fill',`url(#${valID})`);
          block.setAttribute('stroke','rgb(0,0,0)');
          block.setAttribute('stroke-width',`2`);
          updateColour(valID, 'fill', `url(#${valID})`);
          updateColour(valID, 'stroke', 'rgb(0,0,0)');
          updateColour(valID, 'stroke-width', '2');
          updateColour(valID, 'stop-color', gradCols);
        } else {
          block.setAttribute('fill','rgb(255,255,255)');
          block.setAttribute('stroke','rgb(0,0,0)');
          block.setAttribute('stroke-width',`2`);
          updateColour(bloID, 'fill', 'rgb(255,255,255)');
          updateColour(bloID, 'stroke', 'rgb(0,0,0)');
          updateColour(bloID, 'stroke-width', '2');
          updateColour(bloID, 'stop-color', gradCols);
        }
      }
      if(a.name === 'stroke') {
        strokeCol = `${block.attributes['stroke'].value}`;
        updateColour(bloID, 'stroke', strokeCol);
      }
      if(a.name === 'stroke-width') {
        strokeWidth = `${block.attributes['stroke-width'].value}`;
        updateColour(bloID, 'stroke-width', strokeWidth);
      }
      if(a.name === 'stroke-linecap') {
        strokeLineCap = `${block.attributes['stroke-linecap'].value}`;
        updateColour(bloID, 'stroke-linecap', strokeLineCap);
      }
    }); // end atts
  }); // end blocks
}







// print defaults to JSON 
// printColour();
function printColour() {
  const currentPage = getCurrentPage();
  const blocks = currentPage==='fawn' ? fawnBlocks : mandrillBlocks;
  let fawnObject = {};
  let mandrillObject = {};
  blocks.forEach(block => {
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
          fawnObject[valID] = entry;
          mandrillObject[valID] = entry;
          const elem = document.getElementById(valID);
          const childrs = elem.children;
          const len = childrs.length;
          for(let i=0; i<len; i++) {
            gradCols.push(`${elem.children[i].attributes[1].value}`);
          }
          if(currentPage==='fawn') {
            fawnObject[valID]['stop-color'] = gradCols;
          } else {
            mandrillObject[valID]['stop-color'] = gradCols;
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
  // if(currentPage === 'fawn'){
  //   // console.log(fawnObject);
  // } else {
  //   // console.log(mandrillObject);
  // }
}


