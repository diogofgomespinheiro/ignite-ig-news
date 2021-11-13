import Head from 'next/head';
import Link from 'next/link';
import cx from 'classnames';

import styles from './styles.module.scss';

export type PostScreenProps = {
  isPreview?: boolean;
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
};

function PostScreen({ post, isPreview }: PostScreenProps) {
  return (
    <>
      <Head>
        <title>{post.title} | ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={cx(styles.postContent, { [styles.previewContent]: isPreview })}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          {isPreview && (
            <div className={styles.continueReading}>
              Wanna continue reading?
              <Link href="/">
                <a>Subscribe now 🤗</a>
              </Link>
            </div>
          )}
        </article>
      </main>
    </>
  );
}

export default PostScreen;
