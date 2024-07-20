import { useLazyQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';

interface UseRefreshTableOptionProps<T> {
  variables?: T;
}

export const useRefreshTable = <T>(query: DocumentNode, option?: UseRefreshTableOptionProps<T>) => {
  const { variables } = option ?? {};
  const [refreshData, { loading, data }] = useLazyQuery(query, {
    variables: variables ?? {},
    fetchPolicy: 'cache-and-network',
  });

  return { refreshData, loading, data };
};
