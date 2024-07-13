'use client';

import React from 'react';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import { makeClient } from './makeClient';

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
