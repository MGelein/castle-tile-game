let sheet;
let clicked = false;
let clickDebounce = 200;
let scrolling = false;
let scrollTimeout = -1;
let scrollDebounce = 2000;

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
    clear();
    grid.draw();
    ui.draw();
    game.update();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    ui.onResize();
}

function touchStarted(e) {
    if (!clicked) {
        clicked = true;
        if (!ui.handleClick()) grid.startDrag(e.touches?.[0] || e)
        setTimeout(() => clicked = false, clickDebounce);
    }
}

function touchMoved(e) {
    grid.addMoveEvent(e.touches?.[0] || e);
}

function touchEnded() {
    grid.stopDrag();
    ui.handleRelease();
}

function mouseWheel({ delta }) {
    if (scrollTimeout === -1) {
        scrollTimeout = setTimeout(() => {
            console.log("done");
            scrolling = false;
            scrollTimeout = -1;
        }, scrollDebounce);
    }

    if (scrolling) return;
    scrolling = true;
    const hoverTile = game.activePlayer?.currentTile;
    if (hoverTile) {
        delta > 0 ? hoverTile.rotateCCW() : hoverTile.rotateCW();
    }
}