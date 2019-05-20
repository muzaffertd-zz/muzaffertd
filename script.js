let canvas = document.getElementById('canvas');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext('2d');

let colorArray = [
  "#C5DADA",
  "#96B3B4",
  "#4DB0C3",
  "#988A77",
  '#34445D'
];

// for (let i = 0; i < 10; i++) {
//   c.rect(Math.random() * (innerWidth - 200) + 50, Math.random() * (innerHeight - 200) + 50, 100, 100);
//   c.strokeStyle = 'blue';
//   c.stroke();
// }

// for (let i = 0; i < 100; i++) {
//   let radius = 50;
//   let x = Math.random() * (innerWidth - radius * 2) + radius;
//   let y = Math.random() * (innerHeight - radius * 2) + radius;
//   c.beginPath();
//   c.arc(x, y, radius, 0, Math.PI * 2);
//   c.strokeStyle = 'rgba(' + (255 * Math.random()) + ',' + (255 * Math.random()) + ',' + (255 * Math.random()) + ',1)';
//   c.stroke();
// }


// c.beginPath();
// c.arc(x, y, radius, 0, Math.PI * 2);
// c.strokeStyle = 'rgba(' + (255 * Math.random()) + ',' + (255 * Math.random()) + ',' + (255 * Math.random()) + ',1)';
// c.stroke();

let mouse = {
  x: undefined,
  y: undefined
}
const maxRadius = 80;
window.addEventListener('mousemove', function(e){
  mouse.x = e.x;
  mouse.y = e.y;
})

window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();
})

function Circle(x, y, radius, dx, dy, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.minRadius = radius;
  
  // console.log(x, y, radius);
  this.draw = function () {
    // console.log('draw')
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = color;
    c.fillStyle = color;
    c.fill();
    c.stroke();
  }
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // Interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
      if(this.radius < 40){
        this.radius += 1;
      }
    }
    else if(this.radius > this.minRadius){
      this.radius -= 1;
    }

    this.draw();
  }
}

let circleArray = []
function init(){
  circleArray = [];
  for (let i = 0; i < 1000; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;
    let color = colorArray[Math.floor(Math.random() * colorArray.length)];
    circleArray.push(new Circle(x, y, radius, dx, dy, color));
  }
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
init();
