export { rotateAll, rotateElement, stopRotating, printColour, getColourSpeed };



const [...mandrillBlocks] = document.querySelector('#mandrill #colour_blocks').children;
const [...rehBlocks] = document.querySelector('#marc #colour_blocks').children;




async function rotateAll(source) {
  if(source === 'reh') {
    rehBlocks.forEach(block => {
      rotateElement(block);
    });
  } else {
    mandrillBlocks.forEach(block => {
      rotateElement(block);
    });
  }
}




// rotate a single element around its center
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




async function stopRotating() {


}






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