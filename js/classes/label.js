class Label {

    text = '';
    pos = new Coord(0, 0);
    width = 0;
    fontSize = 16;
    outline = 2;

    constructor(text, x, y, width) {
        this.setText(text);
        this.setPosition(x, y);
        this.setWidth(width);
    }

    draw() {
        noStroke();
        textFont(ui.font, this.fontSize);

        fill(UI_TEXT_SHADOW);
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                if (x === y && x === 0) continue;
                text(this.text, this.pos.x + x * this.outline, this.pos.y + y * this.outline, this.width);
            }
        }

        fill(UI_TEXT_COLOR);
        text(this.text, this.pos.x, this.pos.y, this.width);
    }

    setFontSize(size) {
        this.fontSize = size;
        this.outline = size / 8;
    }

    setText(text) {
        this.text = text;
    }

    setPosition(x, y) {
        this.pos.set(x, y);
    }

    setWidth(width) {
        this.width = width;
    }
}