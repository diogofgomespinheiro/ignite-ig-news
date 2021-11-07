import Head from 'next/head';
import Image from 'next/image';

import SubscribeButton from '@components/subscribe-button';

import styles from './styles.module.scss';

export type HomeScreenProps = {
  product: {
    priceId: string;
    amount: string;
  };
};

function HomeScreen({ product }: HomeScreenProps) {
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

export default HomeScreen;
