import { store } from 'react-easy-state'

export default store({
  session: null,
  journeys: [],
  joinableJourneys: [],
  loggedIn: false,
  user: null,
  location: '/',
  ...(global.__INITIAL_STATE__ || {})
});
