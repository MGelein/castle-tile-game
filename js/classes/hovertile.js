class HoverTile {

    tileIndex = 0;
    rotation = 0;
    targetRotation = 0;

    constructor(tileIndex) {
        this.tileIndex = tileIndex;
    }

    draw() {
        push();

        translate(windowWidth / 2 - TILE_SIZE / 2, windowHeight - TILE_SIZE * 2.5);
        this.update();
        sheet.draw(this.tileIndex, 0, 0, TILE_SIZE, TILE_SIZE, this.rotation);

        translate(TILE_SIZE / 2, TILE_SIZE / 2);
        noFill();
        stroke(UI_BORDER_COLOR);
        strokeWeight(4);
        rotate(this.rotation * TWO_PI);
        rect(-TILE_SIZE / 2, -TILE_SIZE / 2, TILE_SIZE, TILE_SIZE, 4);

        pop();
    }

    rotateCCW() {
        this.targetRotation -= 0.25;
    }

    rotateCW() {
        this.targetRotation += 0.25;
    }

    update() {
        this.rotation += (this.targetRotation - this.rotation) * 0.1;
    }
}