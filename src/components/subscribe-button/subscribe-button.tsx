import { signIn, useSession } from 'next-auth/client';

import { api } from '@services/api';
import { getStripeJs } from '@services/stripe-js';

import styles from './styles.module.scss';

type SubscribeButtonProps = {
  priceId: string;
};

function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    if (!session) {
      await signIn('github');
      return;
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
