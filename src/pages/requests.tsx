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

export default function Requests() {
  const { bg_container, text_color, tab_text, bg } = useColorModeDefault();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [viewList, setViewList] = useState(true);
  const [filterTab, setFilterTab] = useState(0);
  const [search, setSearch] = useState('');
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
  const [details, setDetails] = useState<any>();
  const { register, handleSubmit, reset } = useForm<any>();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);
  registerLocale('pt-br', ptBR);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const { data, refetch, isFetching } = useRequest({
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

  return (
    <Box w="full">
      <Box
        bg={bg_container}
        p="15px 20px"
        mb="20px"
        borderRadius="10px"
        color={text_color}
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
            bg="#28a940"
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
        <Divider my="10px" borderColor="#ffffff3e" />
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
                      style={{ background: '#161A2E' }}
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
      <Box bg={bg_container} borderRadius="10px">
        {viewList ? (
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
              'Editar',
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
        ) : (
          <Box py="20px">
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                lg: isLarge1300 ? 2 : 3,
                xl: isLarge1400 ? 3 : 4,
              }}
              spacing={10}
              justifyItems="center"
              minH="250px"
            >
              {data?.data?.map((item: any, key: number) => (
                <CardRequest
                  key={key}
                  onClick={() => {
                    setDetails(item);
                    if (!item?.request_details) {
                      return;
                    }
                    onOpen();
                  }}
                  number_request={item?.id}
                  date={moment(item.createdAt)
                    .locale('pt-br')
                    .format('DD/MM/YYYY - LT')}
                  name={item.user_request.name}
                  phone={phonesFormat(item.user_request.from)}
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
            <ModalRequest details={details} isOpen={isOpen} onClose={onClose} />
          </Box>
        )}
      </Box>
      <ModalFilter isOpen={isOpenFilter} onClose={onCloseFilter} />
      <ModalCreateRequest
        onClose={onCloseCreateRequest}
        isOpen={isOpenCreateRequest}
        refetch={refetch}
      />
    </Box>
  );
}
