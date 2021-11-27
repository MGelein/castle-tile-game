let sheet;

function preload() {
}

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    frameRate(60);

    for (let i = -50; i < 50; i++) {
        for (let j = -50; j < 50; j++) {
            map.set(i, j, new Tile(0, (i % 4) * 0.25));
        }
    }

    sheet = new Sheet('./data/spritesheet.png', 16);
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