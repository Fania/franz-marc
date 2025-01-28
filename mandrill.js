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
  // const elem = document.elementFromPoint(ev.offsetX, ev.offsetY);
  // console.log(elem);
  console.log(`(${ev.offsetX}, ${ev.offsetY})`);
});


blocks.forEach(block => {
  block.addEventListener("dblclick", (ev) => {
    console.log(block.id);
    // console.log(ev);
    // const elem = document.elementFromPoint(ev.offsetX, ev.offsetY);
    // console.log(elem.id);
  });
});