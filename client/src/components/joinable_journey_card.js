export default class JoinableJourneyCard extends Component {

  onJoin = (e) => {
    e.preventDefault();
    fetch(`/api/journeys/${this.props.journey._id}/rsvp`, {
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    });
  }

  render() {
    const {journey} = this.props;
    const currentUserHasRSVP = (journey.rsvps || []).find(rsvp => rsvp.user === state.sessionId) != null;

    return (
      <div className='joinable-journey-card'>
        <div className='image'>
          <img src={journey.image}/>
        </div>
        <div className='content'>
        <CountdownMessage endTime={journey.startAt} />
          <h4>{journey.name}</h4>
          <p>Starts at: {moment(journey.startAt).format('LT')}</p>
          <p>{journey.rsvps.length} / 3</p>
          { journey.rsvps.length < 3 && !currentUserHasRSVP &&
            <a href={`/${journey.room}`} onClick={this.onJoin} className='btn btn-primary'>Join</a>
          }
          { currentUserHasRSVP &&
            <Link to={`/${journey.room}`} className='btn btn-primary'>Go there now</Link>
          }
        </div>
      </div>
    )
  }
}
