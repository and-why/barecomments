import Head from 'next/head';
import { Button } from '@chakra-ui/button';
import { Flex, Heading } from '@chakra-ui/layout';

import { useAuth } from '@/lib/auth';

import { LogoIcon } from '@/components/Icons';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      w="full"
      h="100vh"
    >
      <Head>
        <title>Bare Comments</title>
      </Head>
      <LogoIcon boxSize={20} mb={4} />
      <Heading mb={4}>Bare Comments</Heading>

      {auth.user ? (
        <Button as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => auth.signinWithGitHub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
}
