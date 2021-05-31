import { useAuth } from '@/lib/auth';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

export default function SiteTableHeader({ stripeRole }) {
  const { user } = useAuth();
  return (
    <>
      <Breadcrumb mb={2}>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color="gray.700">Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify="space-between" w="100%">
        <Heading mb={4}>My Sites</Heading>
        {user?.stripeRole && <AddSiteModal>+ Add Site</AddSiteModal>}
      </Flex>
    </>
  );
}
