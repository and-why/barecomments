import EmptyState from '@/components/EmptyState';
import { useAuth } from '@/lib/auth';

export default function DashboardPage() {
  const auth = useAuth();
  if (!auth.user) {
    return 'Loading...';
  }

  return <EmptyState />;
}
