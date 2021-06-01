import { Flex } from '@chakra-ui/layout';
import { Link } from '@chakra-ui/react';

export default function FeedbackLink({ siteId }) {
  return (
    <Flex justifyContent="space-between" mb={8} width="full" mt={1}>
      <Link fontWeight="bold" fontSize="sm" href={`/site/${siteId}`}>
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/">
        Powered by Bare Comments
      </Link>
    </Flex>
  );
}
