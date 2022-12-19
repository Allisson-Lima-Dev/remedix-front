/* eslint-disable no-param-reassign */
/* eslint-disable prefer-regex-literals */
import React, { useEffect, useState } from 'react';
import 'moment/locale/pt-br';
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
  Center,
  SimpleGrid,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import moment from 'moment';
import { Layout, Select, TabletRequests } from '~/components';
import { useRequest } from '~/services/hooks/useRequests';
import { CardRequest } from '~/components/cards/cardRequest';
import { phonesFormat } from '~/utils/formatPhone';
import { Pagination } from '~/components/pagination';
import { ModalRequest } from '~/components/modals/ModalRequest';

export default function Requests() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [viewList, setViewList] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [details, setDetails] = useState<any>();
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
  let render = 1;
  render += 1;
  console.log('Rendrizou', render);

  return (
    <Box w="full" p={{ base: '10px', md: '30px' }}>
      <Flex w="full" justify="space-between" mb="10px">
        <Flex
          onClick={() => refetch()}
          cursor="pointer"
          justify="center"
          bg="#161A2E"
          border="1px solid #29304D"
          w="-webkit-fit-content"
          h="-webkit-fit-content"
          p="5px"
          borderRadius="5px"
        >
          <Icon icon="ic:outline-refresh" width={22} />
        </Flex>
        <Box>
          <Text mb="2px">Pesquise</Text>
          <InputGroup w="300px">
            <InputRightElement
              pointerEvents="none"
              children={<Icon icon="ic:baseline-search" width={20} />}
            />

            <Input
              type="tel"
              placeholder="Busque por N° Pedido, nome..."
              variant="outline"
              // {...register('value', {
              //   onChange(event: React.ChangeEvent<HTMLInputElement>) {
              //     handleChange(event);
              //   },
              // })}
            />
          </InputGroup>
        </Box>
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
          <Flex align="center">
            <Select
              variant="unstyled"
              name=""
              onChange={(e) => {
                setPerPage(+e.target.value);
                setPage(1);
              }}
            >
              {['3', '10', '20', '30', '40', '50'].map((item) => (
                <option
                  value={item}
                  style={{ background: '#161A2E' }}
                  key={item}
                >
                  {item}
                </option>
              ))}
            </Select>
            <Center
              cursor="pointer"
              onClick={() => {
                setViewList(!viewList);
              }}
            >
              <Icon
                icon={
                  viewList
                    ? 'radix-icons:dashboard'
                    : 'ic:baseline-format-list-bulleted'
                }
                width={23}
              />
            </Center>
          </Flex>
        </Flex>

        <TabPanels>
          <TabPanel p="0">
            {viewList ? (
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
                lastPage={data?.total_pages}
              />
            ) : (
              <Box>
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
                  spacing={10}
                  justifyItems="center"
                  minH="250px"
                >
                  {data?.data?.map((item: any, key: number) => (
                    <CardRequest
                      key={key}
                      onClick={() => {
                        setDetails(item);
                        if (!item?.details) {
                          return;
                        }
                        onOpen();
                      }}
                      number_request={item?.id}
                      date={moment(item.createdAt)
                        .locale('pt-br')
                        .format('DD/MM/YYYY - LT')}
                      name={item.userRequest.name}
                      phone={phonesFormat(item.userRequest.from)}
                      status={item?.status}
                    />
                  ))}
                </SimpleGrid>
                <Pagination
                  isFetching={isFetching}
                  per_page={perPage}
                  current={page}
                  setPage={setPage}
                  next={data?.next}
                  prev={data?.prev}
                  total={data?.total_pages}
                  lastPage={data?.total_pages}
                />
                <ModalRequest
                  details={details}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              </Box>
            )}
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
