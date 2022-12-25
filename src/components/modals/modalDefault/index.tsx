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
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent
        maxW="max-content"
        minW={{ base: '', md: width || '500px' }}
        shadow="none"
        bg="#121626f8"
        color="#fff"
      >
        <ModalHeader bg="#121626b2" borderTopRadius="6px">
          <Text textAlign="left" fontSize="18px">
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton onClick={onClickButtonClose} />
        <Divider borderColor="#cccccc3e" mt="-6px" />
        <ModalBody
          zIndex={3000}
          bg="#121626b2"
          borderBottomRadius="6px"
          padding={padding || ''}
        >
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}
