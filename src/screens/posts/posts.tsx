import Head from 'next/head';

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
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <a key={post.slug}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}

export default PostsScreen;
