import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Text,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '~/components';
import { SignInRequestData } from '~/types/auth';
import { useAuthContext } from '~/context/AuthContext';

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email Obrigatório'),
  password: yup.string().required('Senha Obrigatória'),
});

const userAuth = {
  email: process.env.NEXT_PUBLIC_USER,
  password: process.env.NEXT_PUBLIC_PASSWORD,
};
export default function Login() {
  const [isLarge1300] = useMediaQuery(['(max-width: 1400px)']);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { signIn } = useAuthContext();
  const { register, handleSubmit, formState } = useForm<SignInRequestData>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: userAuth,
  });

  async function handleSignIn(data: SignInRequestData) {
    setLoading(true);
    console.log(data);
    await signIn(data)
      .catch((err) => {
        toast({
          title: err.message,
          status: 'error',
          variant: 'solid',
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Flex
      dir="row"
      width="100%"
      minH="100vh"
      bgGradient="linear(115.77deg, #23285F 31.56%, #232d64 35.5%, #243B73 52%, #25457E 144.16%, #25457E 100.16%)"
      overflow="hidden"
    >
      <Flex
        // bgImage="/assets/login.jpg"
        w="60%"
        objectFit="cover"
        bgPos="top"
        // bgRepeat="no-repeat"
        display={{ base: 'none', lg: 'flex' }}
        // p="30px"
      >
        <Image src="/assets/login.jpg" w="full" objectFit="cover" />
      </Flex>
      {/* <Image src="/assets/login.svg" w="50%" /> */}
      <Flex
        flex={{
          base: '1',
          sm: '1',
          md: '1.5',
          lg: '1',
        }}
        bg="#212735"
        justify="center"
        align="center"
        direction="column"
        pt="25px"
        pos="relative"
      >
        {/* <Image
          src="/assets/test.png"
          w="180px"
          h="180px"
          zIndex={1000}
          pos="absolute"
          top={0}
          left={0}
        />

        <Image
          zIndex={1000}
          src="/assets/test2.png"
          w="310px"
          h="310px"
          pos="absolute"
          bottom="-180px"
          right="-150px"
        /> */}
        <Flex
          // bg="#212735"
          // pos="absolute"
          // sx={{ zIndex: 1300 }}
          // border="1px solid #cccccc1f"
          // borderRadius="10px"
          // boxShadow="dark-lg"
          as="form"
          onSubmit={handleSubmit(handleSignIn)}
          mt="25px"
          direction="column"
          // maxW="600px"
          w={{ base: '90%', lg: isLarge1300 ? '80%' : '55%' }}
          mx="auto"
          pl="25px"
          pr="25px"
          py={{ base: '30px', lg: '100px' }}
        >
          <Image
            // display={{ base: 'flex', lg: 'none' }}
            src="/assets/logo.png"
            // mx="auto"
            w="45px"
            // h="40px"
            mb="10px"
          />
          <Text
            color="#4988FA"
            mb={{ base: '10px', lg: '20px' }}
            // mt="-40px"
            fontWeight="bold"
            fontSize={{ base: '18px', lg: '22px' }}
          >
            Bem vindo a Redix
          </Text>
          <Input
            bg="#2E3346"
            color="white"
            label="Email"
            labelColor="#c7d6d1"
            mb="25px"
            {...register('email')}
            error={formState?.errors?.email}
          />
          <Input
            bg="#2E3346"
            color="white"
            label="Senha"
            labelColor="#c7d6d1"
            type="password"
            {...register('password')}
            error={formState?.errors?.password}
          />
          <Button
            mt="35px"
            bg="#4988FA"
            _hover={{
              bg: '#437be3',
            }}
            _active={{
              bg: '#2e70ec',
            }}
            color="white"
            type="submit"
            isLoading={loading}
          >
            Entrar
          </Button>
          {/* <Checkbox mt="25px" color="#c7d6d1">
            Lembrar de mim
          </Checkbox> */}
          <Link href="/recovery">
            <Text
              color="#4988FA"
              mt="25px"
              textDecor="underline !important"
              cursor="pointer"
            >
              Esqueci minha senha
            </Text>
          </Link>
          <Flex dir="row" mt="25px" color="#4988FA">
            {/* <Text color="#c7d6d1" mr="5px">
              Ainda não tem uma conta?
            </Text> */}
            {/* <Link href="/register">
              <a>Criar agora</a>
            </Link> */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
