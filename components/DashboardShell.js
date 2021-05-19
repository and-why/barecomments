import React from 'react';
import {
  Flex,
  Stack,
  Icon,
  Link,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box,
  useRadio
} from '@chakra-ui/react';
import { LogoIcon } from './Icons';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const auth = useAuth();
  return (
    <Box backgroundColor="blackAlpha.50" h="100vh">
      <Flex flexDirection="column" backgroundColor="white" mb={16} w="full">
        <Flex
          justify="space-between"
          align="center"
          backgroundColor="#ffffff"
          maxW="1250px"
          w="full"
          margin="0 auto"
          p={4}
        >
          <Flex spacing={4} isInline justify="center" align="center">
            <LogoIcon boxSize={8} mr={4} />
            <Link mr={4}>Sites</Link>
            <Link>Feedback</Link>
          </Flex>
          <Stack spacing={4} isInline justify="center" align="center">
            <Link>Account</Link>
            <Avatar size="sm" src={auth.user.photoUrl} />
          </Stack>
        </Flex>
        <Flex backgroundColor="blackAlpha.50" justify="center" align="center">
          <Flex
            width="100%"
            minWidth="300px"
            justify="center"
            align="center"
            p={8}
          >
            <Flex
              flexDirection="column"
              justify="center"
              align="flex-start"
              width="100%"
              maxWidth="800px"
            >
              <Breadcrumb mb={2}>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink color="gray.700">Sites</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Heading mb={4}>Sites</Heading>
              {children}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardShell;
