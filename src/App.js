import React from 'react';
import './App.css';
import {createGame, joinGame} from './api';
import Game from './Game'

const PG_HOME = 0
const PG_CREATING = 1
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
            <div className="App">
              <div className="home-wrapper">
                <h1>Bridge Client</h1>
                <button className="home-btn nes-btn is-primary" onClick={() => this.createGame()}>Create Game</button>
                <button className="home-btn nes-btn" onClick={() => this.goToJoinPG()}>Join</button>
              </div>
            </div>
      );
    }

    if (this.state.page === PG_CREATING) {
      return (
        <div className="create-lobby-page">
          <b>Creating Game...</b>
        </div>
      );
    }

    if (this.state.page === PG_GAME) {
      return (
        <Game invite_code={this.state.key} player={this.state.player}></Game>
      );
    }

    if (this.state.page === PG_JOIN) {
      return (
        <div className="join-container">
          <div className="nes-field">
            <label>Name</label>
            <input type="text" id="name_field" className="nes-input" name={this.state.name} onChange={this.handleChangeName}/>
          </div>
          <div className="nes-field">
            <label>Invite Code</label>
            <input type="text" id="key_field" className="nes-input" value={this.state.value} onChange={this.handleChange}/>
          </div>
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

  createGame() {
    this.setState((state) => {
      return {page: PG_CREATING}
    })
    createGame().then((res) => {
      let player_json = JSON.parse(res.data.player)
      let player = player_json.player
      this.setState((state) => {
        return { page: PG_GAME, key: res.data.key, player}
      })

    }).catch((err) => {
      console.log(err);
      setTimeout(function () {
        this.setState((state) => {
          return {page: PG_HOME}
        })
      }.bind(this), 500);
    })
  }

}




export default App;
