import NextLink from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from '@chakra-ui/react';

export default function FeedbackTableHeader({ siteName }) {
  return (
    <>
      <Breadcrumb mb={2}>
        <BreadcrumbItem>
          <NextLink href="/feedback" passHref>
            <BreadcrumbLink color="gray.700">Feedback</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify="space-between" w="100%">
        <Heading mb={4}>All Feedback</Heading>
      </Flex>
    </>
  );
}
