import NextLink from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from '@chakra-ui/react';

export default function SiteFeedbackTableHeader({ siteName }) {
  return (
    <>
      <Breadcrumb mb={2}>
        <BreadcrumbItem>
          <NextLink href="/feedback" passHref>
            <BreadcrumbLink color="gray.700">Feedback</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.700">{siteName || '—'}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify="space-between" w="100%">
        <Heading mb={4}>{siteName || '—'}</Heading>
      </Flex>
    </>
  );
}
