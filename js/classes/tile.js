class Tile {
    tile
    rotation = 0

    constructor(tileIndex, rotation = 0) {
        this.tile = tileIndex;
        this.rotation = rotation;
    }

    draw() {
        sheet.draw(this.tile, 0, 0, TILE_SIZE, TILE_SIZE, this.rotation);
    }
}