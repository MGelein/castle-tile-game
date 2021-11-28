class ManagedList {
    toRem = [];
    list = [];
    toAdd = [];

    add(...objects) {
        for (let object of objects) this.toAdd.push(object);
    }

    remove(...objects) {
        for (let object of objects) this.toRem.push(object);
    }

    update() {
        if (this.toAdd.length > 0) {
            this.list.push(...this.toAdd);
            this.toAdd = [];
        }
        if (this.toRem.length > 0) {
            for (let object of toRem) {
                this.list.filter(o => o !== object);
            }
            this.toRem = [];
        }
    }
}