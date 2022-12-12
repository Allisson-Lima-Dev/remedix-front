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
  file: any;
}

export function TabletRequests({
  head_options,
  data,
  file,
}: ITabletRequestsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState('1');
  const [loading, setLoading] = useState(false);
  const [docPdf, setDocpdf] = useState('');
  const [details, setDetails] = useState<any>();
  const IframeRef = useRef<HTMLIFrameElement | null>(null);

  const printIframe = async (type: 'download' | 'print', id: string) => {
    try {
      setLoading(true);
      CreateRequest(id).finally(async () => {
        const res = await fetch(
          `https://api.remedix.com.br/requests/download/${id}`
        );
        const data = await res.arrayBuffer();
        const result = new DataView(data);
        const newBlob = new Blob([result], { type: 'application/pdf' });
        const fileURL = window.URL.createObjectURL(newBlob);

        if (type === 'download') {
          let link = document.createElement('a');
          link.href = fileURL;
          link.download = `comprovante.pdf`;
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
      });
    } catch (error) {
      console.log();
    } finally {
      setLoading(false);
    }
  };

  return loading && docPdf ? (
    <Text>Oi</Text>
  ) : (
    <>
      {docPdf && (
        <iframe
          ref={IframeRef}
          id="receipt"
          className="receipt"
          // src="/extract.html"
          // src="/extract.pdf"
          // src="/login"
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
                    borderRadius="20px"
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
                    <Box
                      border="1px solid #cccccc39"
                      boxShadow="2xl"
                      borderRadius="5px"
                      p="3px"
                      cursor="pointer"
                      onClick={() => {
                        setId(item?.id);
                        printIframe('print', item?.id);
                      }}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <Icon
                          icon="material-symbols:print-outline-rounded"
                          width={25}
                        />
                      )}
                    </Box>
                    <Box
                      ml="5px"
                      border="1px solid #cccccc39"
                      boxShadow="2xl"
                      borderRadius="5px"
                      p="3px"
                      cursor="pointer"
                      onClick={() => printIframe('download', item?.id)}
                    >
                      {loading ? (
                        <Spinner />
                      ) : (
                        <Icon icon="material-symbols:download" width={25} />
                      )}
                    </Box>
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
      </TableContainer>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Detalhes do Pedido"
        size="sm"
      >
        <Box h="500px">
          <Flex w="full" justify="space-between" mb="5px">
            <Text>N° do Pedido: #{details?.id}</Text>
            <Text>
              Valor:{' '}
              {parseFloat(details?.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </Flex>
          <Text>Tipo: {details?.type}</Text>
          <Divider
            borderColor="#cccccc3e"
            my="6px"
            borderStyle="dashed"
            borderWidth="1.5px"
          />
          <Text mb="5px">Dados do Cliente:</Text>
          <Text>Cliente: {details?.userRequest?.name}</Text>
          <Text>Bairro: {details?.address[0]?.district}</Text>
          <Text>
            Rua: {details?.address[0]?.street},{' '}
            {details?.address[0]?.number_home}
          </Text>
          <Divider
            borderColor="#cccccc3e"
            mt="6px"
            borderStyle="dashed"
            borderWidth="1.5px"
          />
          <Text my="10px">Descrição do pedido:</Text>
          {details?.details?.map((val: any, key: number) => (
            <Box key={key} mb="5px">
              <Text>{val.title}</Text>
              <Text>{val.description}</Text>
              <Divider
                borderColor="#cccccc3e"
                mt="6px"
                borderStyle="dashed"
                borderWidth="1.5px"
              />
            </Box>
          ))}
        </Box>
      </Modal>
    </>
  );
}
