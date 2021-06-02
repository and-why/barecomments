import DashboardShell from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import FeedbackTable from '@/components/FeedbackTable';
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader';
import { useRouter } from 'next/router';
import FeedbackEmptyState from '@/components/FeedbackEmptyState';

export default function SiteFeedbackPage() {
  const { user } = useAuth();
  const { query } = useRouter();
  const { data } = useSWR(
    user ? [`/api/feedback/${query.siteId}`] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <SiteFeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader siteName={data.site.name} />
      {data.feedback.length ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
}
