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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Heading,
  Divider,
  Badge,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Layout, TabletRequests } from '~/components';
import { useRequest } from '~/services/hooks/useRequests';

export default function Requests() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(1);
  const [docPdf, setDocpdf] = useState<any>();
  // const [value, setValue] = useState('');
  const [requests, setRequests] = useState({
    requests: [],
  });

  const { register, handleSubmit, reset } = useForm<any>();

  const { data, refetch, isFetching } = useRequest(page, perPage);

  const tabsName = [
    {
      name: 'Pendentes',
      icon: 'mdi:store-alert',
    },
    {
      name: 'Em Andamento',
      icon: 'ic:twotone-pending-actions',
    },
    {
      name: 'Concluido',
      icon: 'icon-park-solid:success',
    },
  ];

  return (
    <Box w="full" p={{ base: '10px', md: '30px' }}>
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
      <Tabs borderBottomColor="#32394e">
        <Flex align="center" justify="space-between" mb="20px">
          <TabList
            borderBottomColor="#32394e"
            borderBottom="1px solid #32394e"
            w="-webkit-fit-content"
          >
            {tabsName?.map((item, idx) => (
              <Tab
                color="#cccccc49"
                _selected={{ color: '#4988FA', borderBottomColor: '#4988FA' }}
                fontSize="18px"
              >
                <Icon icon={item.icon} width={25} />{' '}
                <Text ml="5px">{item.name}</Text>
              </Tab>
            ))}
          </TabList>
          <InputGroup w="300px">
            <InputRightElement
              pointerEvents="none"
              children={<Icon icon="ic:baseline-search" width={20} />}
            />
            <Input
              type="tel"
              placeholder="Buscar Pedido"
              variant="outline"
              // {...register('value', {
              //   onChange(event: React.ChangeEvent<HTMLInputElement>) {
              //     handleChange(event);
              //   },
              // })}
            />
          </InputGroup>
        </Flex>

        <TabPanels>
          <TabPanel p="0">
            <TabletRequests
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
              data={data?.data}
              per_page={perPage}
              setPage={setPage}
              next={data?.next}
              prev={data?.prev}
              page={data?.current_page}
              total={data?.total_pages}
              isFetching={isFetching}
            />
            <Box
              border="1px solid #ccc"
              w="350px"
              p="15px"
              borderRadius="8px"
              cursor="pointer"
            >
              <Flex align="center" w="full" justify="space-between" mb="5px">
                <Heading fontSize="18px" ml="5px">
                  Pedido: #44
                </Heading>
                <Text>15/01 as 15:30</Text>
              </Flex>
              <Divider borderColor="#ccc" />
              <Flex align="center" my="10px">
                <Avatar
                  name="Fabio Lima"
                  src="https://bit.ly/tioluwani-kolawole"
                  w="40px"
                  h="40px"
                />

                <Box ml="5px">
                  <Text>Fabio Lima</Text>
                  <Text>(98) 999999-99999</Text>
                </Box>
              </Flex>
              <Flex w="full" justify="space-between" mt="8px">
                <Badge
                  variant="outline"
                  p="5px 10px"
                  // borderRadius="20px"
                  fontSize="12px"
                  colorScheme="yellow"
                >
                  Pendente
                </Badge>
                <Icon
                  icon="material-symbols:chevron-right-rounded"
                  width={25}
                  color="#fff"
                />
              </Flex>
            </Box>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
