import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';

import { stripe } from '@services/stripe';
import { saveSubscription } from './_lib/manageSubscription';

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

enum StripeEventTypes {
  CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed',
  CUSTOMER_SUBSCRIPTION_CREATED = 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED = 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED = 'customer.subscription.deleted'
}

const relevantEvents = new Set([
  StripeEventTypes.CHECKOUT_SESSION_COMPLETED,
  StripeEventTypes.CUSTOMER_SUBSCRIPTION_CREATED,
  StripeEventTypes.CUSTOMER_SUBSCRIPTION_DELETED,
  StripeEventTypes.CUSTOMER_SUBSCRIPTION_UPDATED
]);

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const buf = await buffer(request);
    const sig = request.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook failed', err);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    const type = event.type as StripeEventTypes;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case StripeEventTypes.CUSTOMER_SUBSCRIPTION_CREATED:
          case StripeEventTypes.CUSTOMER_SUBSCRIPTION_DELETED:
          case StripeEventTypes.CUSTOMER_SUBSCRIPTION_UPDATED:
            const subscription = event.data.object as Stripe.Subscription;
            await saveSubscription(subscription.id, subscription.customer.toString());

            break;
          case StripeEventTypes.CHECKOUT_SESSION_COMPLETED:
            const checkoutSession = event.data.object as Stripe.Checkout.Session;
            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString()
            );

            break;
          default:
            throw new Error('Unhandled event.');
        }
      } catch (error) {
        console.error('Webhook event handler failed:', error);
        return response.json({ error: 'Webhook handler failed.' });
      }
    }

    return response.status(200).json({ received: true });
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed');
  }
}
