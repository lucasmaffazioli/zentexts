import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { useEffect } from 'react';
import { SubscribeButton } from '../../../components/SubscribeButton';
import { getPrismiscClient } from '../../../services/prismic';
import getStripeProduct from '../../../services/stripe-product';

import styles from '../../posts/post.module.scss';

interface PosPreviewProps {
  product: {
    priceId: string;
  };
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ product, post }: PosPreviewProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push('/post/' + post.slug);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | Zen Texts</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>

          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Want to continue reading?
            <SubscribeButton priceId={product.priceId} type="preview" />
            {/* <Link href="">
              <a>Subscribe now 🤗</a>
            </Link> */}
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismiscClient();

  const response = await prismic.getByUID('post', String(slug), {});

  if (response) {
    const post = {
      slug,
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content.splice(0, 2)),
      updatedAt: new Date(response.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    };

    const product = await getStripeProduct();

    return {
      props: { product, post },

      revalidate: 60 * 30, // 30 minutes
    };
  } else {
    return {
      notFound: true,
    };
  }
};
