const TILE_SIZE = 32;
const OVERLAY_COLOR = '#eee';

class Grid {
    offset = new Coord(0, 0);
    offsetMoved = new Coord(0, 0);

    minRowVisible = 0;
    rowsVisible = 0;
    maxRowVisible = 0;

    minColVisible = 0;
    colsVisible = 0;
    maxColVisible = 0;

    constructor() {
        this.calcVisible();
    }

    draw() {
        this.updateOffset();
        this.calcVisible();
        this.drawOverlay();
    }

    updateOffset() {
        this.offset.addCoord(this.offsetMoved);
        this.offsetMoved.set(0, 0);
    }

    drawOverlay() {
        push();
        translate(this.offset.x % TILE_SIZE, this.offset.y % TILE_SIZE);
        stroke(OVERLAY_COLOR);
        const left = -TILE_SIZE;
        const right = windowWidth + TILE_SIZE
        for (let row = 0; row < this.rowsVisible; row++) {
            const lineY = row * TILE_SIZE;
            line(left, lineY, right, lineY);
        }
        const top = -TILE_SIZE;
        const bottom = windowHeight + TILE_SIZE;
        for (let col = 0; col < this.colsVisible; col++) {
            const lineX = col * TILE_SIZE;
            line(lineX, top, lineX, bottom);
        }
        pop();
    }

    calcVisible() {
        this.minRowVisible = this.calcMinRowVisible();
        this.rowsVisible = this.calcRowsVisible();
        this.maxRowVisible = this.minRowVisible + this.rowsVisible;

        this.minColVisible = this.calcMinColVisible();
        this.colsVisible = this.calcColsVisible();
        this.maxColVisible = this.minColVisible + this.colsVisible;
    }

    calcMinRowVisible() {
        return Math.floor(-this.offset.y / TILE_SIZE);
    }

    calcRowsVisible() {
        return Math.ceil(windowHeight / TILE_SIZE);
    }

    calcMinColVisible() {
        return Math.floor(-this.offset.x / TILE_SIZE);
    }

    calcColsVisible() {
        return Math.ceil(windowWidth / TILE_SIZE);
    }

    addMoveEvent({ movementX, movementY }) {
        this.offsetMoved.x += movementX;
        this.offsetMoved.y += movementY;
    }
}

const grid = new Grid();