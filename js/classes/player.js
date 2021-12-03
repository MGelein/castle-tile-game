const SEARCHING = 'searching';
const PLACING = 'placing';
const MEEPLES = 'meeples';

class Player {
    name;
    currentTile;
    turnState = WAITING;
    placeCoord = new Coord(0, 0);

    alphaAmplitude = 30;
    animAngle = 0;
    tileAlpha = 0;
    baseTileAlpha = 90;

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
        this.turnState = SEARCHING;
    }

    update() {
        if (this.turnState === SEARCHING || this.turnState === PLACING) {
            this.currentTile?.draw();
        }
    }

    nextState() {
        if (this.turnState === SEARCHING) {
            this.turnState = PLACING;
            this.placeCoord.setCoord(grid.mouseCoord);
        } else if (this.turnState === PLACING) {
            if (grid.mouseCoord.x === this.placeCoord.x && grid.mouseCoord.y === this.placeCoord.y) {
                this.turnState = MEEPLES;
                map.set(this.placeCoord.x, this.placeCoord.y, new Tile(deck.lastDrawn, this.currentTile.targetRotation));
            } else {
                this.placeCoord.setCoord(grid.mouseCoord);
            }
        } else if (this.turnState === MEEPLES) {
            this.turnState = WAITING;
            game.nextPlayer();
        }
    }

    drawState() {
        push();
        const { x, y } = this.turnState === SEARCHING ? grid.mouseCoord : this.placeCoord;
        translate(x * TILE_SIZE + grid.offset.x, y * TILE_SIZE + grid.offset.y);

        if (this.turnState === SEARCHING) this.drawSearch();
        if (this.turnState === PLACING) this.drawPlace();

        this.tileAlpha = sin(this.animAngle) * this.alphaAmplitude + this.baseTileAlpha;
        this.animAngle += 0.1;
        pop();
    }

    drawSearch() {
        tint(255, this.baseTileAlpha);
        sheet.draw(deck.lastDrawn, 0, 0, TILE_SIZE, TILE_SIZE, this.currentTile.rotation);
    }

    drawPlace() {
        tint(255, this.tileAlpha);
        sheet.draw(deck.lastDrawn, 0, 0, TILE_SIZE, TILE_SIZE, this.currentTile.rotation);
    }
}