import React from 'react';

import { format, parseISO } from 'date-fns';
import { Box, Divider, Heading, Text } from '@chakra-ui/layout';
import { Flex, Icon } from '@chakra-ui/react';
import { GithubIcon, GoogleIcon } from './Icons';

const Feedback = ({ author, text, createdAt, provider, isLast, settings }) => {
  return (
    <Box borderRadius={4} w="full">
      <Flex>
        <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
          {author}
        </Heading>
        {settings?.icons && (
          <>
            {provider == 'github.com' ? (
              <GithubIcon ml="6px" size="13px" />
            ) : (
              <GoogleIcon ml="6px" size="13px" />
            )}
          </>
        )}
      </Flex>
      {settings?.timestap && (
        <Text color="gray.500" mb={4} fontSize="xs">
          {format(parseISO(createdAt), 'PPpp')}
        </Text>
      )}
      <Text color="gray.800">{text}</Text>
      {isLast && (
        <Divider
          borderColor="gray.200"
          backgroundColor="gray.200"
          mt={8}
          mb={8}
        />
      )}
    </Box>
  );
};

export default Feedback;
