window.addEventListener('load', (event) => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    demo = decodeURI(params.demo);
    container = document.getElementById("container")
});

let demo = null;
let r = innerWidth * 0.9 / 2; // theter length
r = Math.min(r, innerHeight * 0.9)
let psi = 0;
let phi = 0;
let theta = 0;
let container;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
    cnv.style('display', 'block');
    cnv.parent('container');
    rectMode(CENTER);
}

function mouseWheel(event) {
    if (demo == "manual") psi += event.delta / 1000;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    r = innerWidth * 0.9 / 2;
    r = Math.min(r, innerHeight * 0.9)
}

function draw() {
    phi = container.dataset.phi;
    theta = container.dataset.theta;
    psi = container.dataset.psi;
    background("white")
    if (demo == "data") orbitControl(1, 1, 0)
    translate(0, r / 2, 0)
    rotateZ(PI / 2)
    rotateY(PI / 2)
    plotRepere(r)
    if (demo == "manual") {
        phi = map(mouseX, 0, windowWidth, PI / 2, -PI / 2)
        theta = map(mouseY, windowHeight, 0, 0, PI / 2)
    }
    if (demo == "auto") {
        theta = map(cos(frameCount / 100), -1, 1, radians(20), radians(50));
        phi = map(sin(frameCount / 100), -1, 1, radians(-20), radians(70));
        psi = map(sin(frameCount / 100), -1, 1, radians(0), radians(360));
    }
    plotKite(phi, theta, psi, () => {
        fill('blue')
        noStroke()
        triangle(0, r / 8, 0, -r / 8, -r / 10, 0)
    })
    draw_arcs()
}

const plotRepere = (scale) => {
    strokeWeight(2)
    stroke("black")
    line(0, 0, 0, scale, 0, 0)
    line(0, 0, 0, 0, -scale, 0)
    line(0, 0, 0, 0, scale, 0)

    // stroke("green")
    // line(0, 0, 0, 0, 0, scale)
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


function draw_arcs() {
    stroke("black")
    noFill()
    strokeWeight(0.3)
    for (rot = 0; rot <= PI / 2; rot += PI / 30) {
        push()
        rotateY(rot)
        arc(0, 0, 2 * r, 2 * r, -PI / 2, PI / 2)
        pop()
    }
    for (rot = 0; rot <= PI; rot += PI / 30) {
        push()
        rotateY(PI / 2)
        rotateX(rot)
        arc(0, 0, 2 * r, 2 * r, 0, PI / 2)
        pop()
    }
}
