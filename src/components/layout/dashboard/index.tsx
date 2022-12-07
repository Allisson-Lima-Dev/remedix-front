import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import { Select } from '~/components/select';
import Sidebar from './Sidebar';
import HeaderDashboard from './header';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export function LayoutDashboard({ children, title }: LayoutProps) {
  const [hideSide, setHideSide] = useState(false);
  return (
    <Box w="full" color="#fff">
      <Flex overflowY="hidden" w="full">
        <Box display={{ base: 'none', lg: 'flex' }}>
          {/* <Sidebar hide={hideSide} /> */}
        </Box>
        <Box bg="#0A0D16" w="full" overflowY="hidden">
          <HeaderDashboard onPress={(click) => setHideSide(click)} />
          <Box
            __css={{
              '&::-webkit-scrollbar': {
                width: '10px',
                borderRadius: '24px',
                background: '#2C3045',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#485EC4',
                width: '5px',
                borderRadius: '24px',
              },
            }}
            w="full"
            p="25px"
            px={{ base: '17px', md: '25px' }}
            h="calc(100vh - 70px)"
            overflowY="scroll"
          >
            <Text as="h3" mb="10px" textTransform="uppercase" fontWeight="600">
              {title}
            </Text>
            <Box
              maxW="1600px"
              mx="auto"
              bg="#121626b2"
              borderRadius="8px"
              minH="calc(100vh - 130px)"
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
