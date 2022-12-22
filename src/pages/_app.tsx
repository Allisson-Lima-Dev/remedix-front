import '../styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import type { AppProps } from 'next/app';
import { CSSReset, ChakraProvider } from '@chakra-ui/react';
import NextNprogress from 'nextjs-progressbar'; // theme css file
import 'moment/locale/pt-br';
import { QueryClientProvider } from 'react-query';
import { Layout } from '~/components/layout';
import { queryClient } from '~/services/queryClient';
import { authPageProps } from '~/utils/authPageProps';
import { theme } from '~/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CSSReset />
      <NextNprogress
        color="#4774fb"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
      />
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

// MyApp.getInitialProps = authPageProps;

export default MyApp;
