/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useMediaQuery,
  Image,
  Center,
  Icon as IconChakra,
  Switch,
  useColorMode,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Router, { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import Sidebar from '../Sidebar';
import { AuthContext } from '~/context/AuthContext';
import { clearLocalStorage } from '~/utils/localStorageFormat';
import { useAdmin } from '~/services/hooks/me';
import { useColorModeDefault } from '~/styles/colorMode';

interface IMenuProps {
  name: string;
  path: any;
  icon: any;
  subMenu?: any[];
}
interface IPropsHeader {
  onPress: (click: boolean) => void;
}

export default function HeaderDashboard({ onPress }: IPropsHeader) {
  const [lg] = useMediaQuery('(min-width: 990px)');
  const { push, asPath } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const { colorMode, toggleColorMode, forced } = useColorMode();
  const { bg, text_color } = useColorModeDefault();
  const [isChecked, setIsChecked] = useState(colorMode === 'light');
  const [click, setClick] = useState(true);

  const { data } = useAdmin();

  function signOut() {
    destroyCookie(null, '@RemedixAccess_token', { path: '/' });
    clearLocalStorage();
    Router.push('/login');
  }
  console.log({ forced });

  return (
    <Flex
      justify="space-between"
      // bg="#121626"
      // bg="#13192b"
      bg={bg}
      boxShadow="base"
      color={text_color}
      px="30px"
      h="65px"
      alignItems="center"
      borderBottom={`1px solid ${bg}`}
    >
      <Center
        cursor="pointer"
        onClick={() => {
          setClick(!click);
          onPress(click);
        }}
      >
        <Icon icon="material-symbols:menu-rounded" width={25} />
      </Center>
      <HStack>
        <Flex
          w="47px"
          h="26px"
          borderRadius="20px"
          onClick={() => {
            setIsChecked(!isChecked);
            toggleColorMode();
          }}
          bg="#5e94f9af"
          cursor="pointer"
          pos="relative"
        >
          <Flex
            pl="2px"
            ml={colorMode === 'light' ? '45%' : '0%'}
            transition="all linear 0.25s"
            borderRadius="20px"
            align="center"
            w="full"
            bg={colorMode === 'light' ? '' : '#484747c5'}
          >
            <Box borderRadius="20px" bg="#1a365e" p="1px">
              <Icon
                icon={colorMode === 'light' ? 'ph:cloud-sun' : 'ph:moon-stars'}
                color="#fff"
                width={21}
              />
            </Box>
          </Flex>
        </Flex>
        <Center w="30px">
          <Icon icon="clarity:notification-solid" width={20} />
        </Center>

        <Flex align="center" mr="10px">
          <Avatar
            size="sm"
            name={data?.user_admin?.name}
            src={data?.user_admin?.avatarUrl}
            display={{ base: 'none', md: 'flex' }}
          />
          <Menu>
            <MenuButton
              transition="all 0.2s"
              borderRadius="md"
              w={{ base: '', md: 'full' }}
              fontSize="14px"
              border="none"
            >
              <Avatar
                size="sm"
                name={data?.user_admin?.name}
                src={data?.user_admin?.avatarUrl}
                display={{ base: 'flex', md: 'none' }}
              />
              <Flex
                display={{ base: 'none', md: 'flex' }}
                justify="center"
                alignItems="center"
                ml="7px"
                // color="#eeeef0"
              >
                <Text>{data?.user_admin?.name.split(' ')[0]}</Text>
                <Icon icon="material-symbols:keyboard-arrow-down-rounded" />
              </Flex>
            </MenuButton>
            <MenuList zIndex={2}>
              <MenuItem onClick={() => push('/profile')}>Perfil</MenuItem>
              <MenuItem onClick={signOut}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
      <Box
        // ref={btnRef}
        // ml="15px"
        onClick={onOpen}
        display={{ base: 'flex', lg: 'none' }}
      >
        <Icon icon="material-symbols:menu" color="#a6b0cf" width={22} />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bg="#2A2F42"
          // style={{ width: '250px' }}
          color="#fff"
          p="0"
        >
          <DrawerCloseButton />
          <DrawerHeader />

          <DrawerBody>{/* <Sidebar /> */}</DrawerBody>

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
