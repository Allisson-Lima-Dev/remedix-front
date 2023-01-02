import {
  CloseButton,
  Flex,
  Text,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Modal as ChakraModal,
  ModalProps as ModalChakraModal,
  ModalCloseButton,
  Divider,
} from '@chakra-ui/react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { useColorModeDefault } from '~/styles/colorMode';

interface ModalProps extends ModalChakraModal {
  title?: string;
  padding?: string;
  width?: string;
  onClickButtonClose?: () => void;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult>;
}

export function Modal({
  children,
  title,
  isOpen,
  refetch,
  onClose,
  onClickButtonClose,
  padding,
  width,
  ...rest
}: ModalProps) {
  const { bg_container, text_color, bg_tablet, bg, divider_color } =
    useColorModeDefault();
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent
        maxW="max-content"
        minW={{ base: '', md: width || '500px' }}
        shadow="none"
        // bg={bg}
        // bg="#121626f8"
        color={text_color}
      >
        <ModalHeader bg={bg_container} borderTopRadius="6px">
          <Text textAlign="left" fontSize="18px">
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton onClick={onClickButtonClose} />
        <Divider borderColor={divider_color} mt="-6px" />
        <ModalBody
          zIndex={3000}
          // bg="#121626b2"
          bg={bg_container}
          borderBottomRadius="6px"
          padding={padding || ''}
        >
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}
