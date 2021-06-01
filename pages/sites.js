import DashboardShell from '@/components/DashboardShell';
import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';
import UpgradeEmptyState from '@/components/UpgradeEmptyState';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
  const stripeRole = user?.stripeRole !== 'free';

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  if (data?.sites.length) {
    return (
      <DashboardShell>
        <SiteTableHeader stripeRole={stripeRole} />
        <SiteTable sites={data.sites} />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell>
      <SiteTableHeader stripeRole={stripeRole} />
      {stripeRole ? <EmptyState /> : <UpgradeEmptyState />}
      <UpgradeEmptyState />
    </DashboardShell>
  );
}
