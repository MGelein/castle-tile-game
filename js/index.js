let sheet;

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    frameRate(60);

    sheet = new Sheet('./data/spritesheet.png', 16);
    ui = new UI('./data/PressStart2P-Regular.ttf');

    deck.shuffle();
    let counter = 0;
    while (deck.hasTiles()) {
        map.set(counter, 0, new Tile(deck.randomTile()));
        counter++;
    }
}

function draw() {
    clear();
    grid.draw();
    ui.draw();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    ui.onResize();
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