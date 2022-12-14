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
import { GetServerSideProps } from 'next';
import { Layout, TabletRequests } from '~/components';
import { useRequest } from '~/services/hooks/useRequests';

export default function Requests() {
  const [loading, setLoading] = useState(false);
  const [docPdf, setDocpdf] = useState<any>();
  const [requests, setRequests] = useState({
    requests: [],
  });

  const { data, refetch } = useRequest();

  return (
    <Box w="full" p={{ base: '10px', md: '30px' }}>
      <Flex w="full" justify="flex-end">
        {/* <MyComponent /> */}
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
      <Flex
        onClick={() => refetch()}
        cursor="pointer"
        mb="10px"
        justify="center"
        bg="#161A2E"
        border="1px solid #29304D"
        w="-webkit-fit-content"
        p="5px"
        borderRadius="5px"
      >
        <Icon icon="ic:outline-refresh" width={22} />
      </Flex>
      <TabletRequests
        file={docPdf}
        head_options={[
          'N° Pedido',
          'Tipo',
          'Cliente',
          'Data',
          'Total',
          'Status',
          'Comprovante',
          'Ação',
          'Detalhes',
        ]}
        data={data?.requests}
      />
    </Box>
  );
}
