import React, { useState } from 'react';
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { Modal } from '~/components/modals/modalDefault';
import { phonesFormat } from '~/utils/formatPhone';

export interface IDataRequests {
  number_request: string;
  type: string;
  name: string;
  phone: string;
  date: string;
  amount: number;
  status: string;
}

interface ITabletRequestsProps {
  head_options: string[];
  data: any[];
}

export function TabletRequests({ head_options, data }: ITabletRequestsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [details, setDetails] = useState([]);
  return (
    <>
      <TableContainer
        whiteSpace="nowrap"
        w="full"
        borderTopRadius="8px"
        overflowY="auto"
        h="700px"
      >
        <Table variant="unstyled" size={{ base: 'sm', md: 'md' }}>
          <Thead w="full" pos="relative">
            <Tr
              pos="sticky"
              top={0}
              zIndex={1000}
              h="40px"
              bg="#1E2540"
              textAlign="center"
            >
              {head_options?.map((item, key) => (
                <Th
                  textAlign={key === 8 || key === 6 ? 'center' : 'left'}
                  key={key}
                >
                  {item}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody pos="relative">
            {data?.map((item: any, idx) => (
              <Tr borderBottom="1px solid #32394e" key={idx}>
                <Td>{item.id}</Td>
                <Td>{item.type}</Td>
                <Td>
                  <Box>
                    <Text> {item.userRequest.name}</Text>
                    <Text>{phonesFormat(item.userRequest.from)}</Text>
                  </Box>
                </Td>
                <Td fontSize="14px">
                  <Box>
                    <Text>
                      {moment(item.createdAt)
                        .locale('pt-br')
                        .format('DD/MM/YYYY')}
                    </Text>
                    <Text>{moment(item.createdAt).format('LTS')}</Text>
                  </Box>
                </Td>
                <Td>
                  {parseFloat(item.amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Td>

                <Td>
                  <Badge
                    variant="outline"
                    p="5px 10px"
                    borderRadius="20px"
                    fontSize="12px"
                    colorScheme={
                      item.status === 'sucess'
                        ? 'green'
                        : item.status === 'Em Andamento'
                        ? 'yellow'
                        : 'red'
                    }
                  >
                    {item.status === 'sucess'
                      ? 'Concluido'
                      : item.status === 'Em Andamento'
                      ? 'Pendente'
                      : 'Cancelado'}
                  </Badge>
                </Td>
                <Td>
                  <Flex justify="center" cursor="pointer">
                    <Icon
                      icon="material-symbols:print-outline-rounded"
                      width={25}
                    />
                  </Flex>
                </Td>
                <Td>
                  <Button
                    rightIcon={
                      <Icon icon="icon-park-solid:success" width={18} />
                    }
                    bg="#27AE60"
                    color="#fff"
                    size="sm"
                  >
                    Concluir
                  </Button>
                </Td>
                <Td>
                  <Flex
                    align="center"
                    justify="center"
                    cursor="pointer"
                    onClick={() => {
                      setDetails(item?.details);
                      if (!item?.details) {
                        return;
                      }
                      onOpen();
                    }}
                  >
                    <Flex
                      border="1px solid #cccccc39"
                      boxShadow="2xl"
                      w="-webkit-fit-content"
                      p="5px"
                      borderRadius="5px"
                    >
                      <Icon icon="circum:menu-kebab" width={22} />
                    </Flex>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose} title="Detalhes do Pedido">
        <Box h="500px">
          {details?.map((val: any, key: number) => (
            <Box key={key} mb="5px">
              <Text>{val.title}</Text>
              <Text>{val.description}</Text>
              <Divider borderColor="#cccccc3e" mt="6px" />
            </Box>
          ))}
        </Box>
      </Modal>
    </>
  );
}
