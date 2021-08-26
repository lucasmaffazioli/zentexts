import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { getPrismiscClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';
import styles from './styles.module.scss';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';

interface PostsProps {
  paginas: [
    {
      page: number;
      isActive: boolean;
    }
  ];
  posts: [
    {
      slug: string;
      title: string;
      excerp: string;
      updatedAt: Date;
    }
  ];
}

export default function Posts({ paginas, posts }: PostsProps) {
  const [session] = useSession();
  // const [currentPage, setCurrentPage] = useState(0);

  console.log('lalalal');
  console.log(paginas);

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
        <div className={styles.paginationBar}>
          {paginas.map(pagina => (
            <Link key={pagina.page} href={pagina.page.toString()}>
              <a className={pagina.isActive && styles.activePage}>
                {pagina.page}
              </a>
            </Link>
          ))}
        </div>
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

      pageSize: 5,
      page: params?.page,
    }
  );

  console.log(documents);

  const posts = documents.results.map(post => {
    3;
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerp: post.data.content
        .filter(content => content.type === 'paragraph')
        .map((paragraph, index) => {
          let text = paragraph?.text ?? '';
          if (index === 2) {
            const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            while (true) {
              if (regex.test(text[text.length - 1])) {
                text = text.substr(0, text.length - 1);
              } else {
                break;
              }
            }
            text += '...';
          }
          return index < 3 ? text + ' ' : '';
        }),
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

  let paginas = [];

  for (let step = 1; step <= documents.total_pages; step++) {
    paginas.push({
      page: step,
      isActive: step === documents.page,
    });
  }

  console.log(paginas);

  return {
    props: {
      paginas,
      posts,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
