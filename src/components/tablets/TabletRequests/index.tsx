/* eslint-disable no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
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
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { phonesFormat } from '~/utils/formatPhone';
import { Pagination } from '~/components/pagination';
import { ModalRequest } from '~/components/modals/ModalRequest';
import { ModalConfirmation } from '~/components/modals/modalConfirmation';
import { ModalEditRequest } from '~/components/modals/modalEditRequest';

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
  currentTab?: number;
  total?: number;
  lastPage: number;
  isFetching: boolean;
  setPage: (numberPage: any) => void;
  page: number;
  per_page: number;
  next: boolean;
  prev: boolean;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult>;
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
  currentTab,
  refetch,
}: ITabletRequestsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCofirm,
    onOpen: onOpenCofirm,
    onClose: onCloseCofirm,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [type, setType] = useState<'download' | 'print'>();
  const [typeRequest, setTypeRequest] = useState({
    type: '',
    number_request: 0,
  });

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
    <Box pb="10px">
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
        maxH="700px"
      >
        <Table variant="unstyled" size="sm">
          <Thead w="full" pos="relative">
            <Tr
              pos="sticky"
              top={0}
              zIndex={1}
              h="40px"
              bg="#1E2540"
              textAlign="center"
            >
              {head_options?.map(
                (item, key) =>
                  item?.trim() && (
                    <Th
                      textAlign={
                        key === 8 || key === 6 || key === 9 ? 'center' : 'left'
                      }
                      key={key}
                    >
                      {item}
                    </Th>
                  )
              )}
            </Tr>
          </Thead>
          <Tbody pos="relative">
            {data?.map((item: any, idx) => (
              <Tr
                borderBottom="1px solid #32394e"
                key={idx}
                _hover={{
                  bg: '#282e3f',
                }}
              >
                <Td>#{item?.id}</Td>
                <Td>
                  <Badge
                    color="#fff"
                    variant="outline"
                    p="4px 6px"
                    borderRadius="5px"
                    fontSize="11px"
                  >
                    {item?.type}
                  </Badge>
                </Td>
                <Td>
                  <Box>
                    <Text> {item.user_request?.name}</Text>
                    <Text>{phonesFormat(item?.user_request?.from)}</Text>
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
                  {parseFloat(item.total_amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Td>

                <Td>
                  <Badge
                    variant={item?.status}
                    p="4px"
                    borderRadius="5px"
                    fontSize="11px"
                  >
                    {item.status === 'concluded'
                      ? 'Concluido'
                      : item.status === 'production'
                      ? 'Em andamento'
                      : item?.status === 'analysis'
                      ? 'Pendente'
                      : item?.status === 'canceled'
                      ? 'Cancelado'
                      : ''}
                  </Badge>
                  <Divider orientation="vertical" />
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
                {(currentTab === 0 || currentTab === 1) && (
                  <Td>
                    <Center justifyContent="flex-start">
                      <Text
                        cursor="pointer"
                        bg="green.500"
                        border="1px solid #29304D"
                        p="7px"
                        borderRadius="5px"
                        mr="5px"
                        onClick={() => {
                          onOpenCofirm();
                          setTypeRequest({
                            type: 'confirm',
                            number_request: item?.id,
                          });
                        }}
                      >
                        <Icon icon="material-symbols:check" width={18} />
                      </Text>
                      <Text
                        cursor="pointer"
                        bg="red.500"
                        border="1px solid #29304D"
                        p="7px"
                        borderRadius="5px"
                        onClick={() => {
                          onOpenCofirm();
                          setTypeRequest({
                            type: 'canceled',
                            number_request: item?.id,
                          });
                        }}
                      >
                        <Icon
                          icon="material-symbols:close-rounded"
                          width={18}
                        />
                      </Text>
                    </Center>
                  </Td>
                )}
                <Td>
                  <Center>
                    <Center
                      bg="#161A2E"
                      border="1px solid #29304D"
                      p="7px"
                      borderRadius="5px"
                      mr="5px"
                      cursor="pointer"
                      onClick={() => {
                        onOpenEdit();
                        setTypeRequest({
                          type: 'Edit',
                          number_request: item?.id,
                        });
                      }}
                    >
                      <Icon icon="material-symbols:edit-square-outline-rounded" />
                    </Center>
                    <Center
                      bg="#161A2E"
                      border="1px solid #29304D"
                      p="7px"
                      borderRadius="5px"
                    >
                      <Icon icon="ic:outline-delete" />
                    </Center>
                  </Center>
                </Td>
                <Td justifyContent="center">
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
      </TableContainer>
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
      <ModalConfirmation
        isOpen={isOpenCofirm}
        onClose={onCloseCofirm}
        type={typeRequest.type}
        number_request={typeRequest.number_request}
        status={
          currentTab === 0
            ? 'production'
            : currentTab === 1
            ? 'concluded'
            : 'canceled'
        }
        refetch={refetch}
        currentTab={currentTab}
      />
      <ModalEditRequest
        onClose={onCloseEdit}
        isOpen={isOpenEdit}
        number_request={typeRequest.number_request}
      />
      <ModalRequest details={details} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
