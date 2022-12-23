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

export default function Requests() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [viewList, setViewList] = useState(true);
  const [filterTab, setFilterTab] = useState(0);
  const [isLarge1300, isLarge1400] = useMediaQuery([
    '(max-width: 1302px)',
    '(max-width: 1552px)',
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        : 'concluded',
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
      name: 'Concluido',
      icon: 'icon-park-solid:success',
    },
  ];

  console.log(startDate, endDate);

  return (
    <Box
      w="full"
      // p={{ base: '10px', md: '10px' }}
    >
      <Box bg="#121626b2" p="15px 20px" mb="10px" borderRadius="10px">
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
                color={filterTab === idx ? '#fff' : '#cccccc49'}
                bg={filterTab === idx ? '#4988FA' : ''}
                _hover={{
                  border: filterTab !== idx ? '1.5px solid #4988FA' : '',
                  color: filterTab !== idx ? '#4988FA' : '#fff',
                }}
                fontSize="18px"
              >
                <Icon icon={item.icon} width={25} />{' '}
                <Text ml="5px">{item.name}</Text>
              </Center>
            ))}
          </Center>
          <Button
            bg="#28a940"
            _active={{ bg: '#0a8f22' }}
            _hover={{ bg: '#31c64d', p: '20px' }}
            transition="all linear .25s"
            leftIcon={
              <Icon icon="material-symbols:add-shopping-cart" width={25} />
            }
          >
            Adicionar Pedido
          </Button>
        </Flex>
        <Divider my="10px" borderColor="#ffffff3e" />
        <Flex align="center" alignItems="center" justify="space-between">
          <Box>
            {/* <Text fontSize="14px">Exibir</Text> */}
            <Flex>
              <Center
                mr="10px"
                cursor="pointer"
                transition="all linear .55s"
                border={viewList ? '1px solid #29304D' : ''}
                bg={viewList ? '#161A2E' : 'transparent'}
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
                border={!viewList ? '1px solid #29304D' : ''}
                bg={!viewList ? '#161A2E' : 'transparent'}
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
              </Center>
            </Flex>
          </Box>
          <Flex align="center" alignItems="center">
            <Center mr="10px">
              <Box>
                {/* <Text mb="2px" fontSize="14px">
                  Filtro:
                </Text> */}
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
                {/* <InputRangeDate /> */}
                {/* <Center
                  border="1px solid #29304D"
                  bg="#161A2E"
                  p="5px 10px"
                  borderRadius="5px"
                  h="36px"
                  cursor="pointer"
                  onClick={onOpenFilter}
                >
                  <Icon icon="fontisto:date" width={20} />
                  <Text ml="10px">Filtrar por data</Text>
                </Center> */}
              </Box>
            </Center>
            <Box>
              {/* <Text mb="2px" fontSize="14px">
                Pesquise
              </Text> */}
              <InputGroup w="270px">
                <InputRightElement
                  pointerEvents="none"
                  children={<Icon icon="ic:baseline-search" width={20} />}
                />

                <Input
                  h="36px"
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
        </Flex>
      </Box>
      <Box bg="#121626b2" borderRadius="10px">
        {viewList ? (
          <TabletRequests
            head_options={[
              'N°',
              'Tipo',
              'Cliente',
              'Data',
              'Total',
              'Status',
              'Comprovante',
              filterTab === 0 ? 'Aceitar' : '',
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
            <ModalRequest details={details} isOpen={isOpen} onClose={onClose} />
          </Box>
        )}
      </Box>
      <ModalFilter isOpen={isOpenFilter} onClose={onCloseFilter} />
    </Box>
  );
}
