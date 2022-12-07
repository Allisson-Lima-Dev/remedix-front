import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Flex,
  Box,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import { Icon } from '@iconify/react';
// import { FieldError } from 'react-hook-form';

interface IInputProps extends ChakraInputProps {
  name: string;
  bgHover?: string;
  bgFocus?: string;
  bgPlaceholder?: string;
  label?: string;
  labelColor?: string;
  error?: FieldError;
  seePasswordButtonColor?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  {
    name,
    bgHover,
    bgFocus,
    bgPlaceholder,
    label,
    labelColor,
    error = null,
    seePasswordButtonColor,
    ...rest
  },
  ref
) => {
  const [visible, setVisible] = useState(false);
  return (
    <Box>
      <FormControl isInvalid={!!error}>
        {!!label && (
          <FormLabel
            fontWeight="bold"
            htmlFor={name}
            color={labelColor || '#667'}
            textTransform="capitalize"
            fontSize={{ base: '12px', md: '14px', lg: '14px' }}
          >
            {label}
          </FormLabel>
        )}
        <ChakraInput
          name={name}
          id={name}
          fontSize={{ base: '12px', md: '14px', lg: '14px' }}
          variant="filled"
          _hover={{
            bg: bgHover,
          }}
          _focus={{
            bg: bgFocus,
          }}
          _placeholder={{
            color: bgPlaceholder,
          }}
          ref={ref}
          {...rest}
          type={
            rest.type === 'password'
              ? visible
                ? 'text'
                : 'password'
              : rest.type
          }
        />
        {rest.type === 'password' && (
          <Flex position="absolute" right="10px" top={error ? '43%' : '60%'}>
            <Icon
              width="20px"
              cursor="pointer"
              color={seePasswordButtonColor || '#cacaca'}
              onClick={() => setVisible((previous) => !previous)}
              icon={
                visible ? 'ant-design:eye-invisible-outlined' : 'akar-icons:eye'
              }
            />
          </Flex>
        )}
        {!!error && (
          <FormErrorMessage mb="10px">{error.message}</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
};

export const Input = forwardRef(InputBase);