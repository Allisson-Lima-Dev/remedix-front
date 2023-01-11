import React from 'react';
import { Box, Button, Center, Flex, HStack, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { Layout } from '~/components';
import { useOptions } from '~/services/hooks/useOptions';
import { useColorModeDefault } from '~/styles/colorMode';

export default function Clients() {
  const { hover_tablet, bg_tablet, text_color, bg_container, text_color_item } =
    useColorModeDefault();
  const { data: data_options, refetch: refetchOptions } = useOptions();
  return (
    <Box h="full" w="full" color={text_color}>
      <Text>Clientes</Text>
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
