import Head from 'next/head';
import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('bare-comments-auth')) {
            window.location.href = "/dashboard"
          }
        `
          }}
        />
      </Head>
      <Flex maxWidth="400px" direction="column" align="center" justify="center">
        <LogoIcon boxSize={20} mb={4} />

        {auth.user ? (
          <Button as="a" href="/dashboard" colorScheme="orange">
            View Dashboard
          </Button>
        ) : (
          <Flex
            maxWidth="100%"
            direction="column"
            align="center"
            justify="center"
          >
            <Text mb={4} w="100%">
              <strong>Bare Comments</strong> makes it easy for you to add
              comments or reviews to your static site. It is still a work in
              progress, but feel free to sign up and give it a try. Sign up,
              sign in or register below.
            </Text>
            <Button
              colorScheme="orange"
              mt={4}
              onClick={(e) => auth.signinWithGitHub()}
            >
              Sign In
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
