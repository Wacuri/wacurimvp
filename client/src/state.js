import { store } from 'react-easy-state'

const state =  store({
  session: null,
  sessionId: null,
  journeys: [],
  joinableJourneys: [],
  loggedIn: false,
  user: null,
  location: '/',
  ...(global.__INITIAL_STATE__ || {})
});

export default state;
