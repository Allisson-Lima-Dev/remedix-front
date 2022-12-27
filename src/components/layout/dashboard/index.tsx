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
  const [hideSide, setHideSide] = useState(true);
  return (
    <Box w="full" color="#fff" transition="all 0.55s">
      <Flex overflowY="hidden" w="full">
        <Box display={{ base: 'none', lg: 'flex' }}>
          <Sidebar hide={hideSide} />
        </Box>
        <Box
          // bg="#0A0D16"
          bg="#0a0f1e"
          w="full"
          overflowY="hidden"
          transition="all 0.55s"
        >
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
                background: '#4988FA',
                width: '5px',
                borderRadius: '24px',
              },
            }}
            w="full"
            transition="all 0.55s"
            p={{ base: '17px', md: '20px' }}
            h="calc(100vh - 70px)"
            overflowY="scroll"
          >
            <Text as="h3" mb="10px" textTransform="uppercase" fontWeight="600">
              {title}
            </Text>
            <Box
              maxW="2500px"
              mx="auto"
              transition="all 0.55s"
              // bg="#121626b2"
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
