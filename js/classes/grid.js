const TILE_SIZE = 32;

class Grid {
    offset = new Coord(0, 0);

    minRowVisible = 0;
    rowsVisible = 0;
    maxRowVisible = 0;

    minColVisible = 0;
    colsVisbile = 0;
    maxColVisible = 0;

    constructor() {

    }

    draw() {
        this.calcVisible();
    }

    calcVisible() {
        this.minRowVisible = this.calcMinRowVisible();
        this.rowsVisible = this.calcRowsVisible();
        this.maxRowVisible = this.minRowVisible + this.rowsVisible;
    }

    calcMinRowVisible() {
        return Math.floor(this.offset.x / TILE_SIZE);
    }

    calcRowsVisible() {
        return Math.ceil(windowWidth / TILE_SIZE);
    }
}

const grid = new Grid();