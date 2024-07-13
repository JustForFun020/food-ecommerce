import { ApolloLink } from '@apollo/client';

export const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Apollo-Require-Preflight': 'true',
    },
  });
  return forward(operation);
});
