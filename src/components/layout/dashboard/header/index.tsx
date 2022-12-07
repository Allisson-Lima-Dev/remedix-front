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
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { BiChevronDown, BiSearchAlt } from 'react-icons/bi';
import { FaRegBell } from 'react-icons/fa';
import { Icon } from '@iconify/react';
import Router, { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import Sidebar from '../Sidebar';
import { AuthContext } from '~/context/AuthContext';
import { clearLocalStorage } from '~/utils/localStorageFormat';

interface IMenuProps {
  name: string;
  path: any;
  icon: any;
  subMenu?: any[];
}
interface IPropsHeader {
  onPress: (click: boolean) => void;
}

const routes: IMenuProps[] = [
  {
    name: 'Painel',
    path: '/',
    // path: ['/payment', '/payment/review'],
    icon: 'material-symbols:dashboard-outline',
    // subMenu: [],
  },
  {
    name: 'Pedidos',
    path: '/requests',
    // path: ['/payment', '/payment/review'],
    icon: 'ic:outline-pending-actions',
    // subMenu: [],
  },
  {
    name: 'Chat',
    path: '/chat',
    // path: ['/payment', '/payment/review'],
    icon: 'teenyicons:chat-outline',
    // subMenu: [],
  },
  {
    name: 'Gestão',
    path: '/financial',
    // path: ['/payment', '/payment/review'],
    icon: 'grommet-icons:money',
    // subMenu: [],
  },
  // {
  //   name: 'Clientes',
  //   path: '/',
  //   icon: 'ant-design:bank-outlined',
  //   subMenu: [
  //     {
  //       name: 'Clientes',
  //       path: '/',
  //     },
  //     {
  //       name: 'Adicionar Cliente',
  //       path: '/batch-customer',
  //     },
  //     {
  //       name: 'Links',
  //       path: '/links',
  //     },
  //   ],
  // },
];

export default function HeaderDashboard({ onPress }: IPropsHeader) {
  const [lg] = useMediaQuery('(min-width: 990px)');
  const { push, asPath } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const btnRef = React.useRef(null);
  const [click, setClick] = useState(false);
  function signOut() {
    destroyCookie(null, '@NeuralAnalyticsAccess_token', { path: '/' });
    destroyCookie(null, '@NeuralAnalyticsRefresh_token', { path: '/' });
    clearLocalStorage();
    Router.push('/');
  }

  return (
    <Flex
      justify="space-between"
      bg="#121626"
      boxShadow="base"
      color="#fff"
      px="30px"
      h="70px"
      alignItems="center"
      borderBottom="1px solid #2C3045"
    >
      <Box cursor="pointer" w="full">
        <Flex w="full" align="center" h="100%">
          <Link href="/">
            <Image
              src="https://avatars.githubusercontent.com/u/82707621?s=96&v=4"
              width="50px"
              height="40px"
              loading="lazy"
              mr="50px"
              alt="logo"
            />
          </Link>
        </Flex>
      </Box>

      <Flex
        align="center"
        w="full"
        // mr="50px"
        display={{ base: 'none', lg: 'flex' }}
        justify="right"
      >
        {routes.map((item, idx) => {
          const route = item.name === 'PAGAMENTOS' ? item.path[0] : item.path;
          return item.subMenu ? (
            <Link
              href={route as string}
              key={idx}
              // style={{ background: 'red' }}
            >
              <Flex mr="20px" align="center">
                <Icon
                  icon={item.icon}
                  color={item.path === asPath ? '#eeeef0' : '#4e4ee971'}
                  width={25}
                />
                <Text
                  ml="10px"
                  color={item.path === asPath ? '#eeeef0' : '#2f2f98'}
                  size="1rem"
                  fontWeight="700"
                >
                  {item.name}
                </Text>
                <Icon icon="bx:chevron-down" color="#eeeef0" width={20} />
              </Flex>
            </Link>
          ) : idx === 2 ? (
            <Box cursor="not-allowed">
              <Flex mr="20px" align="center">
                <Icon
                  icon={item.icon}
                  color={item.path === asPath ? '#eeeef0' : '#eeeef032'}
                  width={25}
                />
                <Text
                  ml="10px"
                  color={item.path === asPath ? '#eeeef0' : '#eeeef033'}
                  size="1rem"
                  fontWeight="700"
                >
                  {item.name}
                </Text>
              </Flex>
            </Box>
          ) : (
            <Link
              href={idx === 2 ? '' : (route as string)}
              key={idx}
              style={{ cursor: 'pointer' }}
            >
              <Flex
                mr="28px"
                cursor="pointer"
                align="center"
                pb="5px"
                borderBottom={item.path === asPath ? '3px solid #fff' : ''}
              >
                <Icon
                  icon={item.icon}
                  color={item.path === asPath ? '#eeeef0' : '#eeeef099'}
                  width={25}
                />
                <Text
                  ml="10px"
                  color={item.path === asPath ? '#eeeef0' : '#eeeef099'}
                  size="1rem"
                  fontWeight="700"
                >
                  {item.name}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
      <Flex align="center" mr="10px">
        <Avatar
          size="sm"
          name={user?.name}
          // src="https://bit.ly/sage-adebayo"
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
              name={user?.name}
              // src="https://bit.ly/sage-adebayo"
              display={{ base: 'flex', md: 'none' }}
            />
            <Flex
              display={{ base: 'none', md: 'flex' }}
              justify="center"
              alignItems="center"
              ml="7px"
              color="#eeeef0"
            >
              <Text>{user?.name.split(' ')[0]}</Text>
              <BiChevronDown size="15px" />
            </Flex>
          </MenuButton>
          <MenuList bg="#2A2F42" color="#fff" border="none" zIndex={3000}>
            <MenuItem
              _hover={{ bg: '#222633' }}
              _focus={{ bg: '#222633' }}
              onClick={() => push('/profile')}
            >
              Perfil
            </MenuItem>
            <MenuItem
              _hover={{ bg: '#222633' }}
              _focus={{ bg: '#222633' }}
              onClick={signOut}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Box
        // ref={btnRef}
        // ml="15px"
        onClick={onOpen}
        display={{ base: 'flex', lg: 'none' }}
      >
        <HiMenu size="22px" color="#a6b0cf" />
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

          <DrawerBody>
            <Sidebar />
          </DrawerBody>

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
