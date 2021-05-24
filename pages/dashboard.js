import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import SiteTable from '@/components/SiteTable';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

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
      {data.sites.length > 0 ? (
        <SiteTable sites={data.sites} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
