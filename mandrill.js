import { reh_defaults, mandrill_defaults } from "./defaults.js";

// let bodyCont = document.getElementsByTagName('body')[0];
const mandrill_svg = document.getElementById('mandrill');
const reh_svg = document.getElementById('marc');
const [...mandrillBlocks] = document.querySelector('#mandrill #colour_blocks').children;
const [...mandrillGradients] = document.querySelector('#mandrill #gradients').children;
const [...rehBlocks] = document.querySelector('#marc #colour_blocks').children;
const [...rehGradients] = document.querySelector('#marc #gradients').children;

// const urlParams = new URLSearchParams(window.location.search);
// console.log(`There are a total of ${mandrillBlocks.length} colour blocks in the Mandrill painting.`);
// console.log(`And there are ${mandrillGradients.length} unique gradients in the Mandrill painting.`);
// console.log(`There are a total of ${rehBlocks.length} colour blocks in the Reh painting.`);
// console.log(`And there are ${rehGradients.length} unique gradients in the Reh painting.`);



// print coords of click
// rotate element under click
mandrill_svg.addEventListener("click", async (ev) => {
  console.log(`(${ev.offsetX}, ${ev.offsetY})`);
});
reh_svg.addEventListener("click", async (ev) => {
  console.log(`(${ev.offsetX}, ${ev.offsetY})`);
});



// print block id on double click
mandrillBlocks.forEach(block => {
  block.addEventListener("dblclick", async (ev) => {
    console.log(block.id);
  });
});
rehBlocks.forEach(block => {
  block.addEventListener("dblclick", async (ev) => {
    console.log(block.id);
  });
});



// automatically rotate all blocks
mandrillBlocks.forEach(block => {
  rotateElement(block);
  printColour('mandrill',block);
});
rehBlocks.forEach(block => {
  rotateElement(block);
  printColour('reh',block);
});



// rotate an element around its center
async function rotateElement(elem) {
  // only works with the css version of transform origin and transform box
  // let speed = getColourSpeed(elem);
  // speed = (speed[elem.id].speed == 0) ? 1 : speed[elem.id].speed;
  // console.log('speed',speed);
  elem.setAttribute('style', `transform-origin: 50% 50%; transform-box: fill-box;`);
  const item = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
  item.setAttribute('xlink:href', `#${elem.id}`);
  item.setAttribute('id', `${elem.id}_anim`);
  item.setAttribute('attributeName', 'transform');
  item.setAttribute('type', 'rotate');

  item.setAttribute('dur', `40s`);
  item.setAttribute('repeatCount', '1');
  item.setAttribute('calcMode', 'spline');
  item.setAttribute('keyTimes', `0;1`);
  item.setAttribute('values', '0;360');
  item.setAttribute('keySplines', `0.5 0 0.5 1`);

  item.setAttribute('begin', `0;${elem.id}_anim.end+20`);
  item.setAttribute('fill', `freeze`);
  item.setAttribute('restart', `whenNotActive`);

  if(elem.hasChildNodes()) {
    console.log('already there');
  } else {
    elem.appendChild(item);
  }
}




document.addEventListener("keydown", event => {
  if (event.key === "p") { 
    if(!mandrill_svg.animationsPaused() && !reh_svg.animationsPaused()) {
      reh_svg.pauseAnimations();
      mandrill_svg.pauseAnimations();
      console.log('Animations paused');
    } else {
      reh_svg.unpauseAnimations();
      mandrill_svg.unpauseAnimations();
      console.log('Animations unpaused');
    }
  }
  if (event.key === "h") { 
    const mainElem = document.getElementsByTagName('main')[0];
    mainElem.classList.toggle('outline');
  }
});




function printColour(source,block) {
  let fillCol = '';
  let strokeCol = '';
  let gradCols = [];
  const atts = Object.values(block.attributes);
  atts.forEach(a => {
    if(a.name === 'fill') {
      if(block.attributes['fill'].value.startsWith('url')) {
        const valIDpre = block.attributes['fill'].value;
        const valID = valIDpre.slice(5, -1);
        const elem = document.getElementById(valID);
        const childrs = elem.children;
        const len = childrs.length;
        for(let i=0; i<len; i++) {
          gradCols.push(`stop-color: ${elem.children[i].attributes[1].value}`);
        }
        if(source === 'reh'){
          reh_defaults[valID] = gradCols;
        } else {
          mandrill_defaults[valID] = gradCols;
        }
        // colours[valID] = gradCols;
      }
      fillCol = `fill: ${block.attributes['fill'].value}`;
      if(source === 'reh'){
        reh_defaults[block.id] = fillCol;
      } else {
        mandrill_defaults[block.id] = fillCol;
      }
      // colours[block.id] = fillCol;
    }
    if(a.name === 'stroke') {
      strokeCol = `fill: ${block.attributes['stroke'].value}`;
      if(source === 'reh'){
        reh_defaults[block.id] = strokeCol;
      } else {
        mandrill_defaults[block.id] = strokeCol;
      }
      // colours[block.id] = strokeCol;
    }
  });
  // if(source === 'reh'){
  //   console.log(reh_defaults);
  // } else {
  //   console.log(mandrill_defaults);
  // }
}



