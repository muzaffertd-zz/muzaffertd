let canvas = document.getElementById('canvas');

console.log(canvas);

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext('2d');

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

function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  // console.log(x, y, radius);
  this.draw = function () {
    // console.log('draw')
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = 'rgba(' + (255 * Math.random()) + ',' + (255 * Math.random()) + ',' + (255 * Math.random()) + ',1)';
    c.stroke();
  }
  this.update = function () {
    console.log('update')
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

let circleArray = [];
for (let i = 0; i < 50; i++) {
  let radius = 50;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 8;
  let dy = (Math.random() - 0.5) * 8;
  circleArray.push(new Circle(x, y, radius, dx, dy));
}
console.log(circleArray)

// const newCircle = new Circle(x + 100, y + 100, radius);
// newCircle.draw();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
