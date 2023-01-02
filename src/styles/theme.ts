import { type ThemeConfig, extendTheme } from '@chakra-ui/react';
import { Dict } from '@chakra-ui/utils';
import { mode } from '@chakra-ui/theme-tools';
import Badge from './components/Badge';
import colors from './foundations/colors';

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  disableTransitionOnChange: false,
};

export const theme = extendTheme({
  config,
  colors,
  components: {
    Badge,
  },
  styles: {
    global: (props: Dict<any>) => ({
      body: {
        color: mode('#000000', '#ffffff')(props),
        bg: mode('#f2f2f2', '#0a0f1e')(props),
        overflowX: 'hidden',
        transitionProperty: 'all',
        transitionDuration: 'normal',
      },
    }),
  },
});
