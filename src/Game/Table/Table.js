//import React, { useState } from 'react';
import './Table.sass'

export const Table = props => {
  const user = props.user
  const players = props.players

  const cardList = players.map((p, i) => {
    const c = p.card_played
    const backgroundFile = "cards/" + c + ".png"
    const relPos = ((-user.position + 4) + p.position) % 4

    return (
      <img className={`table-card p${relPos} ${c >= 0 ? "played" : ""}`} alt="table-card" key={i.toString()} src={backgroundFile} />
    )
  })

  return (
    <div className="table-container">
      <div className="table">
        {cardList}
      </div>
    </div>
  )
}
