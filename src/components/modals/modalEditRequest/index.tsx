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
} from '@chakra-ui/react';
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
import { useMenuItems } from '~/services/hooks/useMenuItems';

interface ModalProps extends Omit<ModalChakraModal, 'children'> {
  number_request?: number;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult>;
}

interface IITemsRequestMenu {
  category: string;
  name: string;
  quantity: string;
  note?: string;
  accept_note?: boolean;
}

interface IRequestEdit {
  name: string;
  type: string;
  from_phone?: string;
  amount: string;
  requestMenu: IITemsRequestMenu[];
}

export function ModalEditRequest({
  isOpen,
  number_request,
  onClose,
  refetch,
  ...rest
}: ModalProps) {
  const { data } = useMenuCompany();
  const [category_id, setCategory_id] = useState(
    data?.menu_company[0]?.id || ''
  );
  const { data: dataMenuItems } = useMenuItems(category_id);
  function formatDobleFloatValue(value: string, fixed?: number) {
    let formatValue = +String(value).replace(/\D/g, '');
    return parseFloat(formatValue.toFixed(fixed || 2)) / 100;
  }
  const emptyData = {
    category: data?.menu_company[0].id,
    name: '',
    quantity: '1',
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
  } = useForm<IRequestEdit>({
    defaultValues: {
      requestMenu: [emptyData],
    },
  });

  let numbers: number[] = [];
  Array.from({ length: 50 })?.map((_, idx) => numbers.push(idx));

  const { fields, append, remove } = useFieldArray({
    name: 'requestMenu',
    control,
  });

  console.log({ fields });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      onClickButtonClose={() =>
        reset({
          requestMenu: [emptyData],
        })
      }
      title={`Editar Pedido #${number_request}`}
      width="580px"
      {...rest}
    >
      <Flex w="full" justify="space-between">
        <Box w="60%">
          <Input
            {...register('name')}
            variant="outline"
            label="Nome do Cliente"
            placeholder="Ex: João"
          />
        </Box>
        <Box ml="20px" w="40%" {...register('type')}>
          <Select name="" label="Tipo" h="40px">
            <option value="1">Entrega</option>
            <option value="1">Retirada</option>
          </Select>
        </Box>
      </Flex>
      <Flex w="full" justify="space-between" mt="10px">
        <Box w="60%">
          <Input
            {...register('from_phone')}
            variant="outline"
            label="Telefone"
            placeholder="Ex: 98 99999-9999"
          />
        </Box>
        <Box w="40%" ml="20px">
          <Input
            variant="outline"
            label="Valor"
            placeholder="0,00"
            {...register('amount', {
              onChange(event: React.ChangeEvent<HTMLInputElement>) {
                const { value } = event.currentTarget;
                event.currentTarget.value = formatCalcValue(value) || '';
              },
            })}
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
                      <AccordionIcon />
                    </HStack>
                  </Flex>
                </AccordionButton>
                <AccordionPanel>
                  {/* <Divider mb="20px" /> */}
                  <Flex
                    w="full"
                    justify="space-between"
                    align="center"
                    mt="10px"
                  >
                    <Box w="50%">
                      <Select
                        label="Categoria:"
                        placeholder="Selecione"
                        h="40px"
                        {...register(`requestMenu.${idx}.category`, {
                          onChange(event) {
                            resetField(`requestMenu.${idx}.name`);
                            setCategory_id(event.target.value);
                          },
                        })}
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
                        label="Pedido:"
                        placeholder="Selecione"
                        disabled={
                          getValues(`requestMenu.${idx}.category`) === ''
                        }
                        h="40px"
                        {...register(`requestMenu.${idx}.name`)}
                      >
                        {dataMenuItems?.items_menu
                          ?.filter(
                            (filter) =>
                              filter.category_menu_id ===
                              getValues(`requestMenu.${idx}.category`)
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

                      setValue(`requestMenu.${idx}.accept_note`, e === '1');
                      console.log(
                        'Accept_note',
                        getValues(`requestMenu.${idx}.accept_note`)
                      );
                    }}
                  >
                    <Stack spacing={4} direction="row">
                      <Radio value="1">Descrição</Radio>
                      <Radio value="2">Observação</Radio>
                    </Stack>
                  </RadioGroup>
                  {!watch(`requestMenu.${idx}.accept_note`) &&
                  watch(`requestMenu.${idx}.name`) ? (
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
                              watch(`requestMenu.${idx}.name`) === request.uuid
                          )?.description
                        }
                      </Text>
                    </Flex>
                  )}

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
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="#fff" />
                      <NumberDecrementStepper color="#fff" />
                    </NumberInputStepper>
                  </NumberInput>
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
              category: data?.menu_company[0]?.id || '',
              name: '',
              quantity: '',
              note: '',
              accept_note: true,
            });
          }}
        >
          Adicionar
        </Button>
      </Flex>
      <Divider my="20px" />
      <Flex w="full" mb="10px">
        <HStack>
          <Button
            bg="#4988FA"
            leftIcon={<Icon icon="ic:round-save-as" width={20} />}
          >
            Salvar
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              reset({
                requestMenu: [emptyData],
              });
              onClose();
            }}
          >
            Cancelar
          </Button>
        </HStack>
      </Flex>
    </Modal>
  );
}
