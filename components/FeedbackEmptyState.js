import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

import DashboardShell from './DashboardShell';

const FeedbackEmptyState = () => (
  <Box
    width="100%"
    backgroundColor="white"
    maxWidth="800px"
    p={16}
    borderRadius={8}
    align="center"
  >
    <Heading size="md" as="h2" mb={2}>
      There isn't feedback for this site yet
    </Heading>
    <Text>Share your site!</Text>
  </Box>
);

export default FeedbackEmptyState;
