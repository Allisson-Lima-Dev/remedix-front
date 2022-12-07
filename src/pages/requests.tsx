import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { Layout, TabletRequests } from '~/components';

export default function Requests() {
  const [requests, setRequests] = useState({
    requests: [],
  });

  //   const requests = [
  //     {
  //       number_request: '1',
  //       type: 'Retirada',
  //       name: 'Allisson',
  //       phone: '99999999',
  //       date: '07/12/22',
  //       amount: 50000,
  //       status: 'sucess',
  //     },
  //     {
  //       number_request: '2',
  //       type: 'Emtrega',
  //       name: 'Miguel',
  //       phone: '99999999',
  //       date: '07/12/22',
  //       amount: 10000,
  //       status: 'pending',
  //     },
  //   ];

  useEffect(() => {
    async function getRequests() {
      const { data } = await axios.get('http://localhost:3000/requests');
      setRequests(data);
    }
    getRequests();
  }, []);
  return (
    <Box w="full" p="30px">
      <Flex w="full" justify="flex-end">
        <InputGroup w="300px">
          <InputRightElement
            pointerEvents="none"
            children={<Icon icon="ic:baseline-search" width={20} />}
          />
          <Input
            type="tel"
            name=""
            placeholder="Buscar Pedido"
            variant="outline"
          />
        </InputGroup>
      </Flex>
      <Text>Requests</Text>
      <TabletRequests
        head_options={[
          'N° Pedido',
          'Tipo',
          'Nome',
          'Telefone',
          'Data',
          'Total',
          'Status',
          'Ação',
          'Detalhes',
        ]}
        data={requests?.requests}
      />
    </Box>
  );
}
