class Map {
    data = {};

    set(col, row, tile) {
        this.data[`c${col}r${row}`] = tile;
        server.setTile(col, row, tile.tile, tile.rotation);
    }

    get(col, row) {
        return this.data[`c${col}r${row}`];
    }
}

const map = new Map();