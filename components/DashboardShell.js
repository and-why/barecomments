import React from 'react';
import {
  Flex,
  Stack,
  Link,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box,
  Button
} from '@chakra-ui/react';
import { LogoIcon } from './Icons';
import { useAuth } from '@/lib/auth';
import AddSiteModal from './AddSiteModal';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();
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
          <Flex spacing={4} justify="center" align="center">
            <LogoIcon boxSize={8} mr={4} />
            <Link mr={4}>Sites</Link>
            <Link>Feedback</Link>
          </Flex>
          <Flex spacing={4} justify="center" align="center">
            {user && (
              <Link mr={4} onClick={() => signout()}>
                Log Out
              </Link>
            )}
            <Avatar size="sm" src={user?.photoUrl} />
          </Flex>
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
              <Flex justify="space-between" w="100%">
                <Heading mb={4}>Sites</Heading>
                <AddSiteModal>+ Add Site</AddSiteModal>
              </Flex>
              {children}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardShell;
