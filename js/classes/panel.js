class Panel {

    pos = new Coord(0, 0);

    width = 0;
    height = TILE_SIZE;

    vAlign = "bottom";
    hAlign = "center";

    margin = 16;
    padding = 8;
    cornerRadius = 8;

    components = new ManagedList();
    positionInvalidated = false;

    constructor(width, height = TILE_SIZE, vAlign = 'bottom', hAlign = 'center') {
        this.setPosition(vAlign, hAlign);
        this.setDimensions(width, height);
    }

    addComponent(...components) {
        this.components.add(...components);
        this.positionInvalidated = true;
    }

    removeComponent(...components) {
        this.components.remove(...components);
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        noStroke();
        fill(0, 80);
        rect(this.padding, this.padding, this.width, this.height, this.cornerRadius);
        strokeWeight(4);
        stroke(UI_BORDER_COLOR);
        fill(UI_PANEL_COLOR);
        rect(0, 0, this.width, this.height, this.cornerRadius);

        translate(this.padding, this.padding);

        for (let component of this.components.list) {
            component.visible = component.visibleRule?.();
            if (component.visible === false) continue;
            component.draw?.();
        }
        pop();

        this.components.update();

        if (this.positionInvalidated) this.calcPosition();
    }

    calcPosition() {
        switch (this.vAlign) {
            case 'bottom':
                this.pos.y = windowHeight - this.height - this.margin - this.padding;
                break;
            case 'top':
                this.pos.y = this.margin;
                break;
            case 'center':
                this.pos.y = (windowHeight / 2) - this.height / 2;
            default:
                break;
        }

        switch (this.hAlign) {
            case 'left':
                this.pos.x = this.margin;
                break;
            case 'right':
                this.pos.x = windowWidth - this.margin - this.width - this.padding;
                break;
            case 'center':
                this.pos.x = windowWidth / 2 - this.width / 2;
            default:
                break;
        }

        for (let component of this.components.list) {
            component.parentPos?.set(this.pos.x, this.pos.y);
        }

        this.positionInvalidated = false;
    }

    setDimensions(width, height = TILE_SIZE) {
        this.width = width;
        this.height = height;
        this.calcPosition();
    }

    setPosition(vAlign, hAlign) {
        this.vAlign = vAlign;
        this.hAlign = hAlign;
        this.calcPosition();
    }

    setMargin(margin) {
        this.margin = margin;
    }

    setPadding(padding) {
        this.padding = padding;
    }

    onResize() {
        this.calcPosition();
    }
}