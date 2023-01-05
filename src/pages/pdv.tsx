/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Input as InputChakra,
  Flex,
  Text,
  Modal as ChakraModal,
  ModalProps as ModalChakraModal,
  Button,
  useNumberInput,
  HStack,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Divider,
  Avatar,
  Switch,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Center,
  VStack,
  Image,
} from '@chakra-ui/react';
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
  GroupBase,
  OptionBase,
  Select as SelectLib,
} from 'chakra-react-select';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';

import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { motion } from 'framer-motion';

import { Input } from '~/components/input';
import { formatCalcValue } from '~/utils/formatValue';
import { Select } from '~/components/select';
import { useMenuCompany } from '~/services/hooks/useMenuCompany';
import { useAllMenuItems, useMenuItems } from '~/services/hooks/useMenuItems';
import { api } from '~/services/api';
import { useOptions } from '~/services/hooks/useOptions';
import { phonesFormat } from '~/utils/formatPhone';
import { useColorModeDefault } from '~/styles/colorMode';

interface ModalProps extends Omit<ModalChakraModal, 'children'> {
  number_request?: number;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult>;
}

interface FlavorOrColorOption extends OptionBase {
  label: string;
  value: string;
  color?: string;
  rating?: string;
}

interface IITemsRequestMenu {
  id_menu_company: string;
  id_item: string;
  unity: number;
  amount?: number;
  note?: string;
  accept_note?: boolean;
}

interface IRequestEdit {
  name_client: string;
  type: string;
  client_from?: string;
  total_amount: number;
  requests: IITemsRequestMenu[];
}

const createRequestFormSchema = yup.object().shape({
  name_client: yup.string().required('Nome Obrigatório'),
  type: yup.string().required('Tipo da entrega Obrigatório'),
  client_from: yup.string().notRequired(),
  total_amount: yup.number().required('Valor Obrigatória'),
  requests: yup.array().of(
    yup.object().shape({
      id_menu_company: yup.string().required('Categoria Obrigatório'),
      id_item: yup.string().required('Item Obrigatório'),
      unity: yup.number().required('Nome Obrigatório'),
      note: yup.string().notRequired(),
      accept_note: yup.string().notRequired(),
    })
  ),
});
export default function PDV() {
  const { hover_tablet, bg_tablet, text_color, bg_container } =
    useColorModeDefault();
  const sliderRef = useRef<any | null>(null);
  const [width, setWidth] = useState(0);
  const { data } = useMenuCompany();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [category_id, setCategory_id] = useState(
    data?.menu_company[0]?.id || ''
  );
  const { data: dataItems } = useMenuItems(category_id);
  const { data: dataMenuItems } = useAllMenuItems();
  const { data: data_options, refetch: refetchOptions } = useOptions();
  function formatDobleFloatValue(value: string, fixed?: number) {
    let formatValue = +String(value).replace(/\D/g, '');
    return parseFloat(formatValue.toFixed(fixed || 2)) / 100;
  }
  const emptyData = {
    id_menu_company: data?.menu_company[0]?.id,
    id_item: '',
    unity: 1,
    amount: 0,
    note: '',
    accept_note: true,
  };
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    watch,
    resetField,
    formState,
    clearErrors,
  } = useForm<IRequestEdit>({
    resolver: yupResolver(createRequestFormSchema),
    defaultValues: {
      requests: [emptyData],
    },
  });

  let numbers: number[] = [];
  Array.from({ length: 50 })?.map((_, idx) => numbers.push(idx));

  const { fields, append, remove } = useFieldArray({
    name: 'requests',
    control,
  });

  async function handleCreateCategory(request_data: IRequestEdit) {
    setLoading(true);
    await api
      .post(`/admin/request`, request_data)
      .then(() => {
        toast({
          title: 'Criado com sucesso',
          status: 'success',
          variant: 'solid',
          isClosable: true,
        });
        reset();
        refetchOptions();
        // refetch();
      })
      .finally(() => {
        setLoading(false);
        // onClose();
      });
  }

  useEffect(() => {
    setWidth(sliderRef?.current?.scrollWidth - sliderRef?.current?.offsetWidth);
  }, []);

  return (
    <Box h="full" w="full" color={text_color}>
      <Flex w="full" justify="space-between">
        <Box
          bg={bg_container}
          w="60%"
          mr="20px"
          p="10px"
          borderRadius="10px"
          overflow="hidden"
        >
          <Flex w="full" justify="space-between">
            <FormControl isInvalid={!!formState?.errors?.name_client} w="50%">
              <FormLabel>Nome do Cliente:</FormLabel>
              <CreatableSelect
                onChange={(e) => {
                  setValue('name_client', e?.value || '');
                  clearErrors('name_client');

                  if (e?.from) {
                    return setValue('client_from', e?.from);
                  }
                  resetField('client_from');
                }}
                options={data_options}
                formatCreateLabel={(userInput) => `📝: "${userInput}"`}
                placeholder="Selecione cliente"
                // closeMenuOnSelect={false}
              />
              {formState?.errors?.name_client && (
                <FormErrorMessage>
                  {formState?.errors?.name_client?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <Box w="30%">
              <Input
                {...register('client_from', {
                  onChange(event) {
                    const { value } = event.currentTarget;
                    event.currentTarget.value = phonesFormat(value) || '';
                  },
                })}
                h="44px"
                variant="outline"
                label="Telefone:"
                placeholder="Ex: 98 99999-9999"
                error={formState?.errors?.client_from}
              />
            </Box>
            <Box ml="20px" w="15%">
              <Select
                label="Tipo:"
                h="44px"
                {...register('type')}
                error={formState?.errors?.type}
              >
                <option value="delivery">Entrega</option>
                <option value="withdrawal">Retirada</option>
              </Select>
            </Box>
          </Flex>
          <Text fontSize="20px" fontWeight="600">
            Categorias
          </Text>
          <Flex
            as={motion.div}
            justify="space-between"
            my="10px"
            ref={sliderRef}
            overflowX="auto"
            // __css={{
            //   '&::-webkit-scrollbar': {
            //     width: '10px',
            //     borderRadius: '24px',
            //     background: '#2C3045',
            //   },
            //   '&::-webkit-scrollbar-track': {
            //     width: '10px',
            //   },
            //   '&::-webkit-scrollbar-thumb': {
            //     background: '#5e94f9af',
            //     width: '10px',
            //     borderRadius: '24px',
            //   },
            // }}
          >
            <Flex
              as={motion.div}
              dragConstraints={{ right: 0, left: -width }}
              drag="x"
              whileTap={{ cursor: 'grabbing' }}
            >
              {data &&
                data?.menu_company?.map((itemMenu, key) => (
                  <VStack
                    mx="10px"
                    textAlign="center"
                    onClick={() => {
                      setCategory_id(itemMenu.id);
                      console.log();
                    }}
                  >
                    <Center
                      cursor="pointer"
                      bg="#f1f1f1"
                      transition="all linear 0.20s"
                      border={
                        category_id === itemMenu.id ? '2px solid #5e94f9af' : ''
                      }
                      h="80px"
                      w="80px"
                      borderRadius="50%"
                      key={key}
                    >
                      <Image src="/assets/food.svg" pointerEvents="none" />
                    </Center>

                    <Text pb="10px">{itemMenu.menu_name}</Text>
                  </VStack>
                ))}
            </Flex>
          </Flex>
          <TableContainer
            whiteSpace="nowrap"
            w="full"
            // borderTopRadius="8px"
            overflowY="auto"
            maxH="700px"
            // mt="10px"
          >
            <Table variant="unstyled" size="sm">
              <Thead w="full">
                <Tr
                  h="40px"
                  bg={bg_tablet}
                  // bg="#1E2540"
                  textAlign="center"
                >
                  <Th>Item</Th>
                  <Th textAlign="right">Valor</Th>
                  <Th textAlign="right" mr="10px">
                    Ações
                  </Th>
                </Tr>
              </Thead>
              <Tbody pos="relative">
                {dataItems &&
                  dataItems.items_menu.map((items, idx) => (
                    <Tr
                      borderBottom="1px solid #32394e"
                      key={idx}
                      _hover={{
                        bg: hover_tablet,
                      }}
                    >
                      <Td>{items?.title}</Td>

                      <Td textAlign="right">
                        {parseFloat(String(items.amount)).toLocaleString(
                          'pt-BR',
                          {
                            style: 'currency',
                            currency: 'BRL',
                          }
                        )}
                      </Td>

                      <Td
                        align="right"
                        justifyItems="right"
                        justifyContent="right"
                      >
                        <Center justifyContent="right">
                          <Icon
                            icon="carbon:view"
                            width={22}
                            cursor="pointer"
                          />
                          <Center color="green.400" ml="10px" cursor="pointer">
                            <Icon
                              icon="material-symbols:add-shopping-cart"
                              width={25}
                            />
                          </Center>
                        </Center>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box bg={bg_container} p="10px" borderRadius="10px" w="40%">
          <HStack>
            <Icon icon="material-symbols:shopping-cart" width={20} />
            <Text fontSize="20px" fontWeight={600}>
              Detalhes do Pedido
            </Text>
          </HStack>
          <HStack
            w="full"
            justify="space-between"
            align="center"
            borderBottom="1px solid #ccc"
            pb="10px"
            mb="10px"
          >
            <Box>
              <Text>Pizza Baia</Text>
              <Text>R$ 20,00</Text>
            </Box>
            <HStack>
              <Button>-</Button>
              <Button>2</Button>
              <Button>+</Button>
            </HStack>
          </HStack>
          <HStack
            w="full"
            justify="space-between"
            align="center"
            borderBottom="1px solid #ccc"
            pb="10px"
            mb="10px"
          >
            <Box>
              <Text>Pizza Baia</Text>
              <Text>R$ 20,00</Text>
            </Box>
            <HStack>
              <Button>-</Button>
              <Button>1</Button>
              <Button>+</Button>
            </HStack>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
}
