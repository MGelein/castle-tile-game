let sheet;

function preload() {
}

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    frameRate(60);

    sheet = new Sheet('./data/spritesheet.png', 16);

    map.set(0, 0, new Tile(0));
    map.set(0, 1, new Tile(1));
    map.set(1, 1, new Tile(1, 0.5));
    map.set(1, 0, new Tile(1, 0.25));
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