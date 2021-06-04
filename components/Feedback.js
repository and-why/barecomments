import React from 'react';

import { format, parseISO } from 'date-fns';
import { Box, Divider, Heading, Text } from '@chakra-ui/layout';
import { Flex, Icon } from '@chakra-ui/react';
import { GithubIcon, GoogleIcon } from './Icons';
import { useTheme } from '@/utils/useTheme';

const Feedback = ({ author, text, createdAt, provider, isLast, settings }) => {
  const colorMode = useTheme();
  const authorColor = {
    light: 'gray.900',
    dark: 'gray.200'
  };
  const textColor = {
    light: 'gray.800',
    dark: 'gray.300'
  };
  const dividerColor = {
    light: 'gray.200',
    dark: 'gray.700'
  };
  return (
    <Box borderRadius={4} w="full" mb={6}>
      <Flex>
        <Heading
          size="sm"
          as="h3"
          mb={0}
          color={authorColor[colorMode]}
          fontWeight="medium"
        >
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
        <Text color={textColor[colorMode]} mb={4} fontSize="xs">
          {format(parseISO(createdAt), 'PPpp')}
        </Text>
      )}
      <Text color={textColor[colorMode]}>{text}</Text>
      {isLast && (
        <Divider borderColor={dividerColor[colorMode]} mt={8} mb={8} />
      )}
    </Box>
  );
};

export default Feedback;
