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


        const testPanel = new Panel(200);
        this.addComponent(testPanel);

        const testButton = new Button(PUT_ICON, 0, 0);
        testButton.onClick = () => {
            console.log("test clicky");
        }
        testPanel.addComponent(testButton);
    }

    addComponent(button) {
        this.components.add(button);
    }

    removeComponent(button) {
        this.components.remove(button);
    }

    draw() {
        this.components.update();
        for (let component of this.components.list) component.draw();
    }

    handleClick() {
        for (let component of this.components.list) {
            if (component.components) {
                for (let subcomponent of component.components.list) {
                    if (subcomponent.hover) {
                        subcomponent.onClick?.();
                        return true;
                    }
                }
            } else if (component.hover) {
                component.onClick?.();
                return true;
            }
        }
        return false;
    }

    onResize() {
        for (let component of this.components.list) component.onResize?.();
    }
}

let ui;