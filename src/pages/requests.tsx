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
  const [loading, setLoading] = useState(false);
  const [docPdf, setDocpdf] = useState<any>();
  const [requests, setRequests] = useState({
    requests: [],
  });

  useEffect(() => {
    async function getRequests() {
      const { data } = await axios.get('http://localhost:3000/requests');
      const { data: pdf } = await axios.get(
        'http://localhost:3000/requests/download'
      );

      setDocpdf(pdf);

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
        data={requests?.requests}
      />
    </Box>
  );
}
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:3000/requests/download`);
//   const data = await res.arrayBuffer();
//   const result = new DataView(data);
//   fs.writeFileSync(`public/cv.html`, result);
//   console.log(data);

//   // Pass data to the page via props
//   return { props: {} };
// };
