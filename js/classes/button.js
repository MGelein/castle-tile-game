class Button {
    parentPos = new Coord(0, 0);
    iconIndex;
    x;
    y;

    hover = false;
    baseSize = 0;
    targetScale = 1;
    scale = 1;
    shadowOffset = 0;
    targetShadowOffset = 0;
    baseShadowOffset = 0;
    onClick

    constructor(iconIndex, x, y, onClick) {
        this.iconIndex = iconIndex;
        this.x = x;
        this.y = y;
        this.baseSize = TILE_SIZE;
        this.baseShadowOffset = this.baseSize * 0.0675;
        this.shadowOffset = this.targetShadowOffset = this.baseShadowOffset;
        this.onClick = onClick;
    }

    draw() {
        push();
        translate(this.x, this.y);
        this.handleInteraction();
        const { x, y, w, h } = this.calcSize();
        tint(0, 120);
        sheet.draw(this.iconIndex, x + this.shadowOffset, y + this.shadowOffset, w, h);
        noTint();
        sheet.draw(this.iconIndex, x, y, w, h);
        pop();

        this.shadowOffset += (this.targetShadowOffset - this.shadowOffset) * 0.3;
    }

    calcSize() {
        const half = (this.baseSize * this.scale) / 2;
        return {
            x: -half,
            y: -half,
            w: half * 2,
            h: half * 2,
        }
    }

    handleInteraction() {
        this.hover = this.inBounds();
        if (this.hover) {
            this.targetScale = mouseIsPressed ? 0.9 : 1.1;
            this.targetShadowOffset = mouseIsPressed ? this.baseShadowOffset / 2 : this.baseShadowOffset * 1.2;
        } else {
            this.targetScale = 1;
            this.targetShadowOffset = this.baseShadowOffset
        }
        this.scale += (this.targetScale - this.scale) * 0.3;
    }

    inBounds() {
        if (this.visible === false) return false;
        const { x, y, w, h } = this.calcSize();
        const mx = mouseX - this.x - this.parentPos.x;
        const my = mouseY - this.y - this.parentPos.y;
        return mx > x && mx < x + w && my > y && my < y + h;
    }
}