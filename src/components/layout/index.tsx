import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { LayoutDashboard } from './dashboard';
import { routes } from '~/utils/routesPrivate';

interface layoutProps {
  children: ReactNode;
}

export function Layout({ children }: layoutProps) {
  const { asPath, query } = useRouter();
  const checkRoute = [
    '/login',
    '/register',
    `/activate/${query.hash}`,
    '/recovery',
    `/recovery-password/${query.hash}`,
    `/register-complete/${query.hash}`,
  ];

  const titleRoute = routes.find((item) => item.path === asPath);

  return (
    <Box>
      {checkRoute.includes(asPath) ? (
        children
      ) : (
        <LayoutDashboard title={titleRoute?.title || ''}>
          {children}
        </LayoutDashboard>
      )}
    </Box>
  );
}
