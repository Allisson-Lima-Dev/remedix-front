import { AppContext } from 'next/app';
import { parseCookies, setCookie } from 'nookies';
import { getAPIClient } from '~/services/axios';
import { redirectTo } from './redirectTo';

export async function authPageProps({ Component, ctx, router }: AppContext) {
  let pageProps = {};
  const api = getAPIClient();

  const FREE_ROUTES = ['/login', '/register'];

  const { '@RemedixAccess_token': token } = parseCookies(ctx);

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  if (FREE_ROUTES.includes(ctx.pathname)) return { pageProps };

  if (!token) {
    redirectTo('/login', { res: ctx.res, status: 301 });
    return {};
  }
  if (token) {
    return { pageProps };
  }

  // if (refresh) {
  //   try {
  //     // when refresh token is valid
  //     const response = await api.post('auth/refresh', {
  //       headers: {
  //         authorization: `Bearer ${refresh}`,
  //       },
  //     });
  //     const { access_token, refresh_token } = response.data;
  //     setCookie(ctx, '@NeuralAnalyticsAccess_token', access_token);
  //     setCookie(ctx, '@NeuralAnalyticsRefresh_token', refresh_token);
  //     return { pageProps };
  //   } catch (error) {
  //     redirectTo('/login', { res: ctx.res, status: 301 });
  //     return {};
  //   }
  // }
  redirectTo('/login', { res: ctx.res, status: 301 });
  return {};
}
