import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';

import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';

import Feedback from '@/components/Feedback';
import DashboardShell from '@/components/DashboardShell';
import SiteHeader from '@/components/SiteHeader';

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);
  const { site } = await getSite(siteId);
  return {
    props: {
      initialFeedback: feedback,
      site
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()]
    }
  }));
  return {
    paths,
    fallback: 'blocking'
  };
}

const FeedbackPage = ({ initialFeedback, site }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const [siteId, route] = router.query.site;

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    };
    inputEl.current.value = '';
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <DashboardShell>
      <SiteHeader
        isSiteOwner={true}
        site={site}
        siteId={siteId}
        route={route}
      />
      <Flex direction="column" w="full" maxWidth="700px" margin="0 auto">
        {user && (
          <FormControl as="form" my={8} onSubmit={onSubmit}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input
              ref={inputEl}
              mb={2}
              type="comment"
              id="comment"
              placeholder="Leave a comment"
            />
            <Button type="submit" isDisabled={router.isFallback}>
              Add comment
            </Button>
          </FormControl>
        )}
        {allFeedback.map((feedback) => {
          return <Feedback key={feedback.id} {...feedback} />;
        })}
      </Flex>
    </DashboardShell>
  );
};

export default FeedbackPage;
