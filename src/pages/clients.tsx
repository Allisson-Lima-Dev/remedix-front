import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { Layout } from '~/components';
import { useOptions } from '~/services/hooks/useOptions';
import { useColorModeDefault } from '~/styles/colorMode';

export default function Clients() {
  const { hover_tablet, bg_tablet, text_color, bg_container, text_color_item } =
    useColorModeDefault();
  const { data: data_options, refetch: refetchOptions } = useOptions();
  const [search, setSearch] = useState('');
  let timeoutId: any;

  const debouncedSearch = (value: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setSearch(value);
    }, 1000);
  };
  return (
    <Box h="full" w="full" color={text_color}>
      <HStack w="full" justify="space-between">
        <Heading fontSize="20px">Clientes</Heading>

        <InputGroup w="290px">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon icon="ic:baseline-search" width={20} />}
          />

          <Input
            h="36px"
            type="tel"
            placeholder="Busque por nome"
            variant="outline"
            onChange={(e) => {
              debouncedSearch(e.target.value);
            }}
          />

          <InputRightElement
            cursor="pointer"
            children={
              <Tooltip
                label="Pesquise pelo nome do cliente ou n° do Pedido"
                bg="yellow.500"
                mt="5px"
                mr="50px"
                closeDelay={500}
                color="#fff"
              >
                <Icon icon="lucide:alert-circle" color="#cccccc86" />
              </Tooltip>
            }
          />
        </InputGroup>
      </HStack>
      {data_options?.map((item, key) => (
        <HStack
          w="full"
          bg={bg_container}
          h="70px"
          borderRadius="7px"
          pl="20px"
          mt="25px"
          justify="space-between"
          p="20px"
          key={key}
        >
          <HStack>
            <Center
              bg="#5481d6"
              h="65px"
              w="65px"
              ml="-10px"
              mt="-37px"
              borderRadius="7px"
            >
              <Icon icon="ph:user" width={35} color="#fff" />
            </Center>
            <Box>
              <Text fontWeight={700} color={text_color_item}>
                {item.label}
              </Text>
              <Text color="#797373" fontSize="15px" mt="-2px">
                {item.from}
              </Text>
            </Box>
          </HStack>
          <Center>
            <Center mr="5px">
              <Icon icon="ic:outline-pending-actions" width={20} />
              <Text>Pedidos</Text>
            </Center>
            <Center mx="10px">
              <Icon icon="material-symbols:trending-up" width={20} />
              <Text>10</Text>
            </Center>
            <Center mx="10px">
              <Icon icon="logos:whatsapp-icon" width={30} />
            </Center>
            <Center ml="10px">
              <Icon icon="carbon:edit" width={25} />
            </Center>
          </Center>
        </HStack>
      ))}
    </Box>
  );
}
