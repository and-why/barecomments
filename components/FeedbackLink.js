import { Flex } from '@chakra-ui/layout';
import { Link } from '@chakra-ui/react';

export default function FeedbackLink({ paths }) {
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
        fontWeight="bold"
        fontSize="sm"
        href={`/site/${paths.join('/')}`}
        target="_blank"
      >
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/" target="_blank">
        Powered by Bare Comments (Alpha)
      </Link>
    </Flex>
  );
}
