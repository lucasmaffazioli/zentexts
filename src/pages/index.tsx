import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { SubscribeButton } from '../components/SubscribeButton';
import getStripeProduct from '../services/stripe-product';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Zen Texts</title>
      </Head>
      <div className={styles.homeContainer}>
        <div className={styles.homeContent}>
          <section>
            <h2>Hey, welcome 👋</h2>
            <br />
            <br />
            <h1>
              Articles about the <span>Zen</span> world.
            </h1>
            <br />
            <h2>
              Get acess to all the publications for{' '}
              <span>{product.amount} / month</span>
            </h2>
            <SubscribeButton priceId={product.priceId} type="home" />
          </section>
          <Image src="/imgHome.svg" alt="picture" width={300} height={550} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const product = await getStripeProduct();

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
