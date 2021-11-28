const TILE_SIZE = 96;
const DRAW_COORDS = true;
const STROKE_WIDTH = 2;

class Grid {
    targetOffset = new Coord(0, 0);
    offset = new Coord(0, 0);
    offsetMoved = new Coord(0, 0);
    lastMoved = null;

    minRowVisible = 0;
    rowsVisible = 0;
    maxRowVisible = 0;

    minColVisible = 0;
    colsVisible = 0;
    maxColVisible = 0;

    draw() {
        this.updateOffset();
        this.calcVisible();
        this.drawOverlay();
        this.drawTiles();
    }

    drawTiles() {
        push();
        translate(this.offset.x, this.offset.y);
        for (let row = this.minRowVisible; row <= this.maxRowVisible; row++) {
            for (let col = this.minColVisible; col <= this.maxColVisible; col++) {
                push();
                translate(col * TILE_SIZE, row * TILE_SIZE);
                const tile = map.get(col, row);
                if (tile && tile.draw) tile.draw();
                else if (DRAW_COORDS) text(`(${col};${row})`, 8, 16);
                pop();
            }
        }
        pop();
    }

    updateOffset() {
        this.targetOffset.addCoord(this.offsetMoved);
        this.offsetMoved.set(0, 0);

        this.offset.x += (this.targetOffset.x - this.offset.x) * 0.1;
        this.offset.y += (this.targetOffset.y - this.offset.y) * 0.1;
    }

    drawOverlay() {
        push();
        translate(this.offset.x % TILE_SIZE, this.offset.y % TILE_SIZE);

        strokeWeight(STROKE_WIDTH);
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

    addMoveEvent(e) {
        if (this.lastMoved !== null) {
            const movementX = e.clientX - this.lastMoved.x;
            const movementY = e.clientY - this.lastMoved.y;

            this.offsetMoved.x += movementX;
            this.offsetMoved.y += movementY;
            this.lastMoved.set(e.clientX, e.clientY);
        }
    }

    startDrag(e) {
        this.lastMoved = new Coord(e.clientX, e.clientY);
    }

    stopDrag() {
        this.lastMoved = null;
    }
}

const grid = new Grid();