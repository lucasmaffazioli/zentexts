import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { getPrismiscClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';
import styles from './styles.module.scss';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';

interface PostsProps {
  total_pages: number;
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

export default function Posts({ total_pages, next_page, posts }: PostsProps) {
  const [session] = useSession();
  const [currentPage, setCurrentPage] = useState(0);

  async function getNextPage() {
    console.log(next_page);

    fetch(next_page)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  //   function getPagination() {
  for (let step = 0; step < total_pages; step++) {
    console.log(step);
  }

  //   }

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
                  ? `/post/${post.slug}`
                  : `/post/preview/${post.slug}`
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
        {next_page && <p onClick={getNextPage}>Load more articles</p>}
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
  const PrismicClient = getPrismiscClient();
  const documents = await PrismicClient.query(
    Prismic.predicates.at('document.type', 'post'),
    {
      fetch: ['publication.title', 'publication.content'],

      pageSize: 1,
      page: params?.page,
    }
  );

  console.log(documents);

  const posts = documents.results.map(post => {
    3;
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
      total_pages: documents.total_pages,
      next_page: documents.next_page,
      posts,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
