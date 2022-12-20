import React from 'react';
import { Icon } from '@iconify/react';
import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { Modal } from '../modalDefault';

interface IModalConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'confirm' | 'canceled' | string;
  number_request: any;
}

export function ModalConfirmation({
  isOpen,
  onClose,
  type,
  number_request,
}: IModalConfirmationProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === 'confirm' ? 'CONFIRMAR PEDIDO?' : 'CANCELAR PEDIDO?'}
      width="350px"
    >
      <Center>
        <Icon
          icon={
            type === 'confirm'
              ? 'material-symbols:check-circle-outline-rounded'
              : 'mdi:alert-circle-check'
          }
          width={75}
          //   color="#61e44c"
          color={type === 'confirm' ? '#61e44c' : '#c52626'}
        />
      </Center>
      <Heading textAlign="center" fontSize="20px" mt="10px">
        Pedido n° #{number_request}
      </Heading>
      <Text textAlign="center">
        {type === 'confirm'
          ? 'Tem certeza que deseja confirmar pedido?'
          : 'Tem certeza que deseja recursar pedido?'}
      </Text>
      <Button
        w="full"
        bg={type === 'confirm' ? 'green.500' : 'red.500'}
        mt="30px"
      >
        Confirmar
      </Button>
      <Button w="full" variant="outline" my="15px" onClick={onClose}>
        Cancelar
      </Button>
    </Modal>
  );
}
