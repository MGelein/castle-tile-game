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

        this.createControlPanel();
    }

    addComponent(button) {
        this.components.add(button);
    }

    removeComponent(button) {
        this.components.remove(button);
    }

    draw() {
        this.components.update();
        for (let component of this.components.list) {
            component.visible = component.visibleRule?.();
            if (component.visible === false) continue;
            component.draw();
        }
    }

    handlePress() {
        for (let component of this.components.list) {
            if (component.components) {
                for (let subcomponent of component.components.list) {
                    if (subcomponent.inBounds?.() && subcomponent.visible !== false) {
                        subcomponent.onClick?.();
                        return true;
                    }
                }
            } else if (component.inBounds?.() && component.visible !== false) {
                component.onClick?.();
                return true;
            }
        }
        return false;
    }

    handleRelease() {
        for (let component of this.components.list) {
            if (component.components) {
                for (let subcomponent of component.components.list) {
                    if (subcomponent.hover) subcomponent.hover = false;
                }
            } else if (component.hover) {
                component.hover = false;
            }
        }
    }

    onResize() {
        for (let component of this.components.list) component.onResize?.();
    }

    createControlPanel() {
        const panel = new Panel(300);
        this.addComponent(panel);

        const waitingLabel = new Label("Waiting for other players...", 8, (TILE_SIZE / 5) * 2);
        waitingLabel.setWidth(300);
        waitingLabel.visibleRule = () => !game?.hasLocalControl;
        panel.addComponent(waitingLabel);

        const placeButton = new Button(PUT_ICON, TILE_SIZE / 2, TILE_SIZE / 3);
        placeButton.onClick = () => {
            game.localPlayer.nextState();
        }
        placeButton.visibleRule = () => game ? game.hasLocalControl : false;
        panel.addComponent(placeButton);

        const rotateCCWButton = new Button(CCW_ICON, TILE_SIZE * 1.5, TILE_SIZE / 3);
        rotateCCWButton.visibleRule = placeButton.visibleRule;
        rotateCCWButton.onClick = () => game.activePlayer?.currentTile?.rotateCCW?.();
        panel.addComponent(rotateCCWButton);

        const rotateCWButton = new Button(CW_ICON, TILE_SIZE * 2.5, TILE_SIZE / 3);
        rotateCWButton.visibleRule = placeButton.visibleRule;
        rotateCWButton.onClick = () => game.activePlayer?.currentTile?.rotateCW?.();
        panel.addComponent(rotateCWButton);
    }
}

let ui;