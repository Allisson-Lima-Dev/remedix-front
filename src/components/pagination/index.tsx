import { Box, Button, Flex, Skeleton, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { parseCookies } from 'nookies';
import React from 'react';
import { createPagination } from './createPagination';
import { api } from '~/services/api';
import { setLocalStorage } from '~/utils/localStorageFormat';

interface INavigation {
  current?: number;
  setPage: (numberPage: any) => void;
  per_page: number;
  isFetching: boolean;
  total?: number;
}

export function Pagination({
  current = 1,
  per_page,
  setPage,
  isFetching,
  total = 1,
}: INavigation) {
  const lastPage = Math.ceil(total / per_page || 1);

  const { pagination } = createPagination(5, lastPage, current);

  return (
    <Flex align="center" w="full" justify="center" my="40px">
      <Flex
        cursor={current !== 1 ? 'pointer' : 'not-allowed'}
        bg={current !== 1 ? '#363C4F' : '#2A3042'}
        _hover={{ bg: '#556EE6', color: '#A6B0CF' }}
        borderRadius="6px"
        w="38px"
        h="38px"
        justify="center"
        align="center"
        onClick={() => {
          if (current > 1) {
            setPage((page: number) => page - 1);
          }
        }}
      >
        <Icon
          icon="dashicons:arrow-left-alt2"
          color={current !== 1 ? '#C4CDD5' : '#A6B0CF'}
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
                color={current === item ? '#556EE6' : '#A6B0CF'}
                border={current === item ? '2px solid #556EE6' : ''}
                _hover={{ bg: '#556EE6', color: '#A6B0CF' }}
                bg="#2A3042"
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
        cursor={current < lastPage ? 'pointer' : 'not-allowed'}
        bg={current < lastPage ? '#363C4F' : '#2A3042'}
        color={current < lastPage ? '#C4CDD5' : '#A6B0CF'}
        _hover={{ bg: '#556EE6', color: '#A6B0CF' }}
        borderRadius="6px"
        w="38px"
        h="38px"
        justify="center"
        align="center"
        onClick={() => {
          if (current < lastPage) {
            setPage((page: number) => page + 1);
          }
        }}
      >
        <Icon
          icon="dashicons:arrow-right-alt2"
          width="20"
          height="20"
          style={{
            cursor: current < lastPage ? 'pointer' : 'not-allowed',
          }}
        />
      </Flex>
    </Flex>
  );
}
