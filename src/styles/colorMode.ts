import { useColorModeValue } from '@chakra-ui/react';

export const useColorModeDefault = () => {
  const bg = useColorModeValue('#EDEEF3', '#13192b');
  const bg_tablet = useColorModeValue('#f9f9f9', '#1E2540');
  const bg_container = useColorModeValue('#FFFFFF', '#121626b2');
  const text_color = useColorModeValue('#000', '#FFFFFF');
  const tab_text = useColorModeValue('#ccc', '#cccccc49');
  const hover_tablet = useColorModeValue('#cfcfcfff', '#282e3f');

  return { bg, bg_container, text_color, tab_text, bg_tablet, hover_tablet };
};
