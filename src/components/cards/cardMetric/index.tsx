import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useColorModeDefault } from '~/styles/colorMode';

interface ICardMetricProps {
  type:
    | 'concluded'
    | 'pending'
    | 'cashIn'
    | 'cashOut'
    | 'lead-new'
    | 'withdraw'
    | 'delivery';
  amount: number | string;
  title?: string;
  bgIcon?: string;
}

export function CardMetric({ amount, title, type, bgIcon }: ICardMetricProps) {
  const { text_color, bg_container, bg } = useColorModeDefault();
  function getVariantCard() {
    switch (type) {
      case 'concluded':
        return {
          bg: '#34C759',
          icon: 'material-symbols:check-small-rounded',
          title: 'Concluído',
        };
      case 'pending':
        return {
          bg: '#FF9500',
          icon: 'ic:twotone-pending-actions',
          title: 'Pendente',
        };
      case 'cashOut':
        return {
          bg: '#FF2D55',
          icon: 'material-symbols:trending-down-rounded',
          title: 'Saída',
        };
      case 'cashIn':
        return {
          bg: '#5AC8FA',
          icon: 'material-symbols:trending-up-rounded',
          title: 'Entrada',
        };
      case 'lead-new':
        return {
          bg: '#AF52DE',
          icon: 'ph:user-circle-plus',
          title: 'Novos Clientes',
        };
      case 'delivery':
        return {
          bg: '#3f51b5',
          icon: 'ic:round-delivery-dining',
          title: 'Delivery',
        };
      case 'withdraw':
        return {
          bg: '#74c0bc',
          icon: 'ic:baseline-store',
          title: 'Retirada',
        };
      default:
        break;
    }
  }
  return (
    <Flex
      minH="70px"
      w="200px"
      // bg="#161A2E"
      // bg="#121626b2"
      bg={bg_container}
      borderBottom={`1px solid ${bg}`}
      boxShadow="base"
      borderRadius="8px"
      p="15px"
      align="center"
    >
      <Box w="80%">
        <Text
          fontFamily="Roboto"
          fontStyle="normal"
          fontWeight="500"
          fontSize="26px"
          lineHeight="32px"
          color="#fffffff"
        >
          {amount}
        </Text>
        <Text fontSize="12px" mt="10px" fontWeight={400}>
          {getVariantCard()?.title}
        </Text>
      </Box>
      <Flex
        borderRadius="50px"
        bg={getVariantCard()?.bg}
        w="40px"
        h="40px"
        justify="center"
        align="center"
        justifyContent="center"
      >
        <Icon icon={getVariantCard()?.icon || ''} color="#fff" width={25} />
      </Flex>
    </Flex>
  );
}
