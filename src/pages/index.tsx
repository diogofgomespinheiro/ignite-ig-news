import { GetStaticProps } from 'next';

import HomeScreen, { HomeScreenProps } from '../screens/home';
import { stripe } from '../services/stripe';
import { formatCurrency } from '../utils';

export default function Home(props: HomeScreenProps) {
  return <HomeScreen {...props} />;
}

export const getStaticProps: GetStaticProps<HomeScreenProps> = async () => {
  const price = await stripe.prices.retrieve('price_1JstpyG8IwdLJkAnAdpJZ8M2');

  const product = {
    priceId: price.id,
    amount: formatCurrency(price.unit_amount / 100)
  };

  return {
    props: {
      product
    }
  };
};
