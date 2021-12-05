function preload() {
    sheet = new Sheet('./data/spritesheet.png', 16);
    ui = new UI('./data/PressStart2P-Regular.ttf');

    findLobby();
}

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    noSmooth();
    frameRate(60);

    mouseHandler.on("press", () => ui.handlePress());
    mouseHandler.on("press", (x, y) => grid.startDrag(x, y));
    mouseHandler.on("release", () => ui.handleRelease());
    mouseHandler.on("drag", (dx, dy) => grid.addMoveEvent(dx, dy));
    mouseHandler.on("click", () => game?.activePlayer?.nextState());
}

function draw() {
    clear();
    grid.draw();
    ui.draw();
    game?.update();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    ui.onResize();
}

function touchStarted() {
    mouseHandler.press();
}

function touchMoved() {
    mouseHandler.drag();
}

function touchEnded() {
    mouseHandler.release();
}

function mouseWheel({ delta }) {
    mouseHandler.wheel(delta);
}

function startGame(e) {
    e.stopPropagation();
    if (server.playerNames.length < 2) return alert('You need at least 2 players to play!');
    server.createGame();
}