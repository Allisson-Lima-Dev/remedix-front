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
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(ctx);
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/requests/download`);
  const data = await res.arrayBuffer();
  const result = new DataView(data);
  fs.writeFileSync(`public/cv.html`, result);
  console.log(data);

  // Pass data to the page via props
  return { props: {} };
};
