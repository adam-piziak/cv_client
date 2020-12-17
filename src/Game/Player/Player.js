//import React, { useState } from 'react';
import {socket} from '../../socket'
import './Player.sass'

export const Player = props => {
  const game = props.game
  const user = props.user
  const player = props.player

  // position relative to user
  const bearing = ((-user.position + 4) + player.position) % 4
  const bearingName = `p${bearing}`


  // visible
  // Player turn
  // Winner
  // Can be controlled by user
  const visible = (player.dummy) ||
                (player.position === user.position) ||
                (user.dummy && player.declarer) || props.visible
  const turn = player.position === game.turn
  const winner = (player.position === game.lead) && turn
  const controllable = ((player.position === user.position) ||
                     (user.declarer &&
                      player.position === ((user.position + 2) % 4 )))



  return (
    <div className={`player ${bearingName} ${controllable ? "controllable" : ""} ${turn ? "player-turn" : ""} ${winner ? "winner" : ""}`}>
      <PlayerHeader player={ player }/>
      <Hand player={player} gkey={game.key} controllable={controllable} visible={visible}/>
    </div>
  )
}

const Hand = ({ player,
                gkey,
                controllable,
                visible}) => {
  const play = (c) => {
    socket.emit("play_card", {
                       "player_key": player.key,
                       "game_key": gkey,
                       "card_played": c
                     })
                     console.log('hey');
                   }

  const cards = player.cards.sort((a,b) => a - b).map((c, i) => {
    let backgroundFile = "cards/back2.jpg"
    if (visible) {
      backgroundFile = "cards/" + c + ".png"
    }
    if (controllable) {
      return (
        <img className={`player-card ${visible ? "visible" : ""}`} alt="card" key={i.toString()} src={backgroundFile} onClick={() => play(c)}/>
      )
    } else {
      return (
        <img className={`player-card ${visible ? "visible" : ""}`} alt="card" key={i.toString()} src={backgroundFile} />
      )
    }
  })
  return (
    <div className="player-hand">
      { cards }
    </div>
  )
}


const PlayerHeader = ({ player }) => {
  return (
    <div className="player-header">
      <div className="player-points"> { player.points } </div>
      <div className="player-info">
        <span className="player-name"> {player.name} </span>
        { player.dummy && <span className="dummy"> Dummy</span> }
        { player.declarer && <span className="declarer"> Declarer</span> }
      </div>
    </div>
  )
}
