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
        this.currentTile = deck.randomTile();
        console.log(`${this.name} drew a tile: ${this.currentTile}`);
    }
}