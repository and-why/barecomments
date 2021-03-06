import React from 'react';
import NextLink from 'next/link';
import { Button, Flex, Link } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { LogoIcon } from './Icons';

const Navbar = ({ children }) => {
  const { user } = useAuth();

  return (
    <Flex backgroundColor="white" mb={4} w="full" borderTop="5px solid #dd6b20">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        pt={[4, 8]}
        pb={[4, 8]}
        maxW="950px"
        margin="0 auto"
        w="full"
        px={8}
        h="60px"
      >
        <Flex align="center">
          <NextLink href="/" passHref>
            <Link>
              <LogoIcon fontSize={40} my={4} />
            </Link>
          </NextLink>
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <NextLink href="/pricing" passHref>
            <Link mr={4} fontWeight="medium">
              Pricing
            </Link>
          </NextLink>
          <NextLink href="/login" passHref>
            <Button
              backgroundColor="gray.900"
              color="white"
              h="32px"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
            >
              Login
            </Button>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
