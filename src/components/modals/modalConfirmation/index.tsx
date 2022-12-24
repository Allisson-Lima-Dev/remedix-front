import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { Modal } from '../modalDefault';
import { updateRequest } from '~/services/hooks/useRequests';

interface IModalConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'confirm' | 'canceled' | string;
  currentTab?: number;
  number_request: any;
  status: 'analysis' | 'production' | 'concluded' | 'canceled';
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult>;
}

export function ModalConfirmation({
  onClose,
  refetch,
  isOpen,
  type,
  number_request,
  status,
  currentTab,
}: IModalConfirmationProps) {
  const [loading, setLoading] = useState(false);
  async function handleRequest() {
    setLoading(true);
    try {
      if (type === 'canceled') {
        await updateRequest(number_request, 'canceled');
      } else {
        await updateRequest(number_request, status);
      }
    } catch (error) {
      console.log();
    } finally {
      setLoading(false);
      refetch && refetch();
      onClose();
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        type === 'confirm'
          ? 'CONFIRMAR PEDIDO?'
          : currentTab === 0
          ? 'RECUSAR PEDIDO?'
          : 'CANCELAR PEDIDO?'
      }
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
          : currentTab === 0
          ? 'Tem certeza que deseja recusar o pedido?'
          : 'Tem certeza que deseja Cancelar o pedido?'}
      </Text>
      <Button
        w="full"
        bg={type === 'confirm' ? 'green.500' : 'red.500'}
        _hover={{
          bg: type === 'confirm' ? 'green.300' : 'red.300',
        }}
        _active={{
          bg: type === 'confirm' ? 'green.600' : 'red.600',
        }}
        mt="30px"
        isLoading={loading}
        onClick={handleRequest}
      >
        Confirmar
      </Button>
      <Button w="full" variant="outline" my="15px" onClick={onClose}>
        Cancelar
      </Button>
    </Modal>
  );
}
