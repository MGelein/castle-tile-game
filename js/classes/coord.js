class Coord {
    x = 0;
    y = 0;

    constructor(x, y) {
        this.set(x, y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    setCoord({ x, y }) {
        this.set(x, y);
    }

    addCoord({ x, y }) {
        this.add(x, y);
    }

    add(x, y) {
        this.x += x;;
        this.y += y;
    }
}