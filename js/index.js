function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    frameRate(60);

    map.set(0, 0, new Tile());
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