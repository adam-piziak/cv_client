export class GameState {
  constructor() {
    this.key = ""
    this.players = [null, null, null, null]
  }

  setGameKey(key) {
    this.key = key
  }

  getGameKey() {
    return this.key
  }

  setPlayer(player) {
    this.players[player.position] = player
  }

  setPlayers(players) {
    for (const p of players) {
      this.setPlayer(p)
    }
  }

  getPlayers() {
    return this.players
  }
}

export class Player {
  constructor(key, position, name, is_host, cards) {
    this.key = key
    this.is_host = is_host
    this.position = position
    this.name = name
    this.cards = cards
  }

  getPosition() {
    return this.position
  }
}
