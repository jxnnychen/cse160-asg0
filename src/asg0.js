// DrawTriangle.js (c) 2012 matsuda
function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  // ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set color to blue
  // ctx.fillRect(120, 10, 150, 150);        // Fill a rectangle with the color

  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // to black
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  document.getElementById('draw-button').onclick = handleDrawEvent;
  document.getElementById('draw-op-button').onclick = handleDrawOperationEvent;

  handleDrawEvent(); // draw initial vector
  // vector v1
  // var v1 = new Vector3([2.25, 2.25, 0.0]);
  // draw v1 in red
  // drawVector(v1, 'red')
}

function handleDrawEvent() {
  var x1 = parseFloat(document.getElementById('x1-coord').value);
  var y1 = parseFloat(document.getElementById('y1-coord').value);
  var x2 = parseFloat(document.getElementById('x2-coord').value);
  var y2 = parseFloat(document.getElementById('y2-coord').value);

  var v1 = new Vector3([x1, y1, 0.0]);
  var v2 = new Vector3([x2, y2, 0.0]);

  // clear canvas
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawVector(v1, 'red');
  drawVector(v2, 'blue');
}

function drawVector(v, color) {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');
  var scale = 20;

  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
    
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  
  // line to scaled vector coordinates
  ctx.lineTo(centerX + v.elements[0] * scale, centerY - v.elements[1] * scale);
  
  ctx.strokeStyle = color;
  ctx.stroke();
}

function handleDrawOperationEvent() {
  var canvas = document.getElementById('example');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var x1 = parseFloat(document.getElementById('x1-coord').value);
  var y1 = parseFloat(document.getElementById('y1-coord').value);
  var x2 = parseFloat(document.getElementById('x2-coord').value);
  var y2 = parseFloat(document.getElementById('y2-coord').value);

  var v1 = new Vector3([x1, y1, 0.0]);
  var v2 = new Vector3([x2, y2, 0.0]);

  var operation = document.getElementById('operation').value;
  var scalar = parseFloat(document.getElementById('scalar').value);

  drawVector(v1, 'red');
  drawVector(v2, 'blue');

  switch(operation) {
    case 'add':
      var v3 = new Vector3(v1.elements).add(v2);
      drawVector(v3, 'green');
      break;
    case 'sub':
      var v3 = new Vector3(v1.elements).sub(v2);
      drawVector(v3, 'green');
      break;
    case 'mul':
      var v3 = new Vector3(v1.elements).mul(scalar);
      var v4 = new Vector3(v2.elements).mul(scalar);
      drawVector(v3, 'green');
      drawVector(v4, 'green');
      break;
    case 'div':
      var v3 = new Vector3(v1.elements).div(scalar);
      var v4 = new Vector3(v2.elements).div(scalar);
      drawVector(v3, 'green');
      drawVector(v4, 'green');
      break;
    case 'mag':
      console.log("Magnitude v1: " + v1.magnitude());
      console.log("Magnitude v2: " + v2.magnitude());
      break;
    case 'norm':
      var v3 = new Vector3(v1.elements).normalize();
      var v4 = new Vector3(v2.elements).normalize();
      drawVector(v3, 'green');
      drawVector(v4, 'green');
      break;
    case 'angle':
      var angle = angleBetween(v1, v2);
      console.log("Angle: " + angle);
      break;
    case 'area':
      var area = areaTriangle(v1, v2);
      console.log("Area of the triangle: " + area);
      break;
  }  
}

function angleBetween(v1, v2) {
  var dotProduct = Vector3.dot(v1, v2);
  
  var mag1 = v1.magnitude();
  var mag2 = v2.magnitude();
  
  if (mag1 === 0 || mag2 === 0) {
      return 0;
  }
  
  var cosAngle = dotProduct / (mag1 * mag2);
  
  // angle in degrees
  return Math.acos(cosAngle) * 180 / Math.PI;
}

function areaTriangle(v1, v2) {
  var crossProduct = Vector3.cross(v1, v2);
  var parallelogram = crossProduct.magnitude();
  
  // area of triangle is half parallelogram area
  return parallelogram / 2;
}