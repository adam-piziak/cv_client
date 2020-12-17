import React from 'react';
import './App.sass';
import './Global.sass';
import {createGame, joinGame} from './api';
import Game from './Game/Game'
import {Game2} from './Game/Game2'
import { GameCreator } from './GameCreator'

const PG_HOME = 0
const PG_CREATE = 1
const PG_GAME = 2
const PG_JOIN = 3

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PG_HOME,
      key: "",
      name: "",
      is_host: false,
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    if (this.state.page === PG_HOME) {
      return (
          <div className="home">
            <div className="home-container">
              <h1>DRL Bridge</h1>
              <button className="primary" onClick={() => this.goToCreatePG()}>Create Game</button>
              <button className="" onClick={() => this.goToJoinPG()}>Join</button>
            </div>
          </div>
      );
    }

    if (this.state.page === PG_CREATE) {
      return (
        <div className="App">
          <GameCreator create={this.createGame.bind(this)}/>
        </div>
      );
    }

    if (this.state.page === PG_GAME) {
      return (
        <Game2 gameKey={this.state.key} user={this.state.player} />
      );
    }

    if (this.state.page === PG_JOIN) {
      return (
        <div className="join-container">
            <input placeholder="Name" type="text" id="name_field" className="nes-input" name={this.state.name} onChange={this.handleChangeName}/>
            <input placeholder="Invite Code" type="text" id="key_field" className="nes-input" value={this.state.value} onChange={this.handleChange}/>
          <button type="button" className="nes-btn is-primary" onClick={this.handleSubmit}>Join</button>
        </div>
      );
    }
  }

  goToJoinPG() {
    this.setState((state) => {
      return {page: PG_JOIN}
    })
  }

  goToCreatePG() {
    this.setState((state) => {
      return {page: PG_CREATE}
    })
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    joinGame(this.state.value, this.state.name).then((res) => {
      let player_json = JSON.parse(res.data.player)
      let player = player_json.player
      this.setState((state) => {
        return {page: PG_GAME, key: this.state.value, player}
      })
    }).catch((err) => {console.error(err);})

  }

  createGame(gameParams) {
    createGame(gameParams[0], gameParams[1]).then(res => {
      let player_json = JSON.parse(res.data.player)
      let player = player_json.player
      this.setState({ page: PG_GAME, key: res.data.key, player})

    }).catch((err) => {
      this.setState((state) => {
        return { page: PG_HOME }
      })
    })

  }

}




export default App;
