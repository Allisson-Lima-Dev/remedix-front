import React from 'react';
import {
  Box,
  Flex,
  Image,
  Table,
  TableContainer,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface ITabletEmpatyProps {
  head_options: string[];
  imageSrc?: string;
}

export function TabletEmpaty({ head_options, imageSrc }: ITabletEmpatyProps) {
  return (
    <>
      <TableContainer
        whiteSpace="nowrap"
        w="full"
        borderTopRadius="8px"
        overflowY="auto"
      >
        <Table variant="unstyled" size={{ base: 'sm', md: 'md' }}>
          <Thead w="full" pos="relative">
            <Tr
              pos="sticky"
              top={0}
              zIndex={1000}
              h="40px"
              bg="#1E2540
"
            >
              {head_options?.map((item, key) => (
                <Th key={key}>{item}</Th>
              ))}
            </Tr>
          </Thead>
        </Table>
      </TableContainer>
      <Flex justify="center" flexDir="column" w="full" align="center" h="full">
        <Image
          src={imageSrc || '/assets/empty.png'}
          w="180px"
          alt="Imagem na tabela vazia."
        />
        <Text>Vazio</Text>
      </Flex>
    </>
  );
}
