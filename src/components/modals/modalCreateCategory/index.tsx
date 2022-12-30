import React, { useState } from 'react';
import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { Modal } from '../modalDefault';
import { api } from '~/services/api';
import { useMenuCompany } from '~/services/hooks/useMenuCompany';

interface IModalCreateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  refetch?: (
    options?: RefetchOptions & RefetchQueryFilters
  ) => Promise<QueryObserverResult>;
}

export function ModalCreateCategory({
  isOpen,
  onClose,
  refetch,
}: IModalCreateCategoryProps) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { register, handleSubmit, reset } = useForm();

  async function handleCreateCategory(data: any) {
    setLoading(true);
    console.log(data);
    await api
      .post('/admin/menu/company', data)
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
      title="Nova Categoria"
      //   width="350px"
    >
      <Box my="10px" as="form" onSubmit={handleSubmit(handleCreateCategory)}>
        <Text>Nome da Categoria</Text>
        <Input
          placeholder="Digite nome da Categoria"
          mb="20px"
          mt="5px"
          {...register('name_category')}
        />
        <Flex justify="flex-end">
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
