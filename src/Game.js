import React from 'react';
import io  from 'socket.io-client';
import './Game.css';

const LEFT = 1
const TOP = 2
const RIGHT = 3
//const BOTTOM = 1
//const STAGE_WAITING = 10
//const STAGE_PLAYING = 11

let gGameKey = ""
let gPlayerKey = ""
const socket = io('http://165.22.187.65/');


class Game extends React.Component {
  constructor(props) {
    super(props);
    const player = props.player
    gGameKey = this.props.invite_code
    gPlayerKey = player.key
    this.state = {
      user: player,
      time: new Date().getTime(),
      game_state: {
        players: [null, null, null, null]
      }
    }
  }

  componentDidMount() {
    this.connect()
  }

  connect() {
    const key = this.props.invite_code
    console.log('connecting...');
    socket.emit('join_game', { "game_key": key });


    socket.on('game_state', state => {

      const gs_json = JSON.parse(state).game_state
      const player_turn = gs_json.turn_player === this.state.user.position
      let points = gs_json.players.find(p => p.key === this.state.user.key).tricks_won
      if (!points) {
        points = 0
      }
      this.setState({
        game_state: gs_json,
        player_turn: player_turn,
        points: points
      })
      console.log(gs_json);
    })



    /*
    socket.on("game_state", (game_state) => {
      const gs_json = JSON.parse(game_state).game_state
      //const players = gs_json.players.map((p) => new Player(p.key, p.position, p.name, p.is_host, p.cards))
      console.log("GSON");
      console.log(gs_json);
      this.setState({
        game_state: gs_json
      })

      //game.setPlayers(players)

    });
    */
  }

  render() {
    let player_turn_class = ""
    if (this.state.player_turn) {
      player_turn_class = "player-turn"
    }
    return (
      <div className="game-cont">
        <div className="invite-code">
          Invite code: {this.props.invite_code}
          <br/>
          {this.state.user.name}
        </div>
        <div className="game-area">
          <div className="player left">
            <PlayerComponent player={this.getPlayer(LEFT)} />
          </div>
          <div className="player right">
            <PlayerComponent player={this.getPlayer(RIGHT)} />
          </div>
          <div className="player top">
            <PlayerComponent player={this.getPlayer(TOP)} />
          </div>
          <div className={"player-main " + player_turn_class}>
            <div className="turn-message"> Your Turn </div>
            <div> Points: {this.state.points} </div>
            <MyCardsList state={this.state}></MyCardsList>
          </div>
          <div className="playing-area">
          </div>
        </div>
      </div>
    )
  }

  getPlayer(direction) {
    const position = (this.state.user.position + direction) % 4
    const player = this.state.game_state.players[position]
    return player
  }
}

function OponentCards(props) {
  const cards = props.cards
  if (cards != null) {
    const cardItems = cards.sort((a,b) => a - b).map((card) => {
      const backgroundFile = "cards/" + card + ".png"

      return (
        <img className="op-card" alt="card" key={card.toString()} src={backgroundFile} />
      )
    })
    return (
      <div className="op-container">
        <div className="op-card-list">{cardItems}</div>
      </div>
    )
  } else {
    return ("")
  }
}

function PlayerComponent(props) {
    if (props.player != null) {
      let backgroundFile = "cards/" + props.player.card_played + ".png"
      return (
        <div>
          <div className="player-spot"> {props.player.name} </div>
          <OponentCards cards={props.player.cards} />
          <img className="op-card-played" alt={backgroundFile} key={backgroundFile} src={backgroundFile} />
        </div>
      )
    } else {
      return (
        <div className="player-spot free">Open</div>
      )
    }
}

function playCard(card) {
  console.log("playing card " + card);
  socket.emit('play_card', {
    "game_key": gGameKey,
    "player_key": gPlayerKey,
    "card_played": card
    });
}



class MyCardsList extends React.Component {
  render() {
    //console.log(this.props.state);
    const user = this.props.state.game_state.players.filter(p => p).find(p => p.key === this.props.state.user.key);
    if (user && user !== undefined) {
      const cardItems = user.cards.sort((a,b) => a - b).map((card) => {
        let backgroundFile = "cards/" + card + ".png"
        backgroundFile = "cards/back.svg"
        backgroundFile = "cards/back2.jpg"
        backgroundFile = "cards/" + card + ".png"

        return (
          <img className="my-card" alt="card" key={card.toString()} src={backgroundFile} onClick={() => playCard(card)}/>
        )}
      );

      return (
        <div className="container">
          <div className="card-list">{cardItems}</div>
        </div>
      )
    } else {
      return ("")
    }
  }


}

/*
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
*/
export default Game;
