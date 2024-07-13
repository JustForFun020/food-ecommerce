import { ApolloLink, HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support';
import { authMiddleware } from './authMiddleware';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

// const httpLink = new HttpLink({
//   uri: 'http://localhost:5000/graphql',
// });
const uploadLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});

const link = ApolloLink.from([authMiddleware, uploadLink]);

const multipartLink =
  typeof window === 'undefined'
    ? ApolloLink.from([
        new SSRMultipartLink({
          stripDefer: true,
        }),
        uploadLink,
      ])
    : uploadLink;

export const makeClient = () => {
  return new ApolloClient({
    connectToDevTools: true,
    link: link,
    cache: new InMemoryCache(),
  });
};
