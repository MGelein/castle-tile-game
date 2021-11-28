CW_ICON = 35;
CCW_ICON = 36;
PUT_ICON = 37;
UP_ICON = 38;
DOWN_ICON = 39;
LEFT_ICON = 47;
RIGHT_ICON = 46;
MEEPLE_ICON = 45;

class UI {

    font;

    components = new ManagedList();

    constructor(fontUrl) {
        loadFont(fontUrl, (font) => {
            this.font = font;
        });

        const testButton = new Button(PUT_ICON, 100, 100);
        testButton.onClick = () => {
            console.log("test clicky");
        }
        this.addButton(testButton);
    }

    addButton(button) {
        this.components.add(button);
    }

    removeButton(button) {
        this.components.remove(button);
    }

    draw() {
        this.components.update();
        for (let component of this.components.list) component.draw();
    }

    handleClick() {
        for (let { hover, onClick } of this.components.list) {
            if (hover) {
                onClick?.();
                return true;
            }
        }
        return false;
    }
}

let ui;