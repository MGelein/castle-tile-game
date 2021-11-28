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
        switch (this.state) {
            case PLAYING:

                break;
            case DONE:
            case WAITING:
            default:
                break;
        }
    }

    nextPlayer() {
        console.log("NEXT");
        let activePlayerIndex = this.players.indexOf(this.activePlayer);
        activePlayerIndex++;

        if (activePlayerIndex >= this.players.length) {
            this.round++;
            activePlayerIndex -= this.players.length;
        }

        this.activePlayer = this.players[activePlayerIndex];
        this.hasLocalControl = this.activePlayer === this.localPlayer;
    }

    start(...players) {
        if (players.length < 1) throw Error('Cannot start game with no players');

        deck.shuffle();
        this.players = players;
        this.state = PLAYING;
        this.round = 0;
        this.activePlayer = this.players[0];
        this.hasLocalControl = this.activePlayer === this.localPlayer;
    }
}

let game;