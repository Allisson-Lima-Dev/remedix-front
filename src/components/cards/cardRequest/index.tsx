import React from 'react';
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  BoxProps,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

interface ICardRequest extends BoxProps {
  number_request: any;
  date: string;
  name: string;
  avatar?: string;
  phone: string;
  status: string;
}

export function CardRequest({
  date,
  name,
  number_request,
  phone,
  status,
  avatar,
  ...rest
}: ICardRequest) {
  return (
    <Box
      {...rest}
      boxShadow="base"
      border="1px solid #cccccc77"
      w="90%"
      maxW="350px"
      h="160px"
      p="15px"
      borderRadius="8px"
      cursor="pointer"
      transition="all linear .55s"
      _hover={{
        borderColor: '#ffff',
        boxShadow: '50px',
      }}
    >
      <Flex align="center" w="full" justify="space-between" mb="5px">
        <Heading fontSize="18px" ml="5px">
          Pedido: #{number_request}
        </Heading>
        <Text fontSize="13px">{date}</Text>
      </Flex>
      <Divider borderColor="#ccc" />
      <Flex align="center" my="10px" w="full">
        <Avatar
          name={name}
          src="https://bit.ly/tioluwani-kolawole"
          w="40px"
          h="40px"
          fontSize="15px"
          mr="5px"
        />

        <Box>
          <Text>{name}</Text>
          <Text>{phone}</Text>
        </Box>
      </Flex>
      <Flex w="full" justify="space-between" mt="15px">
        <Badge
          // variant="outline"
          p="5px 10px"
          borderRadius="5px"
          fontSize="12px"
          colorScheme={
            status === 'analysis'
              ? 'yellow'
              : status === 'production'
              ? 'blue'
              : 'green'
          }
        >
          {status === 'analysis'
            ? 'Pendente'
            : status === 'production'
            ? 'Em Andamento'
            : 'Concluido'}
        </Badge>
        <Flex align="center">
          <Text>Abrir</Text>
          <Icon
            icon="material-symbols:chevron-right-rounded"
            width={25}
            color="#fff"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
