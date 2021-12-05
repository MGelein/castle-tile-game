const CREATE = 'c';
const JOIN = 'j';

class Server {

    localName;
    db;
    players;
    lobby;
    createdLobby = false;
    playerNames;
    gameId;
    game;
    board;

    constructor() {
        const gun = Gun(['https://trb1914-gun.herokuapp.com/gun']);
        this.db = gun.get('trb1914').get('castle-tile-game');
    }

    setLobby(name, playerName) {
        this.localName = playerName;
        this.playerNames = [];
        this.lobby = this.db.get('lobbies').get(name);
        this.lobby.get('active').once((data) => this.foundLobby(data));
    }

    foundLobby(active) {
        this.players = this.lobby.get('players');
        this.createdLobby = !active;

        if (this.createdLobby) {
            this.players.put('[]');
            this.lobby.get('owner').put(this.localName);
            this.lobby.get('gameId').put('');
            this.lobby.get('active').put(true);
        }

        this.players.on((data) => this.onPlayerListUpdate(JSON.parse(data)));
        this.lobby.get('gameId').on(data => this.onGameId(data));
    }

    onGameId(id) {
        if (!id || id.length < 10) return;
        if (this.playerNames.length < 2) return;
        // We have an ID for the game, now all connect to it
        console.log('joining game: ', id);
        this.gameId = this.gameId ?? id;
        this.game = this.game ?? this.db.get(`game${this.gameId}`);
        this.board = this.board ?? this.game.get('board');

        this.board.map().on((data) => this.onTile(data));

        document.querySelector('.div-overlay').remove();
    }

    onTile({ x, y, tile, rotation }) {
        map.set(x, y, new Tile(tile, rotation));
    }

    setTile(x, y, tile, rotation) {
        if (this.board) this.board.set({ x, y, tile, rotation });
    }

    onPlayerListUpdate(list) {
        if (!list) return;
        this.playerNames = list.filter(p => p);

        const startButton = document.querySelector('#startButton');
        startButton.className = this.playerNames.length < 2 ? 'disabled' : ''
        const ul = document.querySelector('#playerList');
        const playerItems = this.playerNames.map(name => `<li>${name}</li>`);
        ul.innerHTML = playerItems.join('');

        if (this.playerNames.indexOf(this.localName) < 0) this.addLocalPlayer();
    }

    addLocalPlayer() {
        const name = this.localName;
        if (this.playerNames.indexOf(name) > -1) return false;

        const uniqueNames = [name];
        for (let name of this.playerNames) {
            if (uniqueNames.indexOf(name) === -1) {
                uniqueNames.push(name);
            }
        }
        this.playerNames = [...uniqueNames];
        this.players.put(JSON.stringify(uniqueNames));
    }

    createGame() {
        this.gameId = `${Date.now()}-${Math.random()}`.replace(/[^0-9-]/g, '');
        this.lobby.get('gameId').put(this.gameId);
        this.lobby.get('active').put(false);
        this.players.put(null);
        this.lobby.get('owner').put(null);
    }
}

// const DEFAULT_ID = '1638736230906-02699196665003689';
const DEFAULT_ID = false;

function findLobby() {
    if (!DEFAULT_ID) {
        const playerName = prompt('Please provide your playername');
        if (!playerName) window.location.reload();

        const lobbyName = prompt("Please enter name of lobby you want to connect to:");
        if (!lobbyName) window.location.reload();
        server.setLobby(lobbyName, playerName);

    } else {
        server.onGameId(DEFAULT_ID);
    }
}

const server = new Server();