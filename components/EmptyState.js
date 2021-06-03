import React from 'react';
import { Heading, Box, Button, Text } from '@chakra-ui/react';
import DashboardShell from './DashboardShell';
import AddSiteModal from './AddSiteModal';

const EmptyState = () => (
  <Box
    width="100%"
    backgroundColor="white"
    maxWidth="800px"
    p={16}
    borderRadius={8}
    align="center"
  >
    <Heading size="md" as="h2" mb={2}>
      You haven't added any sites yet
    </Heading>
    <Text mb={4}>Welcome! Let's get started.</Text>
    <AddSiteModal id={'add-first-site-button'}>
      Add Your First Site
    </AddSiteModal>
  </Box>
);

export default EmptyState;
