import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import PostsScreen, { Post, PostsScreenProps } from '@screens/posts';

import { PrismicClient } from '@services/prismic';

function Posts(props: PostsScreenProps) {
  return <PostsScreen {...props}></PostsScreen>;
}

export default Posts;

export const getStaticProps: GetStaticProps<PostsScreenProps> = async () => {
  const response = await PrismicClient().query(
    [Prismic.predicates.at('document.type', 'blog_post')],
    {
      fetch: ['blog_post.title', 'blog_post.content'],
      pageSize: 100
    }
  );

  const posts: Post[] = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text || '',
      updatedAt: new Date(post.last_publication_date).toLocaleString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    };
  });

  return {
    props: { posts }
  };
};
