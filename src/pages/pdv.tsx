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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper';
import {
  CreatableSelect,
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
  title?: string;
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
  name_client: yup.string().required('Nome Obrigat??rio'),
  type: yup.string().required('Tipo da entrega Obrigat??rio'),
  client_from: yup.string().notRequired(),
  total_amount: yup.number().required('Valor Obrigat??ria'),
  requests: yup.array().of(
    yup.object().shape({
      id_menu_company: yup.string().required('Categoria Obrigat??rio'),
      id_item: yup.string().required('Item Obrigat??rio'),
      unity: yup.number().required('Nome Obrigat??rio'),
      note: yup.string().notRequired(),
      accept_note: yup.string().notRequired(),
    })
  ),
});
export default function PDV() {
  const { hover_tablet, bg_tablet, text_color, bg_container, text_color_item } =
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
  });

  let numbers: number[] = [];
  Array.from({ length: 50 })?.map((_, idx) => numbers.push(idx));

  const { fields, append, remove } = useFieldArray({
    name: 'requests',
    control,
  });

  async function handleCreateCategory(request_data: IRequestEdit) {
    if (fields.length === 0) {
      return toast({
        title: 'Adicionar pedido obrigat??rio!',
        status: 'error',
        variant: 'solid',
        isClosable: true,
      });
    }
    let data_request = {
      status: 'production',
      ...request_data,
    };

    setLoading(true);
    await api
      .post(`/admin/request`, data_request)
      .then(() => {
        remove();
        resetField('name_client');
        resetField('client_from');
        toast({
          title: 'Pedido realizado!',
          status: 'success',
          variant: 'solid',
          isClosable: true,
        });
        // refetchOptions();
        // refetch();
      })
      .finally(() => {
        setLoading(false);
        // onClose();
      });
  }
  console.log({ fields });

  useEffect(() => {
    setWidth(sliderRef?.current?.scrollWidth - sliderRef?.current?.offsetWidth);
    if (!category_id) {
      setCategory_id(data?.menu_company[0]?.id || '');
    }
  }, [data]);

  return (
    <Box
      h="full"
      w="full"
      color={text_color}
      as="form"
      onSubmit={handleSubmit(handleCreateCategory)}
    >
      <Flex w="full" justify="space-between">
        <Box
          bg={bg_container}
          w="60%"
          mr="20px"
          p="20px"
          borderRadius="10px"
          overflow="hidden"
        >
          <Flex w="full" justify="space-between">
            <FormControl isInvalid={!!formState?.errors?.name_client} w="50%">
              <FormLabel>Nome do Cliente:</FormLabel>
              <CreatableSelect
                name="name_client"
                className="select_input"
                onChange={(e) => {
                  setValue('name_client', e?.value || '');
                  clearErrors('name_client');

                  if (e?.from) {
                    return setValue('client_from', e?.from);
                  }
                  resetField('client_from');
                }}
                options={data_options}
                formatCreateLabel={(userInput) => `????: "${userInput}"`}
                placeholder="Selecione cliente"
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
          <Text mt="10px" fontSize="20px" fontWeight="600">
            Categorias
          </Text>
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            // navigation={true}
            grabCursor
            breakpoints={{
              1100: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
              848: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              200: {
                slidesPerView: 1,
                spaceBetween: 50,
                navigation: true,
              },
            }}
            // autoplay={{ delay: 3000 }}
            keyboard={{
              enabled: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Keyboard, Pagination, Navigation, Autoplay]}
            className="mySwiper_pdv"
          >
            {data &&
              data?.menu_company?.map(
                (itemMenu, key) =>
                  itemMenu.active && (
                    <SwiperSlide key={key}>
                      <VStack
                        mx="10px"
                        textAlign="center"
                        align="center"
                        w="full"
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
                            category_id === itemMenu.id
                              ? '5px solid #5e94f9af'
                              : ''
                          }
                          h="80px"
                          w="80px"
                          borderRadius="50%"
                          key={key}
                        >
                          <Image src="/assets/food.svg" pointerEvents="none" />
                        </Center>

                        <Text
                          textAlign="center"
                          pb="10px"
                          color={category_id === itemMenu.id ? '#5481d6' : ''}
                        >
                          {itemMenu.menu_name}
                        </Text>
                      </VStack>
                    </SwiperSlide>
                  )
              )}
          </Swiper>
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
                    A????es
                  </Th>
                </Tr>
              </Thead>
              <Tbody pos="relative">
                {dataItems &&
                  dataItems.items_menu.map(
                    (items, idx) =>
                      items.active && (
                        <Tr
                          borderBottom="1px solid #494e5b3f"
                          key={idx}
                          _hover={{
                            bg: hover_tablet,
                          }}
                        >
                          <Td whiteSpace="pre-wrap">
                            <HStack>
                              <Image
                                src="/assets/hamburger.jpeg"
                                borderRadius="5px"
                                w="60px"
                                h="60px"
                              />
                              <Box>
                                <Text color={text_color_item} fontWeight={700}>
                                  {items?.title}
                                </Text>
                                <Text
                                  color="#909090"
                                  fontSize="15px"
                                  maxW="350px"
                                >
                                  Lorem, ipsum dolor sit amet consectetur
                                  adipisicing elit. Error vitae earum quo saepe,
                                  repudiandae amet consequatur sapiente
                                  {/* {items.description} */}
                                </Text>
                              </Box>
                            </HStack>
                          </Td>

                          <Td textAlign="right" fontWeight={700}>
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
                              {/* <Icon
                                icon="carbon:view"
                                width={22}
                                cursor="pointer"
                              /> */}
                              <Center
                                color="green.400"
                                ml="10px"
                                cursor="pointer"
                                onClick={() => {
                                  append({
                                    id_menu_company: items.category_menu_id,
                                    title: items.title,
                                    id_item: items.uuid,
                                    unity: 1,
                                    amount: items.amount,
                                    note: '',
                                    accept_note: true,
                                  });
                                }}
                              >
                                <Icon
                                  icon="material-symbols:add-shopping-cart"
                                  width={25}
                                />
                              </Center>
                            </Center>
                          </Td>
                        </Tr>
                      )
                  )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box bg={bg_container} p="20px" borderRadius="10px" w="40%">
          <HStack mb="10px">
            <Icon icon="material-symbols:shopping-cart" width={20} />
            <Text fontSize="20px" fontWeight={600}>
              Detalhes do Pedido
            </Text>
          </HStack>
          <Box maxH="250px" overflowY="auto">
            {fields &&
              fields?.map((item, idx) => (
                <HStack
                  key={idx}
                  w="full"
                  justify="space-between"
                  align="center"
                  borderBottom="1px solid #cccccc31"
                  pb="2px"
                  mb="5px"
                >
                  <Box>
                    <Text
                      color={text_color_item}
                      fontWeight={700}
                      fontSize="17px"
                    >
                      {item.title}
                    </Text>
                    <Text color="#797373" fontSize="15px">
                      {parseFloat(String(item.amount)).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </Text>
                  </Box>
                  <HStack>
                    <NumberInput
                      step={1}
                      defaultValue={1}
                      min={1}
                      max={30}
                      w="70px"
                      onChange={(e, value) => {
                        setValue(`requests.${idx}.unity`, value);
                        setValue(
                          `requests.${idx}.amount`,
                          (dataMenuItems?.items_menu?.find(
                            (itemMenu) =>
                              itemMenu.uuid ===
                              getValues(`requests.${idx}.id_item`)
                          )?.amount || 0) * value
                          // (watch(`requests.${idx}.amount`) || 0) * value
                        );
                        setValue(
                          'total_amount',

                          (watch('requests').reduce(
                            (acc, val) =>
                              Number((acc + (val?.amount || 0)).toFixed(2)),
                            0
                          ) as number) || 0
                        );
                        // setValue(
                        //   'total_amount',
                        //   (watch(`requests.${idx}.unity`) *
                        //     watch('requests').reduce(
                        //       (acc, val) => acc + (val?.amount || 0),
                        //       0
                        //     )) as number
                        // );
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <HStack>
                      <IconButton
                        variant="unstyled"
                        onClick={() => remove(idx)}
                        aria-label="Search database"
                        icon={
                          <Icon
                            icon="material-symbols:delete-outline"
                            width={25}
                          />
                        }
                      />
                    </HStack>
                  </HStack>
                </HStack>
              ))}
          </Box>
          <HStack w="full" justify="space-between" mt="20px">
            <Text>SubTotal</Text>
            <Text>
              {parseFloat(
                String(
                  (watch('requests') &&
                    (watch('requests')?.reduce(
                      (acc, val) =>
                        Number((acc + (val?.amount || 0)).toFixed(2)),
                      0
                    ) as number)) ||
                    0
                )
              ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </HStack>
          <HStack w="full" justify="space-between">
            <Text>Desconto</Text>
            <Text>
              {parseFloat(String(0)).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </HStack>
          <HStack w="full" justify="space-between">
            <Text fontSize="25px" fontWeight={700}>
              Total
            </Text>
            <Text fontSize="25px" fontWeight={700}>
              {parseFloat(
                String(
                  (watch('requests') &&
                    (watch('requests')?.reduce(
                      (acc, val) =>
                        Number((acc + (val?.amount || 0)).toFixed(2)),
                      0
                    ) as number)) ||
                    0
                )
              ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Text>
          </HStack>
          <HStack justify="right" mt="20px" w="full">
            <Button
              bg="red.500"
              color="#fff"
              type="reset"
              leftIcon={<Icon icon="icomoon-free:cancel-circle" />}
            >
              Cancelar
            </Button>
            <Button
              w="150px"
              bg="green.500"
              type="submit"
              color="#fff"
              isLoading={loading}
              leftIcon={
                <Icon icon="material-symbols:payments-outline" width={20} />
              }
              onClick={() => {
                setValue(
                  'total_amount',

                  (watch('requests')?.reduce(
                    (acc, val) => Number((acc + (val?.amount || 0)).toFixed(2)),
                    0
                  ) as number) || 0
                );
              }}
            >
              Finalizar
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
}
