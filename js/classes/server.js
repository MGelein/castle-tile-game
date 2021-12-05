const CREATE = 'c';
const JOIN = 'j';

class Server {

    localName;
    db;
    players;
    lobby;
    lobbyOwner;
    createdLobby = false;
    playerNames;
    gameId;

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
            console.log('Found lobby was not active, taking control...');
        }

        this.players.on((data) => this.onPlayerListUpdate(JSON.parse(data)));
        this.lobby.get('owner').on((data) => this.lobbyOwner = data);
        this.lobby.get('gameId').on((data) => this.onGameId(data));
    }

    onGameId(id) {
        if (!id || id.length < 10) return;
        // We have an ID for the game, now all connect to it
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
        this.players.put(JSON.stringify(uniqueNames));
    }

    createGame() {
        this.gameId = `${Date.now()}-${Math.random()}`.replace(/[^0-9-]/g, '');
        this.lobby.get('gameId').put(this.gameId);
        this.lobby.get('active').put(false);
    }
}

function findLobby() {
    const playerName = prompt('Please provide your playername');
    if (!playerName) window.location.reload();

    const lobbyName = prompt("Please enter name of lobby you want to connect to:");
    if (!lobbyName) window.location.reload();
    server.setLobby(lobbyName, playerName);
}

const server = new Server();