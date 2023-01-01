import React, { useMemo, useState } from 'react';
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
  Textarea,
  Divider,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  RadioGroup,
  Stack,
  Radio,
  Switch,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
import { Modal } from '../modalDefault';
import { Input } from '~/components/input';
import { formatCalcValue } from '~/utils/formatValue';
import { Select } from '~/components/select';
import { useMenuCompany } from '~/services/hooks/useMenuCompany';
import { useAllMenuItems, useMenuItems } from '~/services/hooks/useMenuItems';
import { api } from '~/services/api';
import { useOptions } from '~/services/hooks/useOptions';
import { phonesFormat } from '~/utils/formatPhone';

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

export function ModalCreateRequest({
  isOpen,
  number_request,
  onClose,
  refetch,
  ...rest
}: ModalProps) {
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
  const { data } = useMenuCompany();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [category_id, setCategory_id] = useState(
    data?.menu_company[0]?.id || ''
  );
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
  //   const value = formatDobleFloatValue(String(getValues('value')), 2);
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
    console.log(request_data);
    setLoading(true);
    console.log(data);
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
        refetch && refetch();
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
  }
  console.log('ARRAY', fields);

  // console.log(watch('requests').reduce((acc, value) => acc + value?.amount, 0));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      onClickButtonClose={() =>
        reset({
          requests: [emptyData],
        })
      }
      title="Novo Pedido"
      width="580px"
      {...rest}
    >
      <Box as="form" onSubmit={handleSubmit(handleCreateCategory)}>
        <Flex w="full" justify="space-between">
          <FormControl isInvalid={!!formState?.errors?.name_client} w="70%">
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
              placeholder="Select some colors..."
              // closeMenuOnSelect={false}
            />
            {formState?.errors?.name_client && (
              <FormErrorMessage>
                {formState?.errors?.name_client?.message}
              </FormErrorMessage>
            )}
          </FormControl>
          {/* <Box w="60%">
            <Input
              {...register('name_client')}
              variant="outline"
              label="Nome do Cliente"
              placeholder="Ex: João"
              error={formState?.errors?.name_client}
            />
          </Box> */}
          <Box ml="20px" w="30%">
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
        <Flex w="full" justify="space-between" mt="10px">
          <Box w="70%">
            <Input
              {...register('client_from', {
                onChange(event) {
                  const { value } = event.currentTarget;
                  event.currentTarget.value = phonesFormat(value) || '';
                },
              })}
              variant="outline"
              label="Telefone:"
              placeholder="Ex: 98 99999-9999"
              error={formState?.errors?.client_from}
            />
          </Box>
          <Box w="30%" ml="20px">
            <Input
              variant="outline"
              label="Valor:"
              placeholder="0,00"
              isDisabled
              name=""
              value={parseFloat(
                String(
                  watch('requests').reduce(
                    (acc, value) => acc + (value?.amount || 0),
                    0
                  ) as number
                ) || '0'
              ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
              // {...register('total_amount', {
              // onChange(event) {
              //   const { value } = event.currentTarget;
              //   event.currentTarget.value = formatCalcValue(value) || '';
              //   setValue(
              //     'total_amount',
              //     Number(formatCalcValue(value)?.replace(',', '.'))
              //   );
              // },
              // })}
              // onChange={(event) => {
              //   const { value } = event.currentTarget;
              //   event.currentTarget.value = formatCalcValue(value) || '';
              //   setValue(
              //     'total_amount',
              //     Number(formatCalcValue(value)?.replace(',', '.'))
              //   );
              // }}
              // name="total_amount"
              error={formState?.errors?.total_amount}
            />
          </Box>
        </Flex>
        <Box
          my="5px"
          maxH="500px"
          overflowY="auto"
          __css={{
            '&::-webkit-scrollbar': {
              width: '7px',
              borderRadius: '24px',
              background: '#3d4154',
            },
            '&::-webkit-scrollbar-track': {
              width: '7px',
              marginLeft: '5px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#485EC4',
              width: '7px',
              borderRadius: '24px',
              marginLeft: '5px',
            },
          }}
        >
          <Accordion
            defaultIndex={numbers}
            allowMultiple
            variant="unstyled"
            my="20px"
          >
            {fields &&
              fields?.map((item, idx) => (
                <AccordionItem key={idx}>
                  <AccordionButton
                    alignItems="center"
                    _expanded={{ bg: '#282e3f', color: 'white' }}
                    h="50px"
                    _hover={{
                      bg: '#373f58',
                    }}
                  >
                    <AccordionIcon fontSize="27px" mr="10px" />
                    <Flex align="center" w="full" justify="space-between">
                      <Text color="#fff" fontSize="18px">
                        Pedido n° {idx + 1}
                      </Text>
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
                    </Flex>
                  </AccordionButton>
                  <AccordionPanel>
                    {/* <Divider mb="20px" /> */}
                    <Flex
                      w="full"
                      justify="space-between"
                      align="baseline"
                      mt="10px"
                    >
                      <Box w="50%">
                        <Select
                          label="Categoria:"
                          placeholder="Selecione"
                          h="40px"
                          {...register(`requests.${idx}.id_menu_company`, {
                            onChange(event) {
                              resetField(`requests.${idx}.id_item`);
                              setCategory_id(event.target.value);
                            },
                          })}
                          error={
                            formState?.errors?.requests &&
                            formState?.errors?.requests[idx]?.id_menu_company
                          }
                        >
                          {data &&
                            data?.menu_company?.map((itemMenu, key) => (
                              <option value={itemMenu.id} key={key}>
                                {itemMenu.menu_name}
                              </option>
                            ))}
                        </Select>
                      </Box>
                      <Box w="60%" ml="20px">
                        <Select
                          label="Item:"
                          placeholder="Selecione"
                          disabled={
                            getValues(`requests.${idx}.id_menu_company`) === ''
                          }
                          h="40px"
                          {...register(`requests.${idx}.id_item`, {
                            onChange(event) {
                              setValue(
                                `requests.${idx}.amount`,
                                ((dataMenuItems?.items_menu?.find(
                                  (itemMenu) =>
                                    itemMenu.uuid === event.target.value
                                )?.amount || 0) *
                                  watch(`requests.${idx}.unity`)) as number
                              );
                              setValue(
                                'total_amount',

                                watch('requests').reduce(
                                  (acc, value) => acc + (value?.amount || 0),
                                  0
                                ) as number
                              );
                            },
                          })}
                          error={
                            formState?.errors?.requests &&
                            formState?.errors?.requests[idx]?.id_item
                          }
                        >
                          {dataMenuItems?.items_menu
                            ?.filter(
                              (filter) =>
                                filter.category_menu_id ===
                                getValues(`requests.${idx}.id_menu_company`)
                            )
                            ?.map((itemsMenu, key) => (
                              <option
                                placeholder="Selecione"
                                value={itemsMenu.uuid}
                                key={key}
                              >
                                {itemsMenu.title}
                              </option>
                            ))}
                        </Select>
                      </Box>
                    </Flex>

                    <RadioGroup
                      defaultValue="1"
                      mt="10px"
                      onChange={(e) => {
                        console.log('CHECK', e);

                        setValue(`requests.${idx}.accept_note`, e === '1');
                        console.log(
                          'Accept_note',
                          getValues(`requests.${idx}.accept_note`)
                        );
                      }}
                    >
                      <Stack spacing={4} direction="row">
                        <Radio
                          value="1"
                          isDisabled={!watch(`requests.${idx}.id_item`)}
                        >
                          Descrição
                        </Radio>
                        <Radio
                          value="2"
                          isDisabled={!watch(`requests.${idx}.id_item`)}
                        >
                          Observação
                        </Radio>
                      </Stack>
                    </RadioGroup>
                    {!watch(`requests.${idx}.accept_note`) &&
                    watch(`requests.${idx}.id_item`) ? (
                      <Box>
                        <Text
                          color="#fff"
                          mt="10px"
                          mb="6px"
                          fontWeight="bold"
                          fontSize={{ base: '12px', md: '14px', lg: '14px' }}
                        >
                          Observação:
                        </Text>
                        <Textarea
                          //   value={value}
                          //   onChange={handleInputChange}

                          borderRadius="7px"
                          maxLength={250}
                          placeholder="Descreva a observação"
                          size="sm"
                        />
                      </Box>
                    ) : (
                      <Flex
                        mt="10px"
                        border="1px solid #cccccc45"
                        fontStyle="italic"
                        p="10px"
                        borderRadius="5px"
                        align="center"
                        minH="50px"
                      >
                        <Icon
                          icon="fluent:text-description-20-regular"
                          width={20}
                        />
                        <Text ml="5px">
                          {
                            dataMenuItems?.items_menu?.find(
                              (request) =>
                                watch(`requests.${idx}.id_item`) ===
                                request.uuid
                            )?.description
                          }
                        </Text>
                      </Flex>
                    )}

                    <Flex w="full" justify="space-between" align="center">
                      <Box>
                        <Text
                          mt="10px"
                          mb="6px"
                          fontWeight="bold"
                          fontSize={{ base: '12px', md: '14px', lg: '14px' }}
                        >
                          Unidades:
                        </Text>
                        <NumberInput
                          step={1}
                          defaultValue={1}
                          min={1}
                          max={30}
                          w="100px"
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

                              watch('requests').reduce(
                                (acc, val) => acc + (val?.amount || 0),
                                0
                              ) as number
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
                            <NumberIncrementStepper color="#fff" />
                            <NumberDecrementStepper color="#fff" />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
                      <Text>
                        {parseFloat(
                          String(
                            dataMenuItems?.items_menu?.find(
                              (itemMenu) =>
                                itemMenu.uuid ===
                                getValues(`requests.${idx}.id_item`)
                            )?.amount || '0'
                          )
                        ).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </Text>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              ))}
          </Accordion>
        </Box>
        <Flex justify="flex-end">
          <Button
            bg="#28a940"
            _active={{ bg: '#0a8f22' }}
            _hover={{ bg: '#31c64d' }}
            leftIcon={<Icon icon="material-symbols:add" width={25} />}
            onClick={() => {
              append({
                id_menu_company: data?.menu_company[0]?.id || '',
                id_item: '',
                unity: 1,
                note: '',
                accept_note: true,
              });
              setValue(
                'total_amount',
                watch('requests').reduce(
                  (acc, value) => acc + (value?.amount || 0),
                  0
                ) as number
              );
            }}
          >
            Adicionar
          </Button>
        </Flex>
        <Divider my="20px" />
        <Flex w="full" mb="10px">
          <HStack>
            <Button
              type="submit"
              bg="#4988FA"
              leftIcon={<Icon icon="ic:round-save-as" width={20} />}
            >
              Criar Pedido
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                reset({
                  requests: [emptyData],
                });
                onClose();
              }}
            >
              Cancelar
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Modal>
  );
}
