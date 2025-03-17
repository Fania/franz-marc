'use strict';

const mandrill = document.getElementById('mandrill');
const marc = document.getElementById('marc');


// console.dir(mandrill);
// console.log(mandrill.clientWidth, mandrill.clientHeight);


const mand_coords_g = document.createElementNS("http://www.w3.org/2000/svg", "g");
mand_coords_g.setAttribute("class", "coordinates");
const mand_vertical_g = document.createElementNS("http://www.w3.org/2000/svg", "g");
mand_vertical_g.setAttribute("class", "vertical");
const mand_horizontal_g = document.createElementNS("http://www.w3.org/2000/svg", "g");
mand_horizontal_g.setAttribute("class", "horizontal");

mand_coords_g.appendChild(mand_vertical_g);
mand_coords_g.appendChild(mand_horizontal_g);
mandrill.appendChild(mand_coords_g);


const marc_coords_g = document.createElementNS("http://www.w3.org/2000/svg", "g");
marc_coords_g.setAttribute("class", "coordinates");
const marc_vertical_g = document.createElementNS("http://www.w3.org/2000/svg", "g");
marc_vertical_g.setAttribute("class", "vertical");
const marc_horizontal_g = document.createElementNS("http://www.w3.org/2000/svg", "g");
marc_horizontal_g.setAttribute("class", "horizontal");

marc_coords_g.appendChild(marc_vertical_g);
marc_coords_g.appendChild(marc_horizontal_g);
marc.appendChild(marc_coords_g);


// create vertical lines
for(let i=0; i < mandrill.clientWidth; i+=50) {
  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", i);
  line.setAttribute("y1", 0);
  line.setAttribute("x2", i);
  line.setAttribute("y2", mandrill.clientWidth);
  line.setAttribute("stroke", "#eeeeee");
  mand_vertical_g.appendChild(line);
}
for(let i=0; i < marc.clientWidth; i+=50) {
  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", i);
  line.setAttribute("y1", 0);
  line.setAttribute("x2", i);
  line.setAttribute("y2", marc.clientWidth);
  line.setAttribute("stroke", "#eeeeee");
  marc_vertical_g.appendChild(line);
}

// create horizontal lines
for(let i=0; i < mandrill.clientHeight; i+=50) {
  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", 0);
  line.setAttribute("y1", i);
  line.setAttribute("x2", mandrill.clientWidth);
  line.setAttribute("y2", i);
  line.setAttribute("stroke", "#eeeeee");
  mand_horizontal_g.appendChild(line);
}
for(let i=0; i < marc.clientHeight; i+=50) {
  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", 0);
  line.setAttribute("y1", i);
  line.setAttribute("x2", marc.clientWidth);
  line.setAttribute("y2", i);
  line.setAttribute("stroke", "#eeeeee");
  marc_horizontal_g.appendChild(line);
}

// create vertical text
for(let i=0; i < mandrill.clientWidth; i+=100) {
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", i+5);
  text2.setAttribute("x", i+5);
  text3.setAttribute("x", i+5);
  text.setAttribute("y", 15);
  text2.setAttribute("y", mandrill.clientHeight-15);
  text3.setAttribute("y", mandrill.clientHeight/2);
  text.setAttribute("stroke", "#eeeeee");
  text2.setAttribute("stroke", "#eeeeee");
  text3.setAttribute("stroke", "#eeeeee");
  text.textContent = i;
  text2.textContent = i;
  text3.textContent = i;
  mand_vertical_g.appendChild(text);
  mand_vertical_g.appendChild(text2);
  mand_vertical_g.appendChild(text3);
}
for(let i=0; i < marc.clientWidth; i+=100) {
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", i+5);
  text2.setAttribute("x", i+5);
  text3.setAttribute("x", i+5);
  text.setAttribute("y", 15);
  text2.setAttribute("y", marc.clientHeight-15);
  text3.setAttribute("y", marc.clientHeight/2);
  text.setAttribute("stroke", "#eeeeee");
  text2.setAttribute("stroke", "#eeeeee");
  text3.setAttribute("stroke", "#eeeeee");
  text.textContent = i;
  text2.textContent = i;
  text3.textContent = i;
  marc_vertical_g.appendChild(text);
  marc_vertical_g.appendChild(text2);
  marc_vertical_g.appendChild(text3);
}

// create horizontal text
for(let i=0; i < mandrill.clientWidth; i+=100) {
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", 5);
  text2.setAttribute("x", mandrill.clientWidth/2+15);
  text3.setAttribute("x", mandrill.clientWidth-35);
  text.setAttribute("y", i);
  text2.setAttribute("y", i);
  text3.setAttribute("y", i);
  text.setAttribute("stroke", "#eeeeee");
  text2.setAttribute("stroke", "#eeeeee");
  text3.setAttribute("stroke", "#eeeeee");
  text.textContent = i;
  text2.textContent = i;
  text3.textContent = i;
  mand_horizontal_g.appendChild(text);
  mand_horizontal_g.appendChild(text2);
  mand_horizontal_g.appendChild(text3);
}
for(let i=0; i < marc.clientWidth; i+=100) {
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", 5);
  text2.setAttribute("x", marc.clientWidth/2+15);
  text3.setAttribute("x", marc.clientWidth-35);
  text.setAttribute("y", i);
  text2.setAttribute("y", i);
  text3.setAttribute("y", i);
  text.setAttribute("stroke", "#eeeeee");
  text2.setAttribute("stroke", "#eeeeee");
  text3.setAttribute("stroke", "#eeeeee");
  text.textContent = i;
  text2.textContent = i;
  text3.textContent = i;
  marc_horizontal_g.appendChild(text);
  marc_horizontal_g.appendChild(text2);
  marc_horizontal_g.appendChild(text3);
}


const coordinates = document.querySelectorAll('.coordinates');
console.log(coordinates);
document.addEventListener("keydown", event => {
  if (event.key === "c") {
    console.log('coordinates disabled');
    coordinates.forEach(c => {
      c.classList.toggle('hide');
    });
  }
});