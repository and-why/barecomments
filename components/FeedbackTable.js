import React, { useState } from 'react';

import { Table, Tr, Th, Td } from './Table';
import FeedbackRow from './FeedbackRow';

const FeedbackTable = (props) => {
  return (
    <Table w="100%">
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {props.feedback.map((feedback) => (
          <FeedbackRow {...feedback} key={feedback.id} />
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
