import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

import styles from './styles.module.scss';

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

export type PostsScreenProps = {
  posts: Post[];
};

function PostsScreen({ posts }: PostsScreenProps) {
  const [session] = useSession();
  const postBasePath = session?.activeSubscription ? '/posts' : '/posts/preview';

  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug} href={`${postBasePath}/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default PostsScreen;
