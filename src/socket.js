import io  from 'socket.io-client';
const socket = io('http://127.0.0.1:5000/');

export function subscribeToState(cb) {
  socket.on('game_state', state => {
    const gs_json = JSON.parse(state).game_state
    cb(gs_json);
  })
}

export function joinGame(key) {
  console.log('connecting...');
  socket.on('connect', () => {
    console.log("CONNECTED");
    socket.emit('join_game', { "game_key": key });
  });
}
