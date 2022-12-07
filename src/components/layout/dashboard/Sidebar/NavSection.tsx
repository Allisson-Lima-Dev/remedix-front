import { Box, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box w="full">
      <Text fontWeight="bold" color="#6a7187" fontSize="10px">
        {title}
      </Text>
      <Stack mt="4" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
