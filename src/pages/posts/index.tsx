import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import PostsScreen, { Post, PostsScreenProps } from '@screens/posts';

import { PrismicClient } from '@services/prismic';
import { formatDate } from '@utils/date';

function Posts(props: PostsScreenProps) {
  return <PostsScreen {...props}></PostsScreen>;
}

export default Posts;

export const getStaticProps: GetStaticProps<PostsScreenProps> = async () => {
  let posts: Post[] = [];

  try {
    const response = await PrismicClient().query(
      [Prismic.predicates.at('document.type', 'blog_post')],
      {
        fetch: ['blog_post.title', 'blog_post.content'],
        pageSize: 100
      }
    );

    posts = response.results.map(post => {
      return {
        slug: post.uid,
        title: RichText.asText(post.data.title),
        excerpt: post.data.content.find(content => content.type === 'paragraph')?.text || '',
        updatedAt: formatDate({ date: post.last_publication_date })
      };
    });

    return {
      props: { posts }
    };
  } catch (err) {
    console.error(err);
  }

  return {
    props: { posts }
  };
};
