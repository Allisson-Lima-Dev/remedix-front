import React from 'react';
import {
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface ITabletSkeletonProps {
  head_options: string[];
  number_Tr?: number;
}

export function TabletSkeleton({
  head_options,
  number_Tr,
}: ITabletSkeletonProps) {
  return (
    <TableContainer
      whiteSpace="nowrap"
      h="80%"
      w="full"
      borderTopRadius="10px"
      overflowY="auto"
    >
      <Table variant="unstyled" size="sm">
        <Thead w="full" pos="relative">
          <Tr pos="sticky" top={0} zIndex={1000} h="40px" bg="#32394e">
            {head_options?.map((item, key) => (
              <Th key={key}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody pos="relative">
          {Array.from({ length: number_Tr || 15 }).map((_, idx) => (
            <Tr borderBottom="1px solid #32394e" key={idx}>
              {Array.from({ length: head_options?.length }).map((item, key) => (
                <Td key={key}>
                  <Skeleton height="30px" w="full" />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
