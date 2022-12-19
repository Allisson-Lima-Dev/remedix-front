import { extendTheme } from '@chakra-ui/react';
import { Dict } from '@chakra-ui/utils';
import Badge from './components/Badge';
import colors from './foundations/colors';

export const theme = extendTheme({
  colors,
  components: {
    Badge,
  },
  styles: {
    global: (props: Dict<any>) => ({
      body: {
        overflowX: 'hidden',
      },
    }),
  },
});
