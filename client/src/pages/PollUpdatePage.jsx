import React from 'react';

import PollUpdate from '../components/PollUpdate';
import ErrorMessage from '../components/ErrorMessage';

const PollPage = ({ match, getPoll, poll }) => {
  getPoll(match.params.id);

  return (
    <div>
      <ErrorMessage />
      <PollUpdate />
    </div>
  );
};

export default PollPage;