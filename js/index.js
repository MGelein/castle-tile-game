let sheet;

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    frameRate(60);

    sheet = new Sheet('./data/spritesheet.png', 16);
    ui = new UI('./data/PressStart2P-Regular.ttf');

    player = new Player("trb1914");
    playerB = new Player("kers");
    game = new Game(player);
    game.start(player, playerB);
}

function draw() {
    game.update();

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