'use strict';

// let bodyCont = document.getElementsByTagName('body')[0];
const mandrill_svg = document.getElementById('mandrill');
const [...blocks] = document.getElementById('colour_blocks').children;
const [...gradients] = document.getElementById('gradients').children;

// const urlParams = new URLSearchParams(window.location.search);
console.log(`There are a total of ${blocks.length} colour blocks.`);
console.log(`And there are ${gradients.length} unique gradients.`);






mandrill_svg.addEventListener("click", (ev) => {
  // console.log(ev);
  const elem = document.elementFromPoint(ev.offsetX, ev.offsetY);
  // console.log(elem);
  console.log(`(${ev.offsetX}, ${ev.offsetY})`);
  const item = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
  item.setAttribute('attributeName', 'transform');
  item.setAttribute('attributeType', 'attributeType');
  item.setAttribute('type', 'rotate');
  item.setAttribute('from', `0 ${ev.offsetX} ${ev.offsetY}`);
  item.setAttribute('to', `360 ${ev.offsetX} ${ev.offsetY}`);
  item.setAttribute('dur', '10s');
  item.setAttribute('repeatCount', '4');
  elem.appendChild(item);
});


blocks.forEach(block => {
  block.addEventListener("dblclick", (ev) => {
    console.log(block.id);
    // console.log(ev);
    // const elem = document.elementFromPoint(ev.offsetX, ev.offsetY);
    // console.log(elem.id);
  });
});