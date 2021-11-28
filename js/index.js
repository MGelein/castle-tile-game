let sheet;

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    frameRate(60);

    for (let i = -50; i < 50; i++) {
        for (let j = -50; j < 50; j++) {
            map.set(i, j, new Tile(Math.floor(random(0, 34)), (i % 4) * 0.25));
        }
    }

    sheet = new Sheet('./data/spritesheet.png', 16);
    ui = new UI('./data/PressStart2P-Regular.ttf');
}

function draw() {
    clear();
    grid.draw();
    ui.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function touchStarted(e) {
    if (!ui.handleClick()) grid.startDrag(e.touches?.[0] || e)
}

function touchMoved(e) {
    grid.addMoveEvent(e.touches?.[0] || e);
}

function touchEnded() {
    grid.stopDrag();
}