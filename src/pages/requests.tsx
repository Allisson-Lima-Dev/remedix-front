/* eslint-disable no-param-reassign */
/* eslint-disable prefer-regex-literals */
import React, { useEffect, useState } from 'react';
import 'moment/locale/pt-br';
import ptBR from 'date-fns/locale/pt-BR';
import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Input,
  useDisclosure,
  Center,
  SimpleGrid,
  Divider,
  Button,
  useMediaQuery,
  Tooltip,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  HStack,
  Spinner,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { Icon } from '@iconify/react';
import moment from 'moment';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Select, TabletRequests } from '~/components';
import { useRequest } from '~/services/hooks/useRequests';
import { CardRequest } from '~/components/cards/cardRequest';
import { phonesFormat } from '~/utils/formatPhone';
import { Pagination } from '~/components/pagination';
import { ModalRequest } from '~/components/modals/ModalRequest';
import { ModalFilter } from '~/components/modals/modalFilter';
import { ModalCreateRequest } from '~/components/modals/modalCreateRequest';
import { useColorModeDefault } from '~/styles/colorMode';
import { IDataRequests } from '~/types/requests';
import { ModalConfirmation } from '~/components/modals/modalConfirmation';

export default function Requests() {
  const {
    bg_container,
    text_color,
    tab_text,
    bg,
    divider_color,
    header_table,
  } = useColorModeDefault();
  const {
    isOpen: isOpenCofirm,
    onOpen: onOpenCofirm,
    onClose: onCloseCofirm,
  } = useDisclosure();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [viewList, setViewList] = useState(true);
  const [filterTab, setFilterTab] = useState(0);
  const [search, setSearch] = useState('');
  const [typeRequest, setTypeRequest] = useState({
    type: '',
    number_request: 0,
  });
  const [isLarge1300, isLarge1400] = useMediaQuery([
    '(max-width: 1302px)',
    '(max-width: 1552px)',
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreateRequest,
    onOpen: onOpenCreateRequest,
    onClose: onCloseCreateRequest,
  } = useDisclosure();
  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclosure();
  const [details, setDetails] = useState<IDataRequests>();
  const { register, handleSubmit, reset } = useForm<any>();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  registerLocale('pt-br', ptBR);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const { data, refetch, isFetching, isLoading } = useRequest({
    page,
    per_page: perPage,
    status:
      filterTab === 0
        ? 'analysis'
        : filterTab === 1
        ? 'production'
        : filterTab === 2
        ? 'concluded'
        : 'canceled',
    startDate:
      startDate && endDate ? moment(startDate).format('YYYY-MM-DD') : '',
    endDate: startDate && endDate ? moment(endDate).format('YYYY-MM-DD') : '',
    search,
  });

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
      name: 'Concluídos',
      icon: 'mdi:store-check',
    },
    {
      name: 'Cancelados',
      icon: 'mdi:store-remove',
    },
  ];

  let timeoutId: any;

  const debouncedSearch = (value: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setSearch(value);
    }, 1000);
  };

  useEffect(() => {
    if (!details || typeRequest.type) {
      setDetails(data?.data[0]);
    }
  }, [data]);

  console.log({ details });

  return (
    <Box w="full">
      <Box
        bg={bg_container}
        p="15px 20px"
        mb="20px"
        borderRadius="10px"
        color={text_color}
        boxShadow="base"
      >
        <Flex align="center" justify="space-between">
          <Center>
            {tabsName?.map((item, idx) => (
              <Center
                borderRadius="7px"
                onClick={() => {
                  setFilterTab(idx);
                  setPage(1);
                }}
                p="3px 5px"
                cursor="pointer"
                transition="all linear .25s"
                borderColor="transparent"
                borderWidth="1.5px"
                mr="10px"
                color={filterTab === idx ? '#fff' : tab_text}
                bg={filterTab === idx ? '#4988FA' : ''}
                _hover={{
                  border: filterTab !== idx ? '1.5px solid #4988FA' : '',
                  color: filterTab !== idx ? '#4988FA' : '#fff',
                }}
                fontSize="18px"
              >
                <Icon icon={item.icon} width={28} />{' '}
                <Text ml="5px">{item.name}</Text>
              </Center>
            ))}
          </Center>
          <Button
            bg="green.500"
            _active={{ bg: '#0a8f22' }}
            _hover={{ bg: '#31c64d', p: '20px' }}
            transition="all linear .25s"
            onClick={onOpenCreateRequest}
            color="#fff"
            leftIcon={
              <Icon icon="material-symbols:add-shopping-cart" width={25} />
            }
          >
            Criar Pedido
          </Button>
        </Flex>
        <Divider my="10px" borderColor={divider_color} />
        <Flex align="center" alignItems="center" justify="space-between">
          <Box>
            <Flex>
              <Center
                mr="10px"
                cursor="pointer"
                transition="all linear .55s"
                border={viewList ? `1px solid ${bg}` : ''}
                bg={viewList ? bg : 'transparent'}
                p="5px 10px"
                borderRadius="5px"
                onClick={() => {
                  setViewList(true);
                }}
              >
                <Icon icon="ic:baseline-format-list-bulleted" width={23} />
                <Text ml="5px">Lista</Text>
              </Center>
              <Center
                mr="10px"
                border={!viewList ? `1px solid ${bg}` : ''}
                bg={!viewList ? bg : 'transparent'}
                p="5px 10px"
                borderRadius="5px"
                cursor="pointer"
                onClick={() => {
                  setViewList(false);
                }}
              >
                <Icon icon="radix-icons:dashboard" width={23} />
                <Text ml="5px">Cards</Text>
              </Center>
              <Center>
                <Select
                  variant="unstyled"
                  name=""
                  defaultValue={1}
                  onChange={(e) => {
                    setPerPage(+e.target.value);
                    setPage(1);
                  }}
                >
                  {['10', '20', '30', '40', '50'].map((item) => (
                    <option
                      value={item}
                      // style={{ background: '#161A2E' }}
                      key={item}
                    >
                      {item}
                    </option>
                  ))}
                </Select>
              </Center>
            </Flex>
          </Box>
          <Flex align="center" alignItems="center">
            <Center mr="10px">
              <Box>
                <Center zIndex={2000}>
                  <DatePicker
                    placeholderText="Filtro por data"
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    isClearable
                    monthsShown={2}
                    locale="pt-br"
                  />
                </Center>
              </Box>
            </Center>
            <Box>
              <InputGroup w="290px">
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon icon="ic:baseline-search" width={20} />}
                />

                <Input
                  h="36px"
                  type="tel"
                  placeholder="Busque por N° Pedido, nome..."
                  variant="outline"
                  onChange={(e) => {
                    debouncedSearch(e.target.value);
                  }}
                />

                <InputRightElement
                  cursor="pointer"
                  children={
                    <Tooltip
                      label="Pesquise pelo nome do cliente ou n° do Pedido"
                      bg="yellow.500"
                      mt="5px"
                      mr="50px"
                      closeDelay={500}
                      color="#fff"
                    >
                      <Icon icon="lucide:alert-circle" color="#cccccc86" />
                    </Tooltip>
                  }
                />
              </InputGroup>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box bg={bg_container} borderRadius="10px" boxShadow="base">
        {viewList && data ? (
          <TabletRequests
            refetch={refetch}
            head_options={[
              'N°',
              'Tipo',
              'Cliente',
              'Data',
              'Total',
              'Status',
              'Comprovante',
              filterTab === 0 ? 'Aceitar' : filterTab === 1 ? 'Concluir' : '',
              'Ações',
              'Detalhes',
            ]}
            currentTab={filterTab}
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
        ) : !viewList ? (
          <Box py="20px" w="full" color={text_color}>
            <Flex w="full">
              <SimpleGrid
                maxH="600px"
                overflowY="auto"
                columns={1}
                // columns={{
                //   base: 1,
                //   md: 2,
                //   lg: isLarge1300 ? 2 : 3,
                //   xl: isLarge1400 ? 3 : 4,
                // }}
                justifyItems="center"
                mx="auto"
                spacing={5}
                minW="350px"
                minH="250px"
              >
                {data &&
                  data?.data?.map((item: any, key: number) => (
                    <CardRequest
                      key={key}
                      onClick={() => {
                        setDetails(item);
                        if (!item?.request_details) {
                          return;
                        }
                        console.log();
                      }}
                      number_request={item?.id}
                      date={moment(item.createdAt)
                        .locale('pt-br')
                        .format('DD/MM/YYYY - LT')}
                      name={item.user_request.name}
                      phone={phonesFormat(item.user_request.from)}
                      status={item?.status}
                      bg={item.id === details?.id ? '#4988FA' : ''}
                      color={item.id === details?.id ? '#fff' : ''}
                      border={
                        item.id === details?.id ? '' : '1px solid #cccccc77'
                      }
                      _active={{ bg: '#2b73fa' }}
                    />
                  ))}
              </SimpleGrid>
              <Box
                w="70%"
                mx="auto"
                pr="10px"
                p="20px"
                // bg="#f4ed9f9f"
                // cor da nota
              >
                <Flex w="ful" justify="space-between" color="#ffffff">
                  <Text>Whatsapp</Text>
                  <Center justifyContent="flex-start">
                    <Button
                      cursor="pointer"
                      bg="green.500"
                      border={`1px solid ${bg}`}
                      p="7px"
                      borderRadius="5px"
                      mr="5px"
                      onClick={() => {
                        onOpenCofirm();
                        setTypeRequest({
                          type: 'confirm',
                          number_request: details?.id || 0,
                        });
                        refetch();
                      }}
                      leftIcon={
                        <Icon icon="material-symbols:check" width={20} />
                      }
                    >
                      Aceitar
                    </Button>

                    <Button
                      cursor="pointer"
                      bg="red.500"
                      border={`1px solid ${bg}`}
                      p="7px"
                      borderRadius="5px"
                      onClick={() => {
                        onOpenCofirm();
                        setTypeRequest({
                          type: 'canceled',
                          number_request: details?.id || 0,
                        });
                        refetch();
                      }}
                      leftIcon={
                        <Icon
                          icon="material-symbols:close-rounded"
                          width={20}
                        />
                      }
                    >
                      Recusar
                    </Button>
                  </Center>
                </Flex>
                <Divider
                  borderStyle="dashed"
                  borderWidth="1.5px"
                  my="10px"
                  borderColor={divider_color}
                />
                <Box textAlign="center" my="15px">
                  <Heading fontSize="25px">Pedido #{details?.id}</Heading>
                  <Text fontSize="15px">
                    {moment(details?.createdAt)
                      .locale('pt-br')
                      .format('LLLL:SS')}
                  </Text>
                </Box>
                <Heading fontSize="20px">
                  {details?.user_request?.name.toLocaleUpperCase()} |{' '}
                  {phonesFormat(details?.user_request?.from || '')}
                </Heading>
                <Divider
                  mt="10px"
                  borderStyle="dashed"
                  borderWidth="1.5px"
                  borderColor={divider_color}
                />
                <Text fontSize="15px">Pontos de Fidelidade: 20 pts</Text>
                <Divider
                  borderStyle="dashed"
                  borderWidth="1.5px"
                  borderColor={divider_color}
                />
                <Text fontSize="15px">Total de Pedidos do cliente: 20 </Text>
                <Divider
                  borderStyle="dashed"
                  borderWidth="1.5px"
                  borderColor={divider_color}
                />
                <Text mt="20px">Tipo do pedido: {details?.type}</Text>
                <TableContainer mt="20px">
                  <Table size="sm">
                    <Thead>
                      <Tr
                        // bg="#cbd3e023"
                        bg={header_table}
                      >
                        <Th maxW="10px">QTD</Th>
                        <Th>Item</Th>
                        <Th textAlign="right">Valor</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {details?.request_details.items_request.map(
                        (item, key) => (
                          <Tr borderBottom="1px solid #CBD3E0" key={key}>
                            <Td w="10px">{item.quantity}x</Td>
                            <Td colSpan={0}>{item.menu_item.title}</Td>
                            <Td textAlign="right">
                              {' '}
                              {parseFloat(
                                String(item.menu_item.amount) || '0'
                              ).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </Td>
                          </Tr>
                        )
                      )}
                      <Tr
                        // bg="#cbd3e023"
                        bg={header_table}
                      >
                        <Td>SubTotal</Td>
                        <Td>{}</Td>
                        <Td textAlign="right">
                          {parseFloat(
                            String(details?.total_amount) || '0'
                          ).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </Td>
                      </Tr>
                      <Tr
                      // bg="#cbd3e023"
                      >
                        <Td>Taxa de entrega</Td>
                        <Td>{}</Td>
                        <Td textAlign="right">
                          {parseFloat(String(0) || '0').toLocaleString(
                            'pt-BR',
                            {
                              style: 'currency',
                              currency: 'BRL',
                            }
                          )}
                        </Td>
                      </Tr>
                      <Tr
                      // bg="#cbd3e023"
                      >
                        <Td>Desconto</Td>
                        <Td>{}</Td>
                        <Td textAlign="right">
                          {parseFloat(String(0) || '0').toLocaleString(
                            'pt-BR',
                            {
                              style: 'currency',
                              currency: 'BRL',
                            }
                          )}
                        </Td>
                      </Tr>
                      <Tr
                        // bg="#cbd3e023"
                        bg={header_table}
                      >
                        <Td>Total</Td>
                        <Td>{}</Td>
                        <Td textAlign="right">
                          {parseFloat(
                            String(details?.total_amount) || '0'
                          ).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                {data && (
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
                )}
              </Box>
            </Flex>

            <ModalRequest details={details} isOpen={isOpen} onClose={onClose} />
          </Box>
        ) : (
          <Center h="full">
            <Spinner />
          </Center>
        )}
      </Box>
      <ModalFilter isOpen={isOpenFilter} onClose={onCloseFilter} />
      <ModalCreateRequest
        onClose={onCloseCreateRequest}
        isOpen={isOpenCreateRequest}
        refetch={refetch}
      />
      <ModalConfirmation
        isOpen={isOpenCofirm}
        onClose={onCloseCofirm}
        type={typeRequest.type}
        number_request={typeRequest.number_request}
        status={
          filterTab === 0
            ? 'production'
            : filterTab === 1
            ? 'concluded'
            : 'canceled'
        }
        refetch={refetch}
        currentTab={filterTab}
      />
    </Box>
  );
}
