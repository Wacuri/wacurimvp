import React from 'react';
import EventMessage from '../../client/src/components/event_message';

describe('EventMessage', () => {
  it('renders a message', () => {
    const journeys = [
      {room:'1234'}
    ]
    const wrapper = shallow(<EventMessage journeys={journeys} />);
    expect(wrapper.text()).to.equal("A journey space has been created.Join  Share");
  });

});