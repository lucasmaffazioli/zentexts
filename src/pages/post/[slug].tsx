import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { getPrismiscClient } from '../../services/prismic';

import styles from '../posts/post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
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
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  try {
    const session = await getSession({ req });
    const slug = params?.slug;

    if (!session?.activeSubscription) {
      return {
        redirect: {
          destination: '/post/preview/' + slug,
          permanent: false,
        },
      };
    }

    const prismic = getPrismiscClient(req);

    const response = await prismic.getByUID('post', String(slug), {});

    const post = {
      slug,
      title: RichText.asText(response.data.title),
      content: RichText.asHtml(response.data.content),
      updatedAt: new Date(response.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    };

    return {
      props: { post },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
