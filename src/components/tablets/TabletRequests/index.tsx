/* eslint-disable no-shadow */
import React, { useEffect, useRef, useState } from 'react';

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
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { Modal } from '~/components/modals/modalDefault';
import { phonesFormat } from '~/utils/formatPhone';
import {
  CreateRequest,
  getReceiptRequest,
  useReceiptRequest,
} from '~/services/hooks/useRequests';
import { Pagination } from '~/components/pagination';
import { ModalRequest } from '~/components/modals/ModalRequest';

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
  total?: number;
  lastPage: number;
  isFetching: boolean;
  setPage: (numberPage: any) => void;
  page: number;
  per_page: number;
  next: boolean;
  prev: boolean;
}

export function TabletRequests({
  head_options,
  data,
  total,
  isFetching,
  lastPage,
  per_page,
  setPage,
  page,
  next,
  prev,
}: ITabletRequestsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState<'download' | 'print'>();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);
  const [docPdf, setDocpdf] = useState('');
  const [details, setDetails] = useState<any>();
  const IframeRef = useRef<HTMLIFrameElement | null>(null);

  const printIframe = async (Type: 'download' | 'print', id: string) => {
    setType(Type);
    try {
      setLoading(true);
      const res = await fetch(`https://api.remedix.com.br/requests/pdf/${id}`);
      const data = await res.arrayBuffer();
      const result = new DataView(data);
      const newBlob = new Blob([result], { type: 'application/pdf' });
      const fileURL = window.URL.createObjectURL(newBlob);

      if (Type === 'download') {
        let link = document.createElement('a');
        link.href = fileURL;
        link.download = `#${id}-comprovante.pdf`;
        link.click();
        return;
      }

      setDocpdf(fileURL);
      setTimeout(() => {
        if (IframeRef.current?.contentWindow) {
          IframeRef.current?.contentWindow;
          IframeRef.current?.focus();
          IframeRef.current?.contentWindow.print();
        }
      }, 700);
      console.log(res);
    } catch (error) {
      console.log();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {docPdf && (
        <iframe
          ref={IframeRef}
          id="receipt"
          className="receipt"
          src={docPdf}
          style={{ height: 500, display: 'none' }}
          title="Receipt"
        />
      )}
      <TableContainer
        whiteSpace="nowrap"
        w="full"
        borderTopRadius="8px"
        overflowY="auto"
        h="700px"
      >
        <Table variant="unstyled" size="sm">
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
                <Td>#{item.id}</Td>
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
                    borderRadius="5px"
                    fontSize="12px"
                    colorScheme={
                      item.status === 'sucess'
                        ? 'green'
                        : item.status === 'Em Andamento'
                        ? 'yellow'
                        : 'yellow'
                    }
                  >
                    {item.status === 'sucess'
                      ? 'Concluido'
                      : item.status === 'Em Andamento'
                      ? 'Pendente'
                      : 'Pendente'}
                  </Badge>
                </Td>
                <Td>
                  <Flex px="20px" justify="space-around" align="center">
                    <Flex
                      border="1px solid #cccccc39"
                      boxShadow="2xl"
                      borderRadius="5px"
                      justify="center"
                      p="3px"
                      cursor="pointer"
                      onClick={() => {
                        setType('print');
                        setId(item?.id);
                        printIframe('print', item?.id);
                      }}
                    >
                      {loading && type === 'print' && id === item.id ? (
                        <Spinner />
                      ) : (
                        <Icon
                          icon="material-symbols:print-outline-rounded"
                          width={25}
                        />
                      )}
                    </Flex>
                    <Flex
                      ml="5px"
                      border="1px solid #cccccc39"
                      boxShadow="2xl"
                      borderRadius="5px"
                      justify="center"
                      p="3px"
                      cursor="pointer"
                      onClick={() => {
                        setType('download');
                        setId(item?.id);
                        printIframe('download', item?.id);
                      }}
                    >
                      {loading && type === 'download' && id === item.id ? (
                        <Spinner />
                      ) : (
                        <Icon icon="material-symbols:download" width={25} />
                      )}
                    </Flex>
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
                      setDetails(item);
                      if (!item?.details) {
                        return;
                      }
                      onOpen();
                    }}
                  >
                    <Flex
                      border="1px solid #cccccc39"
                      boxShadow="2xl"
                      borderRadius="5px"
                      w="-webkit-fit-content"
                      p="5px"
                    >
                      <Icon icon="circum:menu-kebab" width={22} />
                    </Flex>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Pagination
          isFetching={isFetching}
          setPage={setPage}
          per_page={per_page}
          lastPage={lastPage}
          next={next}
          prev={prev}
          current={page}
          total={total}
        />
      </TableContainer>
      <ModalRequest details={details} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
