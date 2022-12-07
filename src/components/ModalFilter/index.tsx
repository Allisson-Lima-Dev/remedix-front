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
} from '@chakra-ui/react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query';

interface ModalProps extends ModalChakraModal {
  title?: string;
  padding?: string;
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
  padding,
  ...rest
}: ModalProps) {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent
        maxW="max-content"
        minW="500px"
        shadow="none"
        bg="#2a3042"
        color="#fff"
      >
        <ModalHeader bg="#2a3042" borderTopRadius="6px">
          <Text textAlign="left" fontSize="18px">
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          zIndex={3000}
          bg="#2a3042"
          borderBottomRadius="6px"
          padding={padding || ''}
        >
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
}
