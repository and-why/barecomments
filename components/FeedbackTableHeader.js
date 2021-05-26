import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from '@chakra-ui/react';

export default function FeedbackTableHeader() {
  return (
    <>
      <Breadcrumb mb={2}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.700">Feedback</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify="space-between" w="100%">
        <Heading mb={4}>My Feedback</Heading>
      </Flex>
    </>
  );
}
