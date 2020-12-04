import axios from 'axios';

export function createGame() {
    return axios.post('http://127.0.0.1:5000/create')
}

export function joinGame(key, name) {
    return axios.post('http://192.168.1.11:5000/join', {game_key: key, name: name})
}
