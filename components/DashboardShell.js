import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Flex,
  Link,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box
} from '@chakra-ui/react';
import { LogoIcon } from './Icons';
import { useAuth } from '@/lib/auth';
import AddSiteModal from './AddSiteModal';
import { NextSeo } from 'next-seo';
import Footer from './Footer';

const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();
  const router = useRouter();
  const path = router.pathname;
  let name = path.charAt(1).toUpperCase() + path.slice(2);
  if (name.indexOf('/') > -1) {
    name = name.split('/')[0];
  }
  const url = `https://barecomments.vercel.app${path}`;
  return (
    <>
      <NextSeo title={`${name} | Bare Comments`} canonical={url} />
      <Box
        backgroundColor="blackAlpha.50"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
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
              <NextLink href="/" as={`/`} passHref>
                <Link>
                  <LogoIcon boxSize={8} mr={4} />
                </Link>
              </NextLink>
              <NextLink href="/sites" as={`/sites`} passHref>
                <Link mr={4} id="nav-sites-link" fontWeight="medium">
                  Sites
                </Link>
              </NextLink>
              <NextLink href="/feedback" as={`/feedback`} passHref>
                <Link id="nav-feedback-link" fontWeight="medium">
                  Feedback
                </Link>
              </NextLink>
            </Flex>
            <Flex spacing={4} justify="center" align="center">
              {user && (
                <NextLink href="/account" as={`/account`} passHref>
                  <Link mr={4} id="account-button" fontWeight="medium">
                    Account
                  </Link>
                </NextLink>
              )}
              {user && (
                <NextLink href="/account" as={`/account`} passHref>
                  <Link mr={4} id="account-avatar-button">
                    <Avatar size="sm" src={user?.photoUrl} />
                  </Link>
                </NextLink>
              )}
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
                {children}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Footer />
      </Box>
    </>
  );
};

export default DashboardShell;
