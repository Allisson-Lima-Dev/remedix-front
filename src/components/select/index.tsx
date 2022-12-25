import React, { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  colorLabel?: string;
  widthDefault?: any;
  error?: FieldError;
  disabled?: boolean;
  children: ReactNode;
  labelFontSize?: string;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  {
    name,
    label,
    colorLabel,
    widthDefault,
    error,
    disabled,
    labelFontSize,
    children,
    ...rest
  },
  ref
) => {
  return (
    <FormControl isInvalid={!!error} w={widthDefault || 'full'}>
      {!!label && (
        <FormLabel
          fontWeight="bold"
          htmlFor={name}
          color="#fff"
          textTransform="capitalize"
          fontSize={{ base: '12px', md: '14px', lg: '14px' }}
          mr="0"
        >
          {label}
        </FormLabel>
      )}
      <ChakraSelect
        id={name}
        name={name}
        fontSize="14px"
        iconColor="primary"
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {children}
      </ChakraSelect>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
