import IGame from "../typing/game"

class Storage {
    storageItemName = "games"

    getGame = (id: string): IGame => this.readLocalStorage().filter(game => game.id === id)[0]

    getGames = (): Array<IGame> => this.readLocalStorage().sort((a, b) => a.created_at < b.created_at ? 1 : -1)

    createGame = (new_board: IGame) =>
        localStorage.setItem(this.storageItemName, JSON.stringify(this.readLocalStorage().concat(new_board)))

    deleteGame = (id: string) =>
        localStorage.setItem(this.storageItemName, JSON.stringify(this.readLocalStorage().filter(game => game.id !== id)))
    
    readLocalStorage = (): Array<IGame> => {
        const boards = localStorage.getItem(this.storageItemName)
        return boards ? JSON.parse(boards) : []
    }

    generateUUID = (): string => {
        const crypto = require("crypto");
        
        let uuid = ''

        while (true) {
            uuid = crypto.randomBytes(5).toString('hex');
            if (!this.getGame(uuid))
                break
        }

        return uuid
    }
}

export default Storage;
