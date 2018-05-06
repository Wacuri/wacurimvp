import { store } from 'react-easy-state'

export default store({
  ...(global.__INITIAL_STATE__ || {}),
  session: null,
  journeys: [],
});
