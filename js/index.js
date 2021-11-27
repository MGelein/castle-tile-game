function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
}

function draw() {
    clear();
    grid.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function touchMoved(e) {
    grid.addMoveEvent(e);
}