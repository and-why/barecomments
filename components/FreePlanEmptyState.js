import React from 'react';
import { Heading, Box, Button, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import DashboardShell from './DashboardShell';

const FreePlanEmptyState = (props) => (
  <DashboardShell>
    <Box
      width="100%"
      backgroundColor="white"
      maxWidth="800px"
      p={8}
      borderRadius={8}
      align="center"
    >
      <Heading size="md" as="h2" mb={2}>
        Get feedback on your site instantly
      </Heading>
      <Text mb={4}>Start today, then grow with us </Text>
      <Button variant="solid" size="md">
        Upgrade to Starter
      </Button>
    </Box>
  </DashboardShell>
);

export default FreePlanEmptyState;
