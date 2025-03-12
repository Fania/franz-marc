'use strict';

// let bodyCont = document.getElementsByTagName('body')[0];
const mandrill_svg = document.getElementById('mandrill');
const [...blocks] = document.getElementById('colour_blocks').children;
const [...gradients] = document.getElementById('gradients').children;

// const urlParams = new URLSearchParams(window.location.search);
console.log(`There are a total of ${blocks.length} colour blocks.`);
console.log(`And there are ${gradients.length} unique gradients.`);





// print coords of click
// rotate element under click
mandrill_svg.addEventListener("click", async (ev) => {
  // const elem = document.elementFromPoint(ev.offsetX, ev.offsetY);
  // console.dir(elem);
  console.log(`(${ev.offsetX}, ${ev.offsetY})`);
  await rotateElement(ev.target);
  rotateAllElements();
});



// print block id on double click
blocks.forEach(block => {
  block.addEventListener("dblclick", async (ev) => {
    console.log(block.id);
  });
});






// rotate all elements at once
// refresh happens in the svg itself
rotateAllElements();



function rotateAllElements() {
  console.log('inside rotateAllElements');
  blocks.forEach(block => {
      rotateElement(block);
  });
}



// rotate an element around its center
async function rotateElement(elem) {
  // only works with the css version of transform origin and transform box
  const speed = getColourSpeed(elem);
  elem.setAttribute('style', `transform-origin: 50% 50%; transform-box: fill-box;`);
  const item = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
  item.setAttribute('xlink:href', `#${elem.id}`);
  item.setAttribute('id', `${elem.id}_anim`);
  item.setAttribute('attributeName', 'transform');
  item.setAttribute('type', 'rotate');
  // item.setAttribute('dur', `40s`);
  const relTime = percentage(speed[elem.id].speed, 40) * 10;
  const remTime = 120 - relTime;
  console.log('relTime, remTime', relTime, remTime);
  item.setAttribute('dur', `${relTime * 10}`);
  item.setAttribute('repeatCount', '4');
  // item.setAttribute('repeatCount', 'indefinite');
  // item.setAttribute('additive', 'sum');
  // item.setAttribute('calcMode', 'linear');
  item.setAttribute('calcMode', 'spline');
  item.setAttribute('keyTimes', `0;1`);
  item.setAttribute('values', '0;360');
  item.setAttribute('keySplines', `0.5 0 0.5 1`);
  // item.setAttribute('begin', `0`);
  item.setAttribute('begin', `0;${elem.id}_anim.begin+${remTime}`);
  item.setAttribute('fill', `freeze`);
  item.setAttribute('restart', `whenNotActive`);

  if(elem.hasChildNodes()) {
    console.log('already there');
  } else {
    elem.appendChild(item);
  }
}


  // item.setAttribute('keyTimes', `0; 0.${speed[elem.id].speed}; 1`);
  // item.setAttribute('values', '0; 0; 360');
  // item.setAttribute('keyTimes', `0; ${perc0}; ${perc1}; ${perc2}; ${perc2}; 1`);
  // item.setAttribute('keySplines', `0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1`);
  // item.setAttribute('values', `0; ${percA}; ${percC}; 360`);
  // item.setAttribute('keyTimes', `0; ${perc2}; ${perc2}; 1`);
  // item.setAttribute('keySplines', `0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1`);
  // item.setAttribute('values', `0; ${percA * 10}; ${percB * 10}; ${percC * 10}; 360; 360`);
  // item.setAttribute('keyTimes', `0; ${perc3}; 1`);
  // item.setAttribute('values', `0; ${percD * 10}; 360`);
  // item.setAttribute('values', '0; 90; 180; 270; 360; 360');
  // const perc0 = percentage(speed[elem.id].speed, 0.25);
  // const perc1 = percentage(speed[elem.id].speed, 0.50);
  // const perc2 = percentage(speed[elem.id].speed, 0.75);
  // const perc3 = percentage(speed[elem.id].speed, 1);
  // const percA = percentage(speed[elem.id].speed, 90);
  // const percB = percentage(speed[elem.id].speed, 180);
  // const percC = percentage(speed[elem.id].speed, 270);
  // const percD = percentage(speed[elem.id].speed, 360);



function getColourSpeed(block) {
  const colours = {};
  // blocks.forEach(block => {
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
  // }); // loop through all blocks and rotate them


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