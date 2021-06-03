import { Button } from '@chakra-ui/button';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { useAuth } from '@/lib/auth';
import { getAllFeedback, getSite } from '@/lib/db-admin';
import { LogoIcon } from '@/components/Icons';
import FeedbackLink from '@/components/FeedbackLink';
import Feedback from '@/components/Feedback';
import LoginButtons from '@/components/LoginButtons';

const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID;

export default function Home({ allFeedback, site }) {
  const auth = useAuth();
  return (
    <Flex
      bg="gray.100"
      as="main"
      direction="column"
      align="center"
      // justify="center"
      w="full"
      h="100vh"
      py={16}
    >
      <Flex
        maxWidth="600px"
        w="100%"
        direction="column"
        align="center"
        justify="center"
      >
        <Flex
          direction="column"
          maxW="600px"
          align={['left', 'center']}
          margin="auto"
          p={8}
          mb={16}
          boxShadow="md"
          borderRadius="md"
          bg="white"
        >
          <LogoIcon boxSize={20} mb={4} />
          {auth.user ? (
            <Button
              as="a"
              href="/sites"
              my={4}
              colorScheme="orange"
              _active={{ transform: 'scale(0.95)' }}
            >
              Go to Sites
            </Button>
          ) : (
            <LoginButtons />
          )}
        </Flex>
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback, index) => {
          return (
            <Feedback
              key={feedback.id}
              settings={site?.settings}
              isLast={index === allFeedback.length - 1}
              {...feedback}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);
  const { site } = await getSite(SITE_ID);
  return {
    props: {
      allFeedback: feedback,
      site
    },
    revalidate: 1
  };
}
