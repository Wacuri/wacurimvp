import { store } from 'react-easy-state'

const state =  store({
  session: null,
  sessionId: null,
  journeys: [],
  joinableJourneys: [],
  loggedIn: false,
  user: null,
  location: '/',
  audioTag: __CLIENT__ ? new Audio('/journeys/Journey to The Magnetic Field of the Earth+Music.mp3') : null,
  ...(global.__INITIAL_STATE__ || {})
});

export default state;
