import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getPrismiscClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';
import styles from './styles.module.scss';
import Head from 'next/head';
import { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';

interface PostsProps {
  next_page: string;
  posts: [
    {
      slug: string;
      title: string;
      excerp: string;
      updatedAt: Date;
    }
  ];
}

export default function Posts({ next_page, posts }: PostsProps) {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Posts | Zen Texts</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link
              key={post.slug}
              href={
                session?.activeSubscription
                  ? `/posts/${post.slug}`
                  : `/posts/preview/${post.slug}`
              }
            >
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerp}</p>
              </a>
            </Link>
          ))}
        </div>
        {next_page && <p>Load more articles</p>}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const PrismicClient = getPrismiscClient();
  const documents = await PrismicClient.query(
    Prismic.predicates.at('document.type', 'post'),
    {
      fetch: ['publication.title', 'publication.content'],
      pageSize: 1,
    }
  );

  console.log(documents);

  const posts = documents.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerp:
        post.data.content.find(content => content.type === 'paragraph')?.text +
          '...' ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    };
  });

  return {
    props: {
      next_page: documents.next_page,
      posts,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
