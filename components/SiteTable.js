import format from 'date-fns/format';
import { Box, Link } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import React from 'react';
import NextLink from 'next/link';
import { Table, Tr, Th, Td } from './Table';
import DeleteSitebutton from './DeleteSiteButton';

const SiteTable = ({ sites }) => {
  return (
    <Table w="100%">
      <thead>
        <Tr>
          <Th>Feedback Page</Th>
          <Th>Site Link</Th>
          <Th>View Feedback</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <Box as="tr" key={site.url}>
            <Td>
              <NextLink href="/site/[siteId]" as={`/site/${site.id}`} passHref>
                <Link color="black" fontWeight="bold">
                  {site.name}
                </Link>
              </NextLink>
            </Td>
            <Td>
              <Link href={site.url} isExternal>
                {site.url}
              </Link>
            </Td>
            <Td>
              <NextLink href="/site/[siteId]" as={`/site/${site.id}`} passHref>
                <Link color="teal" fontWeight="bold">
                  View Feedback
                </Link>
              </NextLink>
            </Td>
            <Td>{format(new Date(site.createdAt), 'PPP')}</Td>
            <Td>
              <DeleteSitebutton siteId={site.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
