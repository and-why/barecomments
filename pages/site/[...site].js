import { useRouter } from 'next/router';
import { useRef } from 'react';

import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Textarea } from '@chakra-ui/react';

import { Flex } from '@chakra-ui/layout';

import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';

import Feedback from '@/components/Feedback';
import DashboardShell from '@/components/DashboardShell';
import SiteHeader from '@/components/SiteHeader';
import useSWR, { mutate } from 'swr';
import fetcher from '@/utils/fetcher';
import LoginButtons from '@/components/LoginButtons';

const FeedbackPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const siteAndRoute = router.query?.site;

  const inputEl = useRef(null);
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;

  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data: feedbackData } = useSWR(feedbackApi, fetcher);

  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      siteAuthorId: site.authorId,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      text: inputEl.current.value.replace('\n', '\n\n'),
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    };
    inputEl.current.value = '';

    createFeedback(newFeedback);
    mutate(
      feedbackApi,
      async (data) => ({
        feedback: [newFeedback, ...data.feedback]
      }),
      false
    );
  };

  const LoginOrLeaveFeedback = () =>
    user ? (
      <>
        {!siteData || !feedbackData ? (
          <p>Loading</p>
        ) : (
          <Button
            type="submit"
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            mt={4}
            id="leave-feedback"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            Leave Feedback
          </Button>
        )}
      </>
    ) : (
      <LoginButtons />
    );

  return (
    <DashboardShell>
      <SiteHeader
        isSiteOwner={site?.authorId === user?.uid}
        site={site}
        siteId={siteId}
        route={route}
      />
      <Flex direction="column" w="full" margin="0 auto">
        {user && (
          <FormControl as="form" my={8} onSubmit={onSubmit}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Textarea
              ref={inputEl}
              mb={2}
              type="comment"
              id="leave-comment"
              isDisabled={!user}
              placeholder="Leave a comment"
            />
            {!loading && <LoginOrLeaveFeedback />}
          </FormControl>
        )}
        {allFeedback &&
          allFeedback.map((feedback, index) => {
            return (
              <Feedback
                key={feedback.id}
                settings={site?.settings}
                isLast={index === allFeedback.length - 1}
                {...feedback}
              />
            );
          })}
      </Flex>
    </DashboardShell>
  );
};

export default FeedbackPage;
