const TILE_SIZE = 64;
const OVERLAY_COLOR = '#eee';
const DRAW_COORDS = false;

class Grid {
    offset = new Coord(0, 0);
    offsetMoved = new Coord(0, 0);

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