import React, { useState, useEffect } from 'react'
import { socket } from 'socket'
import { suitName } from 'utils'
import { Player } from './Player/Player'
import { Table } from './Table/Table'
import './Game.sass'

export const Game2 = (props) => {
  const user = props.user
  const key = props.gameKey

  const [game, setGame] = useState({
    players: [],
    round_cards: [],
    turn: -1
  })
  const [visible, setVisibility] = useState(false)


  useEffect(() => {
    console.log("Hola");
    socket.emit('join_game', { "game_key": key });
    socket.on("game_state", raw => {
      const gs = JSON.parse(raw).game_state
      setGame(gs)
      console.log("setting");
    })
  }, [])


  return (
    <div className="game">
      <Info game={game} />
      <Table user={user} players={game.players}/>
      <Players user={user} game={game} visible={visible}/>
      <Actions gkey={key} vis={visible} setVis={setVisibility} />
    </div>
  )
}

const Players = props => {
  const game = props.game
  const user = props.user
  const visible = props.visible

  const players = game.players.map((p, i) =>
    <Player user={user}
            key={i.toString()}
            player={p}
            visible={visible}
            game={game} />
        )

  return (
    <React.Fragment>
      { players }
    </React.Fragment>
  )
}

const Actions = ({ gkey, vis, setVis }) => {
  const start = () => socket.emit('start', { "key": gkey })
  const redeal = () => socket.emit('redeal', { "key": gkey })
  const toggleVisibility = () => setVis(!vis)

  return (
    <div className="game-actions">
      <button className="game-action" onClick={() => start()}>Start</button>
      <button className="game-action" onClick={() => redeal()}>Deal</button>
      <button className="game-action" onClick={() => toggleVisibility()}>Toggle Visibility</button>
    </div>
  )
}

const Info = props => {
  const game = props.game
  const trump = suitName(game.trump_suit)
  const contract = game.contract_number

  return (
    <div className="game-info">
      <div className="game-key"> Invite Code: { game.key }</div>
      <div className="game-trump">Trump: { trump.toUpperCase() }</div>
      <div className="game-contract">Contract: { contract } | { contract + 6 }</div>
    </div>
  )
}
