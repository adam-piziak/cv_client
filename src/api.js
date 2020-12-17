import axios from 'axios';


export function createGame(hostName, playerTypes) {
    return axios.post('https://adampiziak.com/create', {
      host: hostName,
      players: playerTypes
    })
}

export function joinGame(key, name) {
    return axios.post('https://adampiziak.com/join', {game_key: key, name: name})
}

/*
export function createGame() {
    return axios.post('http://127.0.0.1:5000/create')
}

export function joinGame(key, name) {
    return axios.post('http://127.0.0.1:5000/join', {game_key: key, name: name})
}
*/
