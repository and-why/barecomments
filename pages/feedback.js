import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';

export default function FeedbackPage() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  // if (!auth.user) {
  //   return (
  //     <DashboardShell>
  //       <Spinner />
  //     </DashboardShell>
  //   );
  // }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {console.log(data)}
      {data.feedback.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