function getColours(source) {
  console.log('getColours');
  const coloursString = localStorage.getItem(`${source}Colours`);
  let coloursJSON = {};
  if (coloursString === null) {
    coloursJSON = source === 'reh' ? reh_defaults : mandrill_defaults;
    saveColours(coloursJSON);
    console.log("first-time setup");
  } else {
    coloursJSON = JSON.parse(coloursString);
  }
  return coloursJSON;
}





saveColours(reh_defaults);
saveColours(mandrill_defaults);
function saveColours(coloursJSON) {
  console.log('saveColours to localStorage');
  const coloursString = JSON.stringify(coloursJSON);
  if(coloursJSON === reh_defaults) {
    localStorage.setItem("rehColours", coloursString);
  } else {
    localStorage.setItem("mandrillColours", coloursString);
  }
}


function updateColour(source, id, newColour) {
  if(source === 'reh') {
    let coloursJSON = getColours('reh');
    const oldColour = reh_defaults[id];
    coloursJSON[id] = newColour;
    console.log(`updating ${id} from ${oldColour} to ${newColour}`);
    saveColours(coloursJSON);
  } else {
    let coloursJSON = getColours('mandrill');
    const oldColour = mandrill_defaults[id];
    coloursJSON[id] = newColour;
    console.log(`updating ${id} from ${oldColour} to ${newColour}`);
    saveColours(coloursJSON);
  }
}


// loadColours();
function loadColours(source) {
  let coloursJSON = getColours(source);
  console.log(coloursJSON);
  if(source==='reh'){
    rehBlocks.forEach(block => {
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
  } else {
    mandrillBlocks.forEach(block => {
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
}



















function getColourSpeed(block) {
  const colours = {};
  // blocks2.forEach(block => {
    // rotateElement(block);
    // console.dir(block.attributes);
  let fillCol = '';
  let strokeCol = '';
  let gradCol = '';
  
  const atts = Object.values(block.attributes);

  atts.forEach(a => {
    if(a.name === 'fill') {
      if(block.attributes['fill'].value.startsWith('url')) {
        const valIDpre = block.attributes['fill'].value;
        const valID = valIDpre.slice(5, -1);
        const elem = document.getElementById(valID);
        gradCol = elem.children[0].attributes[1].value;
      }
      fillCol = block.attributes['fill'].value;
      // console.log('fillCol',fillCol);
    }
    if(a.name === 'stroke') {
      strokeCol = block.attributes['stroke'].value;
      // console.log('strokeCol',strokeCol);
    }
  });
  
  colours[block.id] = {
    'fillCol': fillCol,
    'strokeCol': strokeCol,
    'gradCol': gradCol,
    'speed': 0
  };
  // console.log(colours[block.id]);
  // }); // loop through all blocks2 and rotate them


  // digitalRoot(n)
  for (const bl in colours) {
    if(colours[bl].fillCol !== '' && colours[bl].fillCol.startsWith('rgb')) {
      // console.log(colours[bl].fillCol);
      colours[bl].speed = rgbToDigitalRoot(colours[bl].fillCol);
    }
    if(colours[bl].strokeCol !== '' && colours[bl].strokeCol.startsWith('rgb')) {
      // console.log(colours[bl].strokeCol);
      colours[bl].speed = rgbToDigitalRoot(colours[bl].strokeCol);
    }
    if(colours[bl].gradCol !== '' && colours[bl].gradCol.startsWith('rgb')) {
      // console.log(colours[bl].gradCol);
      colours[bl].speed = rgbToDigitalRoot(colours[bl].gradCol);
    }
    // rgbToDigitalRoot(rgb);
  }

  return colours;
}


function rgbToDigitalRoot(rgb) {
  // console.log(rgb);
  let vals = rgb.replace("rgb(", "");
  vals = vals.replace(")", "");
  vals = vals.split(",");
  vals = vals.map(e => e.trim());
  vals = vals.map(e => parseInt(e));
  const newVal = parseInt(`${digitalRoot(vals[0])}${digitalRoot(vals[1])}${digitalRoot(vals[2])}`);
  const finalDRoot = digitalRoot(newVal);
  // console.log(finalDRoot);
  return finalDRoot;
}





function digitalRoot(n) {
  if( n < 10 ) {
    return n;
  } else {
    return digitalRoot( n % 10 + Math.floor(digitalRoot( n / 10 )) );
  }
}





function percentage(partialValue, totalValue) {
  const val = ((partialValue/ 100) * totalValue).toFixed(3);
  if(val === 0) {
    return 1;
  } else return val;
  // return val;
} 

  // console.log(elem);
  // console.dir(elem);
  // const svgWidth = Math.ceil(elem.getBoundingClientRect().width);
  // const svgHeight = Math.ceil(elem.getBoundingClientRect().height);
  // const svgLeft = Math.ceil(elem.getBoundingClientRect().left);
  // const svgTop = Math.ceil(elem.getBoundingClientRect().top);
  // const svgRight = Math.ceil(elem.getBoundingClientRect().right);
  // const svgBottom = Math.ceil(elem.getBoundingClientRect().bottom);
  // console.log('svgWidth, svgHeight', svgWidth, svgHeight);
  // console.log('svgLeft, svgTop', svgLeft, svgTop);
  // console.log('svgRight, svgBottom', svgRight, svgBottom);
  // const svgXcenter = svgLeft + (svgWidth / 2);
  // const svgYcenter = svgTop + (svgHeight / 2);
  // console.log(`Center: ${svgXcenter}, ${svgYcenter}`)