/* eslint-disable no-param-reassign */
/* eslint-disable prefer-regex-literals */
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
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Layout, TabletRequests } from '~/components';
import { useRequest } from '~/services/hooks/useRequests';

export default function Requests() {
  const [loading, setLoading] = useState(false);
  const [docPdf, setDocpdf] = useState<any>();
  // const [value, setValue] = useState('');
  const [requests, setRequests] = useState({
    requests: [],
  });

  const { register, handleSubmit, reset } = useForm<any>();

  const { data, refetch } = useRequest();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const boletoRegex =
      /^([0-9]{5})([0-9]{5})([0-9]{5})([0-9]{6})([0-9]{5})([0-9]{6})([0-9]{1})([0-9]{14})$/;
    const newValue =
      event.target.value.substring(0, 54).replace(/\D/g, '') || '';

    if (boletoRegex.test(newValue)) {
      event.currentTarget.value = newValue.replace(
        boletoRegex,
        '$1.$2 $3.$4 $5.$6 $7 $8'
      );
    } else {
      event.currentTarget.value = newValue;
    }
  };
  return (
    <Box w="full" p={{ base: '10px', md: '30px' }}>
      <Flex w="full" justify="flex-end">
        {/* <MyComponent /> */}
        <InputGroup w="500px">
          <InputRightElement
            pointerEvents="none"
            children={<Icon icon="ic:baseline-search" width={20} />}
          />
          <Input
            type="tel"
            placeholder="Buscar Pedido"
            variant="outline"
            {...register('value', {
              onChange(event: React.ChangeEvent<HTMLInputElement>) {
                handleChange(event);
              },
            })}
            // value={value}
            // value={value}
            // onChange={handleChange}
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
