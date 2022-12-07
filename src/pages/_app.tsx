import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import NextNprogress from 'nextjs-progressbar';
import 'moment/locale/pt-br';
import { QueryClientProvider } from 'react-query';
import { Layout } from '~/components/layout';
import { queryClient } from '~/services/queryClient';
import { authPageProps } from '~/utils/authPageProps';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextNprogress
        color="#4774fb"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
      />
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

// MyApp.getInitialProps = authPageProps;

export default MyApp;
