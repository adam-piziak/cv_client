import axios from 'axios';

export function createGame() {
    return axios.post('http://165.22.187.65/create')
}

export function joinGame(key, name) {
    return axios.post('http://165.22.187.65/join', {game_key: key, name: name})
}
