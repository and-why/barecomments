import React from 'react';
import { Heading, Box, Text } from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';
import { useTheme } from '@/utils/useTheme';

const EmptyState = () => {
  const colorMode = useTheme();
  return (
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
      <Text mb={4}>
        To add your first site and manage your comments, you'll need to upgrade
        your accout.
      </Text>
      <AddSiteModal id={'add-first-site-button'}>
        Add Your First Site
      </AddSiteModal>
    </Box>
  );
};

export default EmptyState;
