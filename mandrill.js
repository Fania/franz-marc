'use strict';

// let bodyCont = document.getElementsByTagName('body')[0];
const mandrill_svg = document.getElementById('mandrill');
const [...blocks] = document.getElementById('colour_blocks').children;
const [...gradients] = document.getElementById('gradients').children;

// const urlParams = new URLSearchParams(window.location.search);
console.log(`There are a total of ${blocks.length} colour blocks.`);
console.log(`And there are ${gradients.length} unique gradients.`);






mandrill_svg.addEventListener("click", async (ev) => {
  // const elem = document.elementFromPoint(ev.offsetX, ev.offsetY);
  // console.dir(elem);
  console.log(`(${ev.offsetX}, ${ev.offsetY})`);
  // moveElement(ev,elem);
  await moveElement(ev.target);
});


blocks.forEach(block => {
  block.addEventListener("dblclick", async (ev) => {
    console.log(block.id);
    // await moveElement(block);
    // console.log(ev);
    // const elem = document.elementFromPoint(ev.offsetX, ev.offsetY);
    // console.log(elem.id);
  });
});




async function moveElement(elem) {
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

  elem.setAttribute('style', `transform-origin: 50% 50%; transform-box: fill-box;`);
  const item = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
  item.setAttribute('attributeName', 'transform');
  item.setAttribute('type', 'rotate');
  item.setAttribute('from', `0`);
  item.setAttribute('to', `360`);
  item.setAttribute('dur', '10s');
  item.setAttribute('repeatCount', '4');
  item.setAttribute('additive', 'sum');
  elem.appendChild(item);
}




blocks.forEach(block => {
  // console.log(block.id);
  moveElement(block);
});