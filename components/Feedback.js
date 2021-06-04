import React from 'react';

import { format, parseISO } from 'date-fns';
import { Box, Divider, Heading, Text, Code } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/react';
import { GithubIcon, GoogleIcon } from './Icons';
import { useTheme } from '@/utils/useTheme';

import ReactMarkdown from 'react-markdown';
import MDXComponents from './MDXComponents';

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
      <Box color={textColor[colorMode]}>
        <ReactMarkdown
          children={text}
          renderers={{
            paragraph: MDXComponents.p,
            blockquote: MDXComponents.blockquote,
            link: MDXComponents.a,
            list: MDXComponents.ul,
            listItem: MDXComponents.li,
            table: MDXComponents.table,
            tableHead: MDXComponents.th,
            tableCell: MDXComponents.td,
            code: ({ value }) => (
              <pre>
                <Code borderRadius={8} p={4} my={4}>
                  {value}
                </Code>
              </pre>
            ),
            inlineCode: MDXComponents.inlineCode
          }}
        />
      </Box>
      {isLast && (
        <Divider borderColor={dividerColor[colorMode]} mt={8} mb={8} />
      )}
    </Box>
  );
};

export default Feedback;
