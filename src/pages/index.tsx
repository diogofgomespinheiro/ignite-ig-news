import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';

import SubscribeButton from '../components/subscribe-button/subscribe-button';
import { stripe } from '../services/stripe';
import { formatCurrency } from '../utils';

import styles from '../styles/pages/home.module.scss';

type HomeProps = {
  product: {
    priceId: string;
    amount: number;
  };
};

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome</span>
          <h1>
            News about the <span>React</span> World.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image src="/assets/avatar.svg" alt="Girl Coding" height={521} width={336} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
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
