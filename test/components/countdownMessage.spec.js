import React from 'react';
import CountdownMessage from '../../client/src/components/countdown_message';

describe('CountdownMessage', () => {
  it('renders Started message', () => {
    const date = new Date();
    const minutes = 0;
    const startAt = new Date(date.getTime() + minutes * 60000);

    const wrapper = shallow(<CountdownMessage endTime={startAt} />);
    expect(wrapper.find('#countdown-time')).to.have.length(1)
    expect(wrapper.contains("Started")).to.equal(true);
  });

});