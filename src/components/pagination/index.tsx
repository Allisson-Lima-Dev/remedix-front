import { Box, Button, Flex, Skeleton, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import React from 'react';
import { createPagination } from './createPagination';
import { api } from '~/services/api';
import { setLocalStorage } from '~/utils/localStorageFormat';
import { useColorModeDefault } from '~/styles/colorMode';

interface INavigation {
  current?: number;
  lastPage: number;
  setPage: (numberPage: any) => void;
  per_page: number;
  isFetching: boolean;
  total?: number;
  next: boolean;
  prev: boolean;
}

export function Pagination({
  current = 1,
  per_page,
  lastPage,
  setPage,
  isFetching,
  total = 1,
  next,
  prev,
}: INavigation) {
  const { button_pagination_inative, button_pagination_active } =
    useColorModeDefault();
  const { pagination } = createPagination(5, lastPage, current);

  return (
    <Flex align="center" w="full" justify="center" my="40px">
      <Flex
        cursor={prev ? 'pointer' : 'not-allowed'}
        bg={prev ? button_pagination_active : button_pagination_inative}
        _hover={{ bg: prev ? '#1461f1' : '', color: '#ffffff' }}
        borderRadius="6px"
        w="38px"
        h="38px"
        justify="center"
        align="center"
        onClick={() => {
          if (prev) {
            setPage((page: number) => page - 1);
          }
        }}
      >
        <Icon
          icon="dashicons:arrow-left-alt2"
          color={prev ? '#C4CDD5' : '#A6B0CF'}
          width="20"
          height="20"
        />
      </Flex>

      <Flex minW="250px" justify="center">
        {!isFetching
          ? pagination.map((item, key) => (
              <Button
                mx="3px"
                borderRadius="6px"
                fontSize="17px"
                w="38px"
                h="38px"
                key={key}
                onClick={() => setPage(item)}
                color={current === item ? '#ffffff' : '#A6B0CF'}
                border={current === item ? '' : '2px solid #69729c6d'}
                _hover={{ bg: '#1461f1', color: '#ffffff' }}
                bg={current === item ? '#4988FA' : 'transparent'}
              >
                {item}
              </Button>
            ))
          : Array.from({ length: pagination.length || 1 }).map((_, key) => (
              <Skeleton
                w="38px"
                h="38px"
                key={key}
                borderRadius="6px"
                mx="3px"
              />
            ))}
      </Flex>
      <Flex
        cursor={next ? 'pointer' : 'not-allowed'}
        bg={next ? button_pagination_active : button_pagination_inative}
        color={next ? '#C4CDD5' : '#A6B0CF'}
        _hover={{ bg: next ? '#1461f1' : '', color: '#ffffff' }}
        borderRadius="6px"
        w="38px"
        h="38px"
        justify="center"
        align="center"
        onClick={() => {
          if (next) {
            setPage((page: number) => page + 1);
          }
        }}
      >
        <Icon
          icon="dashicons:arrow-right-alt2"
          width="20"
          height="20"
          style={{
            cursor: next ? 'pointer' : 'not-allowed',
          }}
        />
      </Flex>
    </Flex>
  );
}
