import Head from 'next/head';

import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';

import { GithubIcon, GoogleIcon, LogoIcon } from '@/components/Icons';
import EmptyState from '@/components/EmptyState';
import FeedbackLink from '@/components/FeedbackLink';
import { useAuth } from '@/lib/auth';
import { getAllFeedback } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
const SITE_ID = 'o3zgMIVRyjpjABzSIQG0';

export default function Home({ allFeedback }) {
  const auth = useAuth();
  return (
    <Flex
      backgroundColor="blackAlpha.50"
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
            window.location.href = "/sites"
          }
        `
          }}
        />
      </Head>
      <Flex maxWidth="600px" direction="column" align="center" justify="center">
        <LogoIcon boxSize={20} mb={4} />
        {auth.user ? (
          <Button
            as="a"
            href="/sites"
            colorScheme="orange"
            _active={{ transform: 'scale(0.95)' }}
          >
            View Dashboard
          </Button>
        ) : (
          <Flex
            maxWidth="100%"
            direction="column"
            align="center"
            justify="center"
            mb={8}
          >
            <Text mb={8} w="100%" p={4}>
              <strong>Bare Comments</strong> makes it easy for you to add
              comments or reviews to your static site. It is still a work in
              progress, but feel free to sign up and give it a try. Sign up,
              sign in or register below.
            </Text>
            <Flex direction="column">
              <Button
                leftIcon={<GithubIcon fill="black" fontSize="20px" />}
                colorScheme="blackAlpha"
                color="black"
                m={2}
                onClick={(e) => auth.signinWithGitHub()}
                _active={{ transform: 'scale(0.95)' }}
              >
                Sign In with Github
              </Button>
              <Button
                leftIcon={<GoogleIcon fill="white" fontSize="20px" />}
                colorScheme="telegram"
                m={2}
                color="white"
                onClick={(e) => auth.signinWithGoogle()}
                _active={{ transform: 'scale(0.95)' }}
              >
                Sign In with Google
              </Button>
            </Flex>
          </Flex>
        )}
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map((feedback) => {
          return <Feedback key={feedback.id} {...feedback} />;
        })}
      </Flex>
    </Flex>
  );
}

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);
  return {
    props: {
      allFeedback: feedback || []
    },
    revalidate: 1
  };
}
