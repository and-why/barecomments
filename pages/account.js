import DashboardShell from '@/components/DashboardShell';
import { PaymentIcon } from '@/components/Icons';
import { useAuth } from '@/lib/auth';
import { createCheckoutSession, goToBillingPortal } from '@/lib/db';
import { Button } from '@chakra-ui/react';

export default function AccountPage() {
  const { user } = useAuth();
  return (
    <DashboardShell>
      <Button
        leftIcon={<PaymentIcon fill="black" fontSize="20px" />}
        bg="#5469d4"
        color="white"
        m={2}
        onClick={(e) => createCheckoutSession(user.uid)}
        _hover={{ bg: '#435cd6' }}
        _active={{ transform: 'scale(0.95)' }}
      >
        Pay with Stripe
      </Button>
      <Button
        colorScheme="orange"
        m={2}
        onClick={(e) => goToBillingPortal()}
        _active={{ transform: 'scale(0.95)' }}
      >
        View Billing Portal
      </Button>
    </DashboardShell>
  );
}
