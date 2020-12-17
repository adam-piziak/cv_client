import React from 'react';
//import io  from 'socket.io-client';
import './Game.css';
import './Game.sass'
import { Player } from './Player/Player'
import { Table } from './Table/Table'
import {socket} from '../socket'


let gGameKey = ""
//let gPlayerKey = ""


//let started = false
class Game extends React.Component {
  constructor(props) {
    super(props);
    const player = props.player
    gGameKey = this.props.invite_code
    //gPlayerKey = player.key
    this.state = {
      user: player,
      time: new Date().getTime(),
      visible: false,
      game: {
        key: gGameKey,
        players: [],
        round_cards: []
      }
    }
  }

  componentDidMount() {
    this.connect()
  }

  connect() {
    const key = this.props.invite_code
    socket.emit('join_game', { "game_key": key });


    socket.on('game_state', state => {

      const gs_json = JSON.parse(state).game_state
      const player_turn = gs_json.turn_player === this.state.user.position
      this.setState({
        game: gs_json,
        player_turn: player_turn
      })
    })

    socket.on('winner', key => {
      if (this.state.user.key === key) {
        alert(":D");
      } else {
        alert(":(");
      }
    })
  }

  toggleVisibility() {
    this.setState((state) => {
      return {visible: !state.visible}
    })
  }

  render() {
    const game = this.state.game
    const user = this.state.game.players.find(p => p.key === this.state.user.key)
    const playersComponents = game.players.map((p) =>
        <Player user={user}
                player={p}
                visible={this.state.visible}
                turn={game.turn}
                game={this.state.game} />
      )
    return (
      <div className="game">
        <div className="game-info">
          { this.props.invite_code}
          <br />
          SUIT: { suitName(game.trump_suit)}
          <br />
          Contract: { this.state.game.contract_number }
        </div>
        { playersComponents }
        <Table user={user} players={game.players} cards={game.round_cards} turn={game.turn} />
        <div className="game-actions">
          <button className="action-restart" onClick={() => start(game.key)}>Start</button>
          <button className="action-restart" onClick={() => redeal(game.key)}>Deal</button>
          <button className="action-restart" onClick={() => this.toggleVisibility()}>Toggle Visibility</button>
        </div>
      </div>
    )
  }
}

function redeal(key) {
  socket.emit('redeal', { "key": key });
}

function start(key) {
  socket.emit('start', { "key": key });
}

function suitName(val) {
  switch(val) {
      case 0: return "clubs";
      case 1: return "diamonds";
      case 2: return "hearts";
      case 3: return "spades";
      default: return "?";
  }
}

export default Game;
