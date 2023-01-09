import '../styles/globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import type { AppProps } from 'next/app';
import {
  CSSReset,
  ChakraProvider,
  ColorMode,
  ColorModeProvider,
  Flex,
  Spinner,
  Text,
  cookieStorageManagerSSR,
  localStorageManager,
} from '@chakra-ui/react';
import NextNprogress from 'nextjs-progressbar'; // theme css file
import 'moment/locale/pt-br';
import { QueryClientProvider } from 'react-query';
import { Layout } from '~/components/layout';
import { queryClient } from '~/services/queryClient';
import { authPageProps } from '~/utils/authPageProps';
import { theme } from '~/styles/theme';
import { AuthProvider } from '~/context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  const { getInitialProps } = Component;
  const { 'chakra-ui-color-mode': cookie } = parseCookies();

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xs" w="50px" h="50px" />
      </Flex>
    );
  }

  if (typeof window === 'undefined') {
    return <></>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NextNprogress
        color="#4988FA"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow
      />
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = authPageProps;

export default MyApp;
