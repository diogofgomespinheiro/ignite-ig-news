// ~/utils/prismicHelpers.js
import Prismic from '@prismicio/client';
import { apiEndpoint, accessToken } from '../../prismicConfiguration';

export const PrismicClient = (req = null) =>
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken));

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {};
  return {
    ...reqOption,
    ...accessTokenOption
  };
};
