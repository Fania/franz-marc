import { getColours, saveColours, updateColour, loadColours } from "./localStorage.js";
import { clearCanvas, resetCanvas, colourBlock } from "./paint.js";
import { fawn_defaults, mandrill_defaults } from "./defaults.js";
import { getCurrentPage } from "./menu.js";

export { mouseOverListeners, startAutoColours, stopAutoColours, handleAutomatic, handleSolids, handleGradients };



const fawn_svg = document.getElementById('fawn_svg');
const mandrill_svg = document.getElementById('mandrill_svg');

const [...fawnBlocks] = document.querySelector('#fawn_svg #fawn_colour_blocks').children;
const [...mandrillBlocks] = document.querySelector('#mandrill_svg #mandrill_colour_blocks').children;

const [...rGradients] = document.getElementById('fawn_gradients').children;
const [...mGradients] = document.getElementById('mandrill_gradients').children;


const rangeButt = document.getElementById('auto_range');




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




let iID;
function startAutoColours() {
  const spd = rangeButt.value / 10;
  const spd1000 = rangeButt.value / 10 * 500;
  handleAutomatic(spd);
  clearInterval(iID);
  iID = setInterval(() => {handleAutomatic(spd,iID)}, spd1000);
  // console.log(iID,spd,spd1000);
}
function stopAutoColours() {
  clearInterval(iID);
  const sheet = document.styleSheets[0];
  const [...rules] = sheet.cssRules;
  const marcRuleIndex = rules.findIndex(rule => rule.selectorText === "svg#marc path");
  if(marcRuleIndex > -1) {
    sheet.deleteRule(marcRuleIndex);
  }
}

function handleAutomatic(speed,iID) {
  // console.log(`handling automation with speed: ${speed}`);
  const sheet = document.styleSheets[0];
  const [...rules] = sheet.cssRules;
  const marcRuleIndex = rules.findIndex(rule => rule.selectorText === "svg#marc path");
  // console.log(marcRuleIndex);
  if(marcRuleIndex > -1) {
    sheet.deleteRule(marcRuleIndex);
  }
  const marc_path = `
  svg#marc path {
    transition: fill ${speed}s ease;
  }
  `;
  sheet.insertRule(marc_path, sheet.cssRules.length);
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

rangeButt.addEventListener('change', () => {
  startAutoColours();
});




function handleSolids(block) {
  // console.log(`RGB '${block.id}': '${block.attributes.style.value}'`);
  const rcolour = randomColor({
    format: 'rgb',
    luminosity: 'random', // bright, light, dark
    hue: 'random', // red, orange, yellow, green, blue, purple, pink, monochrome
  });
  // block.attributes.style.value = `fill: ${rcolour}`;
  // block.attributes.setAttribute('fill',`${rcolour}`);
  block.setAttribute('fill',`${rcolour}`);
  updateColour(block.id, `fill: ${rcolour}`);
}




function handleGradients(block) {
  const relID = fawn_relations[block.id] ? fawn_relations[block.id] : 'RGB';
  // console.log(`GRADIENT '${block.id}': '${relID}'`);
  if(relID !== 'RGB') {
    // hovering over a gradient, so children (i.e. stop-colours) exist
    const grad = gradients.find((gr) => gr.id == relID);
    const [...toddlers] = grad.children;
    let coloursList = [];
    // reset gradient colours
    const originalGradientColours = fawn_defaults[relID];
    updateColour(fawn_relations[block.id], originalGradientColours);
    toddlers.forEach(ch => {
      const newcolour = randomColor({
        format: 'rgb',
        luminosity: 'random', // bright, light, dark
        hue: 'random', // red, orange, yellow, green, blue, purple, pink, monochrome
      });
      // ch.attributes.style.value = `stop-color: ${newcolour}`;
      // ch.attributes.setAttribute('stop-color',`${newcolour}`);
      ch.setAttribute('stop-color',`${newcolour}`);
      coloursList.push(`stop-color: ${newcolour}`);
    })
    // block.attributes.style.value = `fill: url(#${relID})`;
    // block.attributes.setAttribute('fill',`url(#${relID})`);
    block.setAttribute('fill',`url(#${relID})`);
    updateColour(relID, coloursList);
  } else {
  // hovering over a solid RGB colour, so no children exist
    const rcolour = randomColor({
      format: 'rgb',
      luminosity: 'random', // bright, light, dark
      hue: 'random', // red, orange, yellow, green, blue, purple, pink, monochrome
    });
    // block.attributes.style.value = `fill: ${rcolour}`;
    // block.attributes.setAttribute('fill',`${rcolour}`);
    block.setAttribute('fill',`${rcolour}`);
    updateColour(block.id, `fill: ${rcolour}`);
  }
}





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
  const buttState = document.querySelector('#buttons input:checked').value;
  let currElem;
  isDragging = true;
  if ( isDragging ) {
    lastPosX = ev.center['x'];
    lastPosY = ev.center['y'];
    currElem = document.elementFromPoint(lastPosX,lastPosY);
    if(buttState == 'solids') {
      handleSolids(currElem);
    }
    if(buttState == 'gradients') {
      handleGradients(currElem);
    }
  }
  if (ev.isFinal) {
    lastPosX = ev.center['x'];
    lastPosY = ev.center['y'];
    currElem = document.elementFromPoint(lastPosX,lastPosY);
    isDragging = false;
    if(buttState == 'solids') {
      handleSolids(currElem);
    }
    if(buttState == 'gradients') {
      handleGradients(currElem);
    }
  }
}

function handleTap(ev) {
  // console.log('tap',ev);
  const buttState = document.querySelector('#buttons input:checked').value;
  let currElem;
  if (ev.isFinal) {
    lastPosX = ev.center['x'];
    lastPosY = ev.center['y'];
    currElem = document.elementFromPoint(lastPosX,lastPosY);
    if(buttState == 'solids') {
      handleSolids(currElem);
    }
    if(buttState == 'gradients') {
      handleGradients(currElem);
    }
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