import { useColorModeValue } from '@chakra-ui/react';

export const useColorModeDefault = () => {
  const bg = useColorModeValue('#EDEEF3', '#13192b');
  const bg_tablet = useColorModeValue('#eff2f7', '#1E2540');
  const bg_container = useColorModeValue('#ffffff', '#121626b2');
  const text_color = useColorModeValue('#000', '#FFFFFF');
  const tab_text = useColorModeValue('#ccc', '#cccccc49');
  const hover_accordion = useColorModeValue('#f8f7faf0', '#373f58');
  const hover_tablet = useColorModeValue('#f8f7faf0', '#282e3f');
  const header_table = useColorModeValue('#0000000c', '#cbd3e023');
  const expanded_color = useColorModeValue('#edf2f7', '#282e3f');
  const divider_color = useColorModeValue('#cfcfcfff', '#ffffff3e');
  const button_pagination_inative = useColorModeValue('#cfcfcfff', '#8181826b');
  const button_pagination_active = useColorModeValue('#f1f1f1', '#363C4F');

  return {
    bg,
    bg_container,
    text_color,
    tab_text,
    bg_tablet,
    hover_tablet,
    divider_color,
    button_pagination_inative,
    button_pagination_active,
    expanded_color,
    hover_accordion,
    header_table,
  };
};
