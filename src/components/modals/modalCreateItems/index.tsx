import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { Modal } from '../modalDefault';
import { api } from '~/services/api';
import { useMenuCompany } from '~/services/hooks/useMenuCompany';
import { formatCalcValue } from '~/utils/formatValue';
import { Select } from '~/components/select';
import { Input } from '~/components/input';
import { Textarea } from '~/components/TextArea';

interface IData {
  title: string;
  amount: string;
  description: string;
  id?: string;
}

interface IModalCreateCategoryProps {
  id: string;
  type?: 'new' | 'existing';
  isOpen: boolean;
  onClose: () => void;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult>;
}

export function ModalCreateItems({
  id,
  type,
  isOpen,
  onClose,
  refetch,
}: IModalCreateCategoryProps) {
  const createItemFormSchema = yup.object().shape({
    title: yup.string().required('Nome Obrigatório'),
    amount: yup.string().required('Valor Obrigatório'),
    description: yup.string().required('Descrição Obrigatória'),
    id:
      type === 'existing'
        ? yup.string().required('Categoria Obrigatório')
        : yup.string().optional(),
  });
  const [loading, setLoading] = useState(false);
  const { data: dataMenuCompany } = useMenuCompany();
  const toast = useToast();
  const { register, handleSubmit, reset, formState, setValue } = useForm<IData>(
    {
      resolver: yupResolver(createItemFormSchema),
    }
  );

  async function handleCreateCategory(data: any) {
    setLoading(true);
    console.log(data);
    await api
      .post(`/admin/menu/items/${id || data?.id}`, {
        amount: Number(data.amount?.replace(',', '.')),
        description: data.description,
        title: data?.title,
        id_menu_company: type === 'existing' ? data.id : '',
      })
      .then(() => {
        toast({
          title: 'Criado com sucesso',
          status: 'success',
          variant: 'solid',
          isClosable: true,
        });
        reset();
      })
      .finally(() => {
        refetch && refetch();
        setLoading(false);
        onClose();
      });
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Novo Item"
      //   width="350px"
    >
      <Box my="10px" as="form" onSubmit={handleSubmit(handleCreateCategory)}>
        {type === 'existing' && (
          <Box mb="10px" mt="5px">
            <Text>Categoria</Text>
            <Select
              error={formState?.errors?.id}
              mt="5px"
              placeholder="Selecione"
              {...register('id')}
            >
              {dataMenuCompany &&
                dataMenuCompany?.menu_company?.map((itemMenu, key) => (
                  <option value={itemMenu.id} key={key}>
                    {itemMenu.menu_name}
                  </option>
                ))}
            </Select>
          </Box>
        )}
        <Text>Nome do item</Text>
        <Input
          placeholder="Digite nome da Categoria"
          mb="10px"
          mt="5px"
          {...register('title')}
          error={formState?.errors?.title}
        />

        <Text>Valor</Text>
        <InputGroup mb="10px" mt="5px">
          <InputLeftElement
            pointerEvents="none"
            children={
              <Text fontSize="14px" color="#ccc">
                R$
              </Text>
            }
          />
          <Input
            paddingInlineStart={9}
            w="full"
            placeholder="0,00"
            {...register('amount', {
              onChange(event: React.ChangeEvent<HTMLInputElement>) {
                const { value } = event.currentTarget;
                event.currentTarget.value = formatCalcValue(value) || '';
              },
            })}
            error={formState?.errors?.amount}
          />
        </InputGroup>

        <Text>Descrição</Text>
        <Textarea
          name="description"
          mt="5px"
          borderRadius="7px"
          maxLength={250}
          placeholder="Descreva a descrição"
          size="sm"
          onChange={(e) => setValue('description', e.target.value)}
          // {...register('description')}
          error={formState?.errors?.description}
        />

        <Flex justify="flex-end" mt="20px">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button ml="10px" w="120px" isLoading={loading} type="submit">
            Salvar
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
}
