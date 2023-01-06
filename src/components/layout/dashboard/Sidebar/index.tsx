import React, { useEffect, useState } from 'react';
import { Box, Flex, Stack, Image, Text } from '@chakra-ui/react';
import { Icon, Icon as IconName } from '@iconify/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';
import { useColorModeDefault } from '~/styles/colorMode';

interface IPropsSide {
  hide: boolean;
  onCloseDrawer?: () => void;
}

export default function Sidebar({
  hide: hideState,
  onCloseDrawer,
}: IPropsSide) {
  const [hide, setHide] = useState(false);
  const { bg, text_color } = useColorModeDefault();
  const subsMenu = {
    company: [
      {
        title: 'Painel',
        route: '/',
        icon: 'material-symbols:dashboard-outline',
      },
      {
        title: 'Pedidos',
        route: '/requests',
        icon: 'ic:outline-pending-actions',
        subMenu: [
          {
            title: 'Tempo real',
            route: '/requests',
          },
          {
            title: 'PDV',
            route: '/pdv',
          },
          {
            title: 'Todos',
            route: '/links',
          },
        ],
      },
      {
        title: 'Menu Digital',
        route: '/menu_digital',
        // path: ['/payment', '/payment/review'],
        icon: 'material-symbols:format-list-bulleted-rounded',
        // subMenu: [],
      },
      {
        title: 'Clientes',
        route: '/clients',
        // path: ['/payment', '/payment/review'],
        icon: 'mdi:users-group',
        // subMenu: [],
      },
      {
        title: 'Chat',
        route: '/chat',
        // path: ['/payment', '/payment/review'],
        icon: 'teenyicons:chat-outline',
        // subMenu: [],
      },
      {
        title: 'Gestão',
        route: '/financial',
        // path: ['/payment', '/payment/review'],
        icon: 'grommet-icons:money',
        // subMenu: [],
      },
    ],
    menu1: [
      {
        title: 'Login',
        route: '/login',
      },
      {
        title: 'Edit',
        route: '/profile',
      },
    ],
    menu2: [
      {
        title: 'Register',
        route: '/register',
      },
      {
        title: 'Test2',
        route: '/detailsRobot',
      },
    ],
  };
  const { asPath } = useRouter();

  useEffect(() => {
    setHide(hideState);
  }, [hideState]);

  return (
    <Box
      transition="all 0.5s"
      as="aside"
      maxW={hide ? '70px' : '210px'}
      // bg={bg}
      bg="#121626"
      p="10px"
      boxShadow="base"
      borderRight="1px solid #00f0f"
      // borderRight={`1px solid ${bg}`}
    >
      <Flex
        transition="all 0.55s"
        w={hide ? '30px' : '100%'}
        mb={hide ? '35px' : '25px'}
        h={hide ? '30px' : '60px'}
        mt={hide ? '7px' : '0'}
        justify="center"
      >
        <Image
          // display={{ base: 'flex', lg: 'none' }}
          src="/assets/logo.png"
          // mx="auto"
          // w="45px"
          // h="40px"
          mb="10px"
        />
        {/* <Image
          src="https://avatars.githubusercontent.com/u/82707621?s=96&v=4"
          w="70px"
          h="60px"
          loading="lazy"
        /> */}
      </Flex>
      <Stack
        spacing="5"
        align="center"
        pr={hide ? '0' : '5'}
        w="full"
        minW={hide ? '0' : '210px'}
        transition="all 0.5s"
      >
        {hide ? (
          subsMenu.company.map((item, idx) => (
            <Link
              href={item.route}
              passHref
              key={idx}
              onClick={() => {
                onCloseDrawer && onCloseDrawer();
                setHide(false);
              }}
            >
              <Flex
                w="full"
                justify="center"
                align="center"
                my="7px"
                transition="all 0.5s"
              >
                <Icon
                  icon={item.icon}
                  fontSize="23"
                  color={item.route === asPath ? '#4988FA' : '#656d86'}
                  style={{ cursor: 'pointer' }}
                />
              </Flex>
            </Link>
          ))
        ) : (
          <NavSection title="MENU">
            {subsMenu.company.map((item, idx) => (
              <NavLink
                activeDrawer={!!item.subMenu}
                subMenu={item.subMenu}
                icon={item.icon}
                href={item.route}
                key={idx}
                onClick={onCloseDrawer}
              >
                {item.title}
              </NavLink>
            ))}
          </NavSection>
        )}
      </Stack>
    </Box>
  );
}
