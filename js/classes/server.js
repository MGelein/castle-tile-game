const CREATE = 'c';
const JOIN = 'j';

class Server {

    localName;
    db;
    players;
    lobby;
    lobbyOwner;
    playerNames;
    gameId;

    constructor() {
        const gun = Gun(['https://trb1914-gun.herokuapp.com/gun']);
        this.db = gun.get('trb1914').get('castle-tile-game');
    }

    setLobby(name, action) {
        this.playerNames = [];
        this.lobby = this.db.get('lobbies').get(name);
        this.players = this.lobby.get('players');
        if (action === CREATE) {
            this.players.put('[]');
            this.lobby.get('owner').put('');
            this.lobby.get('gameId').put('');
        }

        this.players.on((data) => this.onPlayerListUpdate(JSON.parse(data)));
        this.lobby.get('owner').on((data) => this.lobbyOwner = data);
        this.lobby.get('gameId').on((data) => this.onGameId(data));
    }

    onGameId(id) {
        if (!id || id.length < 10) return;
        // We have an ID for the game, now all connect to it
    }

    setLobbyOwner(name) {
        this.lobby.get('owner').put(name);
    }

    onPlayerListUpdate(list) {
        this.playerNames = list.filter(p => p);

        const startButton = document.querySelector('#startButton');
        if (this.localName === this.lobbyOwner) {
            startButton.className = this.playerNames.length < 2 ? 'disabled' : ''
        } else {
            startButton.className = 'hidden';
        }
        const ul = document.querySelector('#playerList');
        const playerItems = this.playerNames.map(name => `<li>${name}</li>`);
        ul.innerHTML = playerItems.join('');
    }

    addLocalPlayer(name) {
        this.localName = name;
        if (this.playerNames.indexOf(name) > -1) return false;

        const uniqueNames = [name];
        for (let name of this.playerNames) {
            if (uniqueNames.indexOf(name) === -1) {
                uniqueNames.push(name);
            }
        }
        this.players.put(JSON.stringify(uniqueNames));
    }

    createGame() {
        this.gameId = `${Date.now()}-${Math.random()}`.replace(/[^0-9-]/g, '');
        this.lobby.get('gameId').put(this.gameId);
    }
}

const server = new Server();