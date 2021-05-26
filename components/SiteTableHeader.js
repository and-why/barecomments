import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

export default function SiteTableHeader() {
  return (
    <>
      <Breadcrumb mb={2}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.700">Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify="space-between" w="100%">
        <Heading mb={4}>My Sites</Heading>
        <AddSiteModal>+ Add Site</AddSiteModal>
      </Flex>
    </>
  );
}
