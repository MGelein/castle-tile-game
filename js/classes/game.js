const PLAYING = "playing";
const WAITING = "waiting";
const DONE = "done";

class Game {

    localPlayer = null;
    hasLocalControl = false;

    round = 0;
    activePlayer = null;
    players = [];
    state = WAITING;


    constructor(localPlayer) {
        this.localPlayer = localPlayer;
    }

    update() {
        if (game.activePlayer) game.activePlayer.update();
    }

    isLocalTurn() {
        return this.activePlayer === this.localPlayer;
    }

    setActivePlayer(name) {
        if (this.activePlayer.name === name) return;
        const player = this.players.find(p => p.name === name);
        this.activePlayer = player;
        this.hasLocalControl = this.activePlayer === this.localPlayer;
        if (this.hasLocalControl) this.activePlayer.drawTile();
    }

    nextPlayer() {
        if (!deck.hasTiles()) {
            this.state = DONE;
            this.activePlayer = null;
            this.hasLocalControl = false;
            return;
        }

        let activePlayerIndex = this.players.indexOf(this.activePlayer);
        activePlayerIndex++;

        if (activePlayerIndex >= this.players.length) {
            this.round++;
            activePlayerIndex -= this.players.length;
        }

        this.activePlayer = this.players[activePlayerIndex];
        server.setActivePlayer(this.activePlayer.name);
        this.hasLocalControl = this.activePlayer === this.localPlayer;
        if (this.hasLocalControl) this.activePlayer.drawTile();
    }

    start(...players) {
        if (players.length < 1) throw Error('Cannot start game with no players');

        deck.shuffle();
        this.players = players;
        this.state = PLAYING;
        this.round = 0;
        this.activePlayer = this.players[0];
        this.hasLocalControl = this.activePlayer === this.localPlayer;
        if (this.hasLocalControl) this.activePlayer.drawTile();
        server.setActivePlayer(this.activePlayer.name);
    }
}

let game;