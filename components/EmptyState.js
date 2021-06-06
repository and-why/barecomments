import React from 'react';
import { Heading, Box, Code } from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '@/utils/useTheme';

const EmptyState = () => {
  const colorMode = useTheme();

  const textColor = {
    light: 'gray.800',
    dark: 'gray.300'
  };
  return (
    <Box
      width="100%"
      backgroundColor="white"
      maxWidth="800px"
      p={16}
      borderRadius={8}
      align="center"
    >
      <Heading size="md" as="h2" mb={2}>
        You haven't added any sites yet
      </Heading>
      <Box color={textColor[colorMode]}>
        <ReactMarkdown
          source={text}
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
      <AddSiteModal id={'add-first-site-button'}>
        Add Your First Site
      </AddSiteModal>
    </Box>
  );
};

export default EmptyState;
