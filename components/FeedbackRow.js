import React, { useState } from 'react';
import { Box } from '@chakra-ui/layout';
import { Code, Switch } from '@chakra-ui/react';

import { Td } from './Table';
import RemoveButton from './RemoveButton';
import { updateFeedback } from '@/lib/db';

const FeedbackRow = ({ id, author, text, route, status }) => {
  const [checked, setChecked] = useState(status === 'active');
  const toggleFeedback = () => {
    setChecked(!checked);
    updateFeedback(id, { status: !checked ? 'active' : 'pending' });
  };
  return (
    <Box as="tr">
      <Td>{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || '/'}</Code>
      </Td>
      <Td>
        <Switch
          isChecked={checked}
          size="md"
          onChange={toggleFeedback}
          colorScheme="green"
        />
      </Td>
      <Td>
        <RemoveButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
