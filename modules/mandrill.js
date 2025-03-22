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



// automatically rotate all blocks
mandrillBlocks.forEach(block => {
  rotateElement(block);
  printColour('mandrill',block);
});
fawnBlocks.forEach(block => {
  rotateElement(block);
  printColour('fawn',block);
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
        if(source === 'fawn'){
          fawn_defaults[valID] = gradCols;
        } else {
          mandrill_defaults[valID] = gradCols;
        }
        // colours[valID] = gradCols;
      }
      fillCol = `fill: ${block.attributes['fill'].value}`;
      if(source === 'fawn'){
        fawn_defaults[block.id] = fillCol;
      } else {
        mandrill_defaults[block.id] = fillCol;
      }
      // colours[block.id] = fillCol;
    }
    if(a.name === 'stroke') {
      strokeCol = `fill: ${block.attributes['stroke'].value}`;
      if(source === 'fawn'){
        fawn_defaults[block.id] = strokeCol;
      } else {
        mandrill_defaults[block.id] = strokeCol;
      }
      // colours[block.id] = strokeCol;
    }
  });
  // if(source === 'fawn'){
  //   console.log(fawn_defaults);
  // } else {
  //   console.log(mandrill_defaults);
  // }
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