class Map {
    data = {};

    set(col, row, tile) {
        this.data[`c${col}r${row}`] = tile;
    }

    get(col, row) {
        return this.data[`c${col}r${row}`];
    }
}

const map = new Map();