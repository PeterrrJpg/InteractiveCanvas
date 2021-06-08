const numCircles = 777;

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

let colors = [
    '#A3506E',
    '#E0786A',
    '#FFB360',
    '#F9F871',
    '#C691BD',
    '#67557C',
    '#3C385A',
    '#EAEEFF',
];

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = radius + 30;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function() {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx *= -1;
        }
    
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy *= -1;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        // user interaction
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < this.maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

let circles = [];
for (let i = 0; i < numCircles; i++) {
    let radius = Math.random() * 10 + 1;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;
    circles.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}

animate();