class Player {
    name;
    currentTile;

    constructor(name) {
        this.setName(name);
    }

    setName(name) {
        this.name = name;
    }

    drawTile() {
        const tileIndex = deck.randomTile();
        console.log(`${this.name} drew a tile: ${tileIndex}`);
        this.currentTile = new HoverTile(tileIndex);
    }

    update() {
        this.currentTile?.draw();
    }
}