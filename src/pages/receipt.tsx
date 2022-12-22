import fs from 'fs';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Layout } from '~/components';

export default function Receipt() {
  return (
    <Box h="full" w="full">
      <Layout>
        <Text>Recepeit</Text>
      </Layout>
    </Box>
  );
}
