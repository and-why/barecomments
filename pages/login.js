import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react';
import { LogoIcon } from '@/components/Icons';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/auth';

export default function Login() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { signinWithEmail, user } = useAuth();
  const { handleSubmit, register, errors } = useForm();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const onLogin = ({ email, password }) => {
    setLoading(true);
    signinWithEmail(email, password).catch((error) => {
      setLoading(false);
      toast({
        tite: 'An Error occured',
        description: error.message,
        status: 'error',
        duration: 50000,
        isClosable: true
      });
    });
  };

  return (
    <Flex
      bg="gray.100"
      as="main"
      direction="column"
      align="center"
      justify="center"
      w="full"
      h="100vh"
      py={16}
    >
      <Flex
        direction="column"
        maxW="600px"
        align={['left', 'center']}
        margin="auto"
        p={8}
        boxShadow="md"
        borderRadius="md"
        bg="white"
      >
        <Flex direction="column" align={['left', 'center']} ml={4}>
          <LogoIcon boxSize={20} mb={8} />
          {user ? (
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
            <Box
              as="form"
              display="flex"
              flexDirection="column"
              onSubmit={handleSubmit(onLogin)}
            >
              <FormControl id="email" isRequired mb={4}>
                <FormLabel mb={0}>Email</FormLabel>

                <Input
                  name="email"
                  placeholder="Email..."
                  {...register('email')}
                />
              </FormControl>
              <FormControl id="password" isRequired mb={8}>
                <FormLabel mb={0}>Password</FormLabel>
                <InputGroup display="flex" flexDirection="column" size="md">
                  <Input
                    pr="4.5rem"
                    name="password"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    {...register('password')}
                  />
                  <InputRightElement>
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button colorScheme="orange" type="submit" isLoading={loading}>
                Login
              </Button>
            </Box>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
