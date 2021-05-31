import React, { useState } from 'react';
import { Heading, Box, Button, Text } from '@chakra-ui/react';
import { createCheckoutSession } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const UpgradeEmptyState = () => {
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);
  const { user } = useAuth();
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
        Get feedback on your own site instantly
      </Heading>
      <Text mb={4}>
        Welcome! You are currently on a starter account, which means you can add
        feedback but not create any sites. Update your account to add your first
        site.
      </Text>
      <Button
        isLoading={isCheckoutLoading}
        colorScheme="orange"
        onClick={() => {
          setCheckoutLoading(true);
          createCheckoutSession(user.uid);
        }}
      >
        Upgrade your account
      </Button>
    </Box>
  );
};

export default UpgradeEmptyState;
