import { useTheme } from '@/utils/useTheme';
import { Flex } from '@chakra-ui/layout';
import { Link } from '@chakra-ui/react';

export default function FeedbackLink({ paths }) {
  const colorMode = useTheme();
  const linkColor = {
    light: 'gray.900',
    dark: 'gray.100'
  };

  return (
    <Flex
      align={['flex-start', 'center']}
      justifyContent="space-between"
      mb={8}
      width="100%"
      mt={1}
      direction={['column', 'row']}
    >
      <Link
        color={linkColor[colorMode]}
        fontWeight="bold"
        fontSize="sm"
        href={`/site/${paths.join('/')}`}
        target="_blank"
      >
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="gray.500" href="/" target="_blank">
        Powered by Bare Comments (Alpha)
      </Link>
    </Flex>
  );
}
