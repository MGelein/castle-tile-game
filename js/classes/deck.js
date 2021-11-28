const TILE_NUMBERS = [
    1, 4, 9, 3, 8, 3, 4, 2,
    5, 4, 3, 3, 1, 3, 2, 3,
    3, 1, 1, 2, 2, 2, 1, 2,
    3, 2, 2, 2, 1, 1, 1, 1,
    1, 1];

class Deck {

    tiles = [];

    shuffle() {
        this.tiles = [];
        for (let spriteIndex = 0; spriteIndex < TILE_NUMBERS.length; spriteIndex++) {
            const amount = TILE_NUMBERS[spriteIndex];
            for (let i = 0; i < amount; i++) {
                this.tiles.push(spriteIndex);
            }
        }
    }

    hasTiles() {
        return this.tiles.length > 0;
    }

    randomTile() {
        const randomIndex = Math.floor(random(this.tiles.length));
        return this.tiles.splice(randomIndex, 1)[0];
    }
}

const deck = new Deck();