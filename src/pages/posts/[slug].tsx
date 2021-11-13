import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { RichText } from 'prismic-dom';

import PostScreen, { PostScreenProps } from '@screens/post';
import { PrismicClient } from '@services/prismic';
import { formatDate } from '@utils/date';

function Post(props: PostScreenProps) {
  return <PostScreen {...props} />;
}

export default Post;

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  const prismic = PrismicClient(req);
  const response = await prismic.getByUID('blog_post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: formatDate({ date: response.last_publication_date })
  };

  return {
    props: {
      post
    }
  };
};
