var socket = io();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mousebool = false;
var lastMousePosition = [];
var color = 'black';
var pen = 5;
// var hist = [];
// drawCircle = function(x,y) {
//   ctx.beginPath();
//   ctx.fillStyle = 'blue';
//   ctx.ellipse(x, y, 4, 4, 0, 0, Math.PI * 2);
//   ctx.fill();
//   coords = [x, y];
// };
drawLine = function(x,y, color, pen) {
  ctx.strokeStyle = color;
  ctx.lineJoin = 'round';
  ctx.lineWidth = pen;
  ctx.beginPath();
  ctx.moveTo(x[0], x[1]);
  ctx.lineTo(y.x, y.y);
  ctx.closePath();
  ctx.stroke();
};

$('#canvas').on('mousemove', function(poopevent) {
  mousePosition = {x: poopevent.pageX, y: poopevent.pageY};
  if (lastMousePosition.length > 0 && mousebool) {
    drawLine(lastMousePosition, mousePosition, color, pen);
    socket.emit('draw', [lastMousePosition, mousePosition, color, pen]);
  }
  lastMousePosition[0] = mousePosition.x;
  lastMousePosition[1] = mousePosition.y;
  // hist.push({x: lastMousePosition[0], y: lastMousePosition[1], color: color, pen: pen});
});

$('#canvas').on('mousedown', function(poopevent) {
  mousebool = true;
});

$('#canvas').on('mouseup', function(poopevent) {
  mousebool = false;
});

$('.btn').on('click', function(click) {
  color = click.target.name;
});

$('.btn5').on('click', function(click) {
  if (click.target.name === '25') {
    color = 'red';
    pen = parseInt(click.target.name);
  } else {
    pen = parseInt(click.target.name);
  }
});

$('.submit1').on('input', function(input) {
  pen = input.target.valueAsNumber;
});

$('.eraser').on('click', function(click) {
  color = 'white';
  pen = 25;
});

socket.on("drawHist", function(coords) {
  coords.forEach(function(coord) {
    drawLine(coord[0], coord[1], coord[2], coord[3]);
  });
  //
  // for(var i = 0; i< coords.length; i++) {
  //   console.log('drawhist coords', coords);
  //}

});

socket.on('sent draw', function(coords) {
  drawLine(coords[0], coords[1], coords[2], coords[3]);
});
