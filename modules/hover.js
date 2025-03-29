import { getColours, saveColours, updateColour, loadColours } from "./localStorage.js";
import { clearCanvas, resetCanvas, colourBlock } from "./paint.js";
import { fawn_defaults, mandrill_defaults } from "./defaults.js";
import { getCurrentPage } from "./menu.js";
import { hexTorgb } from "./rotate.js";

export { mouseOverListeners, startAutoColours, stopAutoColours, handleColourReplacement };



const fawn_svg = document.getElementById('fawn_svg');
const mandrill_svg = document.getElementById('mandrill_svg');

const [...fawnBlocks] = document.querySelector('#fawn_svg #fawn_colour_blocks').children;
const [...mandrillBlocks] = document.querySelector('#mandrill_svg #mandrill_colour_blocks').children;

const [...rGradients] = document.getElementById('fawn_gradients').children;
const [...mGradients] = document.getElementById('mandrill_gradients').children;


const rangeButt = document.getElementById('auto_range');
const enableAutoButt = document.getElementById('enableAuto');




// put that into menu option for hover option
// mouseOverListeners(handleSolids);


function mouseOverListeners(method) {
  const buttState = document.querySelector('#buttons input:checked').value;
  const currentPage = getCurrentPage();
  const blocks = currentPage==='fawn' ? fawnBlocks : mandrillBlocks;
  blocks.forEach(block => {
    block.addEventListener('mouseover', () => {
      method(block);
    });
  });
}




function handleColourReplacement(block) {
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
          const newcolour = randomColor({
            format: 'rgb',
            luminosity: 'random', // bright, light, dark
            hue: 'random', // red, orange, yellow, green, blue, purple, pink, monochrome
          });
          currElem.setAttribute('stop-color',`${newcolour}`);
          gradCols.push(`${newcolour}`);
        }
        if(currentPage==='fawn') {
          fawnObject[valID]['stop-color'] = gradCols;
        } else {
          mandrillObject[valID]['stop-color'] = gradCols;
        }
        fillCol = `${block.attributes['fill'].value}`;
        if(currentPage==='fawn'){
          fawnObject[bloID]['fill'] = fillCol;
        } else {
          mandrillObject[bloID]['fill'] = fillCol;
        }
        block.setAttribute('fill',`url(#${valID})`);
      } else {
        const rcolour = randomColor({
          format: 'rgb',
          luminosity: 'random', // bright, light, dark
          hue: 'random', // red, orange, yellow, green, blue, purple, pink, monochrome
        });
        block.setAttribute('fill',`${rcolour}`);
      }
    }
    if(a.name === 'stroke') {
      strokeCol = `${block.attributes['stroke'].value}`;
      // updateColour(bloID, 'stroke', strokeCol);
    }
    if(a.name === 'stroke-width') {
      strokeWidth = `${block.attributes['stroke-width'].value}`;
      // updateColour(bloID, 'stroke-width', strokeWidth);
    }
    if(a.name === 'stroke-linecap') {
      strokeLineCap = `${block.attributes['stroke-linecap'].value}`;
      // updateColour(bloID, 'stroke-linecap', strokeLineCap);
    }
  });
}








let iID;
function startAutoColours(source) {
  const spd = rangeButt.value / 10;
  const spd1000 = rangeButt.value / 10 * 500;
  handleAutomatic(source,spd);
  clearInterval(iID);
  iID = setInterval(() => {handleAutomatic(source,spd,iID)}, spd1000);
  // console.log(iID,spd,spd1000);
}
function stopAutoColours(source) {
  clearInterval(iID);
  const sheet = document.styleSheets[0];
  const [...rules] = sheet.cssRules;
  const ruleIndex = rules.findIndex(rule => rule.selectorText === `svg#${source}_svg path`);
  if(ruleIndex > -1) {
    sheet.deleteRule(ruleIndex);
  }
}

function handleAutomatic(source,speed,iID) {
  // console.log(`handling automation with speed: ${speed}`);
  const currentPage = getCurrentPage();
  const sheet = document.styleSheets[0];
  const [...rules] = sheet.cssRules;
  // console.log(sheet);
  // console.log(rules);
  const ruleIndex = rules.findIndex(rule => rule.selectorText === `svg#${source}_svg path`);
  const svg_path = `
  svg#${source}_svg path {
    transition: fill ${speed}s ease;
  }
  `;
  if(ruleIndex > -1) {
    sheet.deleteRule(ruleIndex);
  }
  sheet.insertRule(svg_path, sheet.cssRules.length);
  const blocks = currentPage==='fawn' ? fawnBlocks : mandrillBlocks;
  blocks.forEach(block => {
    const rcolour = randomColor({
      format: 'rgb',
      luminosity: 'random', // bright, light, dark
      hue: 'random', // red, orange, yellow, green, blue, purple, pink, monochrome
    });
    // block.attributes.style.value = `fill: ${rcolour}`;
    // block.attributes.setAttribute('fill',`${rcolour}`);
    block.setAttribute('fill',`${rcolour}`);
    // updateColour(block.id, `fill: ${rcolour}`);
  });
}

enableAutoButt.addEventListener('change', () => {
  const currentPage = getCurrentPage();
  if(enableAutoButt.checked){
    startAutoColours(currentPage);
  } else {
    stopAutoColours(currentPage);
  }
});







// HAMMERTIME
const mc = new Hammer.Manager(fawn_svg);
mc.add(new Hammer.Pan({ 
  direction: Hammer.DIRECTION_ALL, 
  threshold: 0 
})); 
mc.add(new Hammer.Tap({ 
  event: 'singletap', 
  taps: 1
})); 
mc.on("pan", handleDrag);
mc.on("singletap", handleTap);

let lastPosX = 0;
let lastPosY = 0;
let isDragging = false;

function handleDrag(ev) {
  // console.log('drag',ev);
  let currElem;
  isDragging = true;
  if ( isDragging ) {
    lastPosX = ev.center['x'];
    lastPosY = ev.center['y'];
    currElem = document.elementFromPoint(lastPosX,lastPosY);
    handleColourReplacement(currElem);
  }
  if (ev.isFinal) {
    lastPosX = ev.center['x'];
    lastPosY = ev.center['y'];
    currElem = document.elementFromPoint(lastPosX,lastPosY);
    isDragging = false;
    handleColourReplacement(currElem);
  }
}

function handleTap(ev) {
  // console.log('tap',ev);
  let currElem;
  if (ev.isFinal) {
    lastPosX = ev.center['x'];
    lastPosY = ev.center['y'];
    currElem = document.elementFromPoint(lastPosX,lastPosY);
    handleColourReplacement(currElem);
  }
}




function incSpeed() {
  if(parseInt(rangeButt.value) <= 90) {
    rangeButt.value = parseInt(rangeButt.value) + 10;
  } else {
    rangeButt.value = 100;
  }
}

function decSpeed() {
  if(parseInt(rangeButt.value) >= 10) {
    rangeButt.value = parseInt(rangeButt.value) - 10;
  } else {
    rangeButt.value = 10;
  }
}