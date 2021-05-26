import React from 'react';
import NextLink from 'next/link';
import format from 'date-fns/format';
import { MdRemoveCircle } from 'react-icons/fa';

import { Box, Link } from '@chakra-ui/layout';
import { Code, IconButton, Switch } from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/skeleton';

import { Table, Tr, Th, Td } from './Table';
import { DeleteIcon } from '@chakra-ui/icons';
import RemoveButton from './RemoveButton';

const FeedbackTable = ({ allFeedback }) => {
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
        {allFeedback.map((feedback) => (
          <Box as="tr" key={feedback.id}>
            <Td>{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{'/'}</Code>
            </Td>
            <Td>
              <Switch
                defaultIsChecked={feedback.status === 'active'}
                size="md"
                colorScheme="green"
              />
            </Td>
            <Td>
              <RemoveButton feedbackId={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
