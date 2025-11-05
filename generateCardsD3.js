const d3 = require('d3');
const fs = require('fs');
const { JSDOM } = require('jsdom');

// Sample data for playing cards
const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function createCard(suit, rank) {

  let suitColour = 'red';
  const isRed = suit === "hearts" || suit === "diamonds";
  isRed ? suitColour = 'red' : suitColour = 'black'

  // Create a new JSDOM instance
  const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
//  const document = dom.window.document;
  let body = d3.select(dom.window.document.querySelector("body"))

  // Create an SVG element
//  const svg = d3.select(document.body)
    let svg = body
    .append('svg')
    .attr('width', 150)
    .attr('height', 225)
    .attr('viewBox', '0 0 150 225')
    .attr('xmlns', 'http://www.w3.org/2000/svg');

  // Background
  svg.append('rect')
    .attr('width', 150)
    .attr('height', 225)
    .attr('fill', 'white')
    .attr('stroke', 'black')
    .attr('stroke-width', 2);

  // Rank top left
  svg.append('text')
    .attr('x', 20)
    .attr('y', 35)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Arial')
    .attr('font-size', 30)
    .attr('fill', suitColour)
    .text(rank);

  // Rank bottom right
  svg.append('text')
    .attr('x', 130)
    .attr('y', 210)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Arial')
    .attr('font-size', 30)
    .attr('fill', suitColour)
    .text(rank);

  // Suit
  svg.append('text')
    .attr('x', 75)
    .attr('y', 180)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Arial')
    .attr('font-size', 20)
    .attr('fill', suitColour)
    .text(suit);


  // create diamond data
  var data = [{x: 75, y: 50}, {x: 125, y: 100}, {x: 75, y: 150}, {x: 25, y: 100}]

  // create heart data
  var heartData = [{x: 25, y: 77}, {x: 125, y: 77}, {x: 75, y: 150}]

  // create spade data
  var spadeData = [{x: 25, y: 120}, {x: 125, y: 120}, {x: 75, y: 50}]

  // create spade data
  var spadeStalk = [{x: 70, y: 160}, {x: 80, y: 160}, {x: 75, y: 100}]

  

  // prepare a helper function
  var lineFunc = d3.line()
    .x(function(d) { return d.x })
    .y(function(d) { return d.y })


  if(suit === "diamonds") {
    svg.append('path')
      .attr('d', lineFunc(data))
      .attr('fill', 'red')
  }

  if(suit === "hearts") {
    //Two circles and a triangle
    //left
    svg.append('circle')
      .attr('cx', 50)
      .attr('cy', 75)
      .attr('r', 25)
      .attr('fill', suitColour);

    //right
    svg.append('circle')
      .attr('cx', 100)
      .attr('cy', 75)
      .attr('r', 25)
      .attr('fill', suitColour);

    //Triangle
    svg.append('path')
      .attr('d', lineFunc(heartData))
      .attr('fill', 'red')
  }

  if(suit === 'spades') {
    //Upside down heart
    svg.append('circle')
    .attr('cx', 50)
    .attr('cy', 125)
    .attr('r', 25)
    .attr('fill', suitColour);

  //right
  svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 125)
    .attr('r', 25)
    .attr('fill', suitColour);

  //Triangle
  svg.append('path')
    .attr('d', lineFunc(spadeData))
    .attr('fill', suitColour)

  //Stalk
  svg.append('path')
    .attr('d', lineFunc(spadeStalk))
    .attr('fill', suitColour)
  }

  if(suit === 'clubs') {
    //Three circles
    svg.append('circle')
    .attr('cx', 50)
    .attr('cy', 110)
    .attr('r', 25)
    .attr('fill', suitColour);

  //right
  svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 110)
    .attr('r', 25)
    .attr('fill', suitColour);

  //top
  svg.append('circle')
    .attr('cx', 75)
    .attr('cy', 75)
    .attr('r', 25)
    .attr('fill', suitColour);

  //centre cover
  svg.append('circle')
    .attr('cx', 75)
    .attr('cy', 100)
    .attr('r', 20)
    .attr('fill', suitColour);

  //Stalk
  svg.append('path')
    .attr('d', lineFunc(spadeStalk))
    .attr('fill', suitColour)
  }

  // Serialize the SVG to a string
//  return new XMLSerializer().serializeToString(svg.node());
  return body.html();
}

function generateCards() {
  suits.forEach(suit => {
    ranks.forEach(rank => {
      const svgContent = createCard(suit, rank);
      const fileName = `card_${rank}_of_${suit}.svg`;
      fs.writeFileSync(fileName, svgContent);
      console.log(`Generated ${fileName}`);
    });
  });
}

generateCards();

