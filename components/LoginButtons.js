import { Button } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';

import { GithubIcon, GoogleIcon } from '@/components/Icons';
import { useAuth } from '@/lib/auth';

export default function LoginButtons() {
  const auth = useAuth();
  return (
    <Flex
      maxWidth="100%"
      direction="column"
      align="center"
      justify="center"
      mb={8}
    >
      <Text mb={8} w="100%" p={4}>
        <strong>Bare Comments</strong> makes it easy for you to add comments or
        reviews to your static site. It is still a work in progress, but feel
        free to sign up and give it a try. Sign up, sign in or register below.
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
  );
}
