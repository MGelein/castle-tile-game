class MouseHandler {

    pressing = false;
    releasing = false;

    down = false;
    dragging = false;

    startPos = null;
    lastPos = null;

    scrolling = false;
    scrollTimeout = -1;
    scrollDebounce = 2000;

    pressConsumed = false;

    callbacks = {
        press: [],
        release: [],
        drag: [],
        click: []
    };

    press() {
        if (this.pressing || this.down) return;
        this.pressing = true;
        setTimeout(() => this.pressing = false, 200);

        this.down = true;
        this.startPos = new Coord(mouseX, mouseY);

        this.pressConsumed = false;
        for (let callback of this.callbacks.press) {
            this.pressConsumed = callback(mouseX, mouseY);
            if (this.pressConsumed) break;
        }
    }

    release() {
        if (this.releasing || !this.down) return;
        this.releasing = true;
        setTimeout(() => this.releasing = false, 200);

        const { x, y } = this.startPos;
        const dx = mouseX - x;
        const dy = mouseY - y;
        if (sqrt(dx * dx + dy * dy) < TILE_SIZE / 4 && !this.pressConsumed) {
            for (let callback of this.callbacks.click) callback(mouseX, mouseY);
        }

        this.down = false;
        this.startPos = null;
        this.lastPos = null;
        this.dragging = false;
        for (let callback of this.callbacks.release) callback(mouseX, mouseY);
    }

    drag() {
        this.dragging = true;
        const { x, y } = this.lastPos ? this.lastPos : this.startPos;
        this.lastPos = new Coord(mouseX, mouseY);
        const dx = this.lastPos.x - x;
        const dy = this.lastPos.y - y;

        for (let callback of this.callbacks.drag) callback(dx, dy);
    }


    wheel(delta) {
        if (this.scrollTimeout === -1) {
            this.scrollTimeout = setTimeout(() => {
                this.scrolling = false;
                this.scrollTimeout = -1;
            }, this.scrollDebounce);
        }

        if (this.scrolling) return;
        this.scrolling = true;
        const hoverTile = game.activePlayer?.currentTile;
        delta > 0 ? hoverTile?.rotateCCW() : hoverTile?.rotateCW();
    }

    on(eventType, callback) {
        this.callbacks[eventType].push(callback);
    }
}

mouseHandler = new MouseHandler();