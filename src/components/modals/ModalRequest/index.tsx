/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { Modal } from '../modalDefault';
import { useColorModeDefault } from '~/styles/colorMode';

export function ModalRequest({ details, isOpen, onClose }: any) {
  const { divider_color } = useColorModeDefault();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalhes do Pedido"
      size="sm"
    >
      <Box h="500px">
        <Flex w="full" justify="space-between" mb="5px">
          <Text>N° do Pedido: #{details?.id}</Text>
          <Text>
            Valor:{' '}
            {parseFloat(details?.amount).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Text>
        </Flex>
        <Text>Tipo: {details?.type}</Text>
        <Divider
          borderColor={divider_color}
          my="6px"
          borderStyle="dashed"
          borderWidth="1.5px"
        />
        <Text mb="5px">Dados do Cliente:</Text>
        <Text>Cliente: {details?.userRequest?.name}</Text>
        <Text>Bairro: {details?.address[0]?.district}</Text>
        <Text>
          Rua: {details?.address[0]?.street}, {details?.address[0]?.number_home}
        </Text>
        <Divider
          borderColor={divider_color}
          mt="6px"
          borderStyle="dashed"
          borderWidth="1.5px"
        />
        <Text my="10px">Descrição do pedido:</Text>
        {details?.details?.map((val: any, key: number) => (
          <Box key={key} mb="5px">
            <Text>{val.title}</Text>
            <Text>{val.description}</Text>
            <Divider
              borderColor="#cccccc3e"
              mt="6px"
              borderStyle="dashed"
              borderWidth="1.5px"
            />
          </Box>
        ))}
      </Box>
    </Modal>
  );
}
