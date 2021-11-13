import { useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';

import PostScreen, { PostScreenProps } from '@screens/post';
import { PrismicClient } from '@services/prismic';
import { formatDate } from '@utils/date';

function PostPreview(props: Omit<PostScreenProps, 'isPreview'>) {
  const [session] = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      push(`/posts/${props.post.slug}`);
    }
  }, [session]);

  return <PostScreen {...props} isPreview />;
}

export default PostPreview;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [];

  try {
    const response = await PrismicClient().query(
      [Prismic.predicates.at('document.type', 'blog_post')],
      {
        fetch: [],
        pageSize: 50
      }
    );

    paths = response.results.map(post => {
      return {
        params: { slug: post.uid }
      };
    });
  } catch (err) {
    console.error(err);
  }

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = PrismicClient();
  const response = await prismic.getByUID('blog_post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: formatDate({ date: response.last_publication_date })
  };

  return {
    props: {
      post
    },
    revalidate: 60 * 30 // 30 minutes
  };
};
