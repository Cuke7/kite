let w = window.innerWidth * 0.95
let h = window.innerHeight * 0.95
let r = 300; // theter length
let psi = 0;
let phi = 0;
let theta = 0;

function mouseWheel(event) {
    psi += event.delta / 1000;
}

function draw_arcs() {
    noFill()
    stroke("white")
    strokeWeight(0.3)
    for (rot = 0; rot <= PI / 2; rot += PI / 30) {
        push()
        rotateY(rot)
        arc(0, 0, 2 * r, 2 * r, -PI / 2, PI / 2)
        pop()
    }
    for (rot = 0; rot <= PI; rot += PI / 30) {
        push()
        stroke("white")
        rotateY(PI / 2)
        rotateX(rot)
        arc(0, 0, 2 * r, 2 * r, 0, PI / 2)
        pop()
    }
}

function setup() {
    createCanvas(w, h, WEBGL);
    rectMode(CENTER);
}

function draw() {
    background(0)
    orbitControl(1, 1, 0)
    translate(0, r / 3, 0)
    rotateZ(PI / 2)
    rotateY(PI / 2)
    plotRepere(r)
    phi = map(mouseX, 0, w, PI / 2, -PI / 2)
    theta = map(mouseY, h, 0, 0, PI / 2)
    // theta = map(cos(frameCount / 100), -1, 1, radians(20), radians(50));
    // phi = map(sin(frameCount / 100), -1, 1, radians(-20), radians(70));
    plotKite(phi, theta, psi, () => {
        fill('magenta')
        noStroke()
        triangle(0, 50, 0, -50, -30, 0)
    })
    draw_arcs()
}

const plotRepere = (scale) => {
    strokeWeight(2)
    stroke("blue")
    line(0, 0, 0, scale, 0, 0)
    stroke("red")
    line(0, 0, 0, 0, -scale, 0)
    stroke("green")
    line(0, 0, 0, 0, 0, scale)
}

function plotKite(phi, theta, psi, plot) {
    push()
    translate(
        r * cos(phi) * cos(theta),
        r * sin(phi) * cos(theta),
        r * -sin(theta)
    )
    rotateZ(phi);
    rotateY(theta - PI / 2)
    rotateZ(psi)
    plot()
    pop()
}