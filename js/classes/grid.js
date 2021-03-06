const TILE_SIZE = 96;
const DRAW_COORDS = false;
const STROKE_WIDTH = 2;

class Grid {
    targetOffset = new Coord(0, 0);
    offset = new Coord(0, 0);
    offsetMoved = new Coord(0, 0);
    mouseCoord = new Coord(0, 0);
    startDragCoord = new Coord(0, 0);

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
        this.updateMouseCoord();
    }

    updateMouseCoord() {
        this.mouseCoord.setCoord(this.screenToGridCoord(mouseX, mouseY));
    }

    screenToGridCoord(x, y) {
        const mx = -this.offset.x + x;
        const my = -this.offset.y + y;
        return new Coord(Math.floor(mx / TILE_SIZE), Math.floor(my / TILE_SIZE));
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

        if (game?.isLocalTurn?.()) game.activePlayer.drawState();
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

    addMoveEvent(dx, dy) {
        this.offsetMoved.x += dx;
        this.offsetMoved.y += dy;
    }

    startDrag(x, y) {
        this.startDragCoord = new Coord(x, y);
    }
}

const grid = new Grid();