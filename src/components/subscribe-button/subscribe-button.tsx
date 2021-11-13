import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { api } from '@services/api';
import { getStripeJs } from '@services/stripe-js';

import styles from './styles.module.scss';

type SubscribeButtonProps = {
  priceId: string;
};

function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  const { push } = useRouter();

  async function handleSubscribe() {
    if (!session) {
      await signIn('github');
      return;
    }

    if (session.activeSubscription) {
      return push('/posts');
    }

    try {
      const response = await api.post<{ sessionId: string }>('/subscribe', { priceId });
      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
      Subscribe Now
    </button>
  );
}

export default SubscribeButton;
