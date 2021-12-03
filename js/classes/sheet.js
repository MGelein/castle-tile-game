class Sheet {
    spritesheet;
    cols;
    tileSize = 16;
    ts2 = TILE_SIZE / 2

    constructor(url, tileSize = 16) {
        this.spritesheet = loadImage(url, () => {
            this.cols = Math.floor(this.spritesheet.width / this.tileSize);
        });
        this.tileSize = tileSize;
    }

    draw(spriteIndex = 0, x = 0, y = 0, w = this.tileSize, h = this.tileSize, turns = 0) {
        const spriteCol = spriteIndex % this.cols;
        const spriteRow = Math.floor(spriteIndex / this.cols);
        const spriteX = spriteCol * this.tileSize;
        const spriteY = spriteRow * this.tileSize;
        push();
        translate(this.ts2, this.ts2);
        rotate(TWO_PI * turns);
        image(this.spritesheet, x - this.ts2, y - this.ts2, w, h, spriteX, spriteY, this.tileSize, this.tileSize);
        pop();
    }
}

let sheet;