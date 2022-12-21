import React, { useState } from 'react';
import { Box, Flex, Icon, Stack, Image } from '@chakra-ui/react';
import { Icon as IconName } from '@iconify/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

interface IPropsSide {
  hide?: boolean;
  onCloseDrawer?: () => void;
}

export default function Sidebar({ hide, onCloseDrawer }: IPropsSide) {
  const subsMenu = {
    company: [
      {
        title: 'Customers',
        route: '/',
        icon: Icon,
        subMenu: [
          {
            title: 'View',
            route: '/',
          },
          {
            title: 'Validate',
            route: '/batch-customer',
          },
          {
            title: 'Links',
            route: '/links',
          },
        ],
      },
      {
        title: 'Financial',
        route: '/financial',
        icon: Icon,
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
  return (
    <Box
      as="aside"
      maxW={hide ? '70px' : '220px'}
      bg="#121626"
      p="10px"
      borderRight="1px solid #2C3045"
    >
      <Flex
        w={hide ? '30px' : '100%'}
        mb={hide ? '35px' : '25px'}
        h={hide ? '30px' : '60px'}
        mt={hide ? '7px' : '0'}
        justify="center"
      >
        <Image
          src="https://avatars.githubusercontent.com/u/82707621?s=96&v=4"
          w="70px"
          h="60px"
          loading="lazy"
        />
      </Flex>
      <Stack
        spacing="5"
        align="flex-start"
        pr={hide ? '0' : '5'}
        w="full"
        minW={hide ? '0' : '250px'}
      >
        {hide ? (
          subsMenu.company.map((item, idx) => (
            <Link href={item.route} passHref key={idx} onClick={onCloseDrawer}>
              <Flex w="full" justify="center" align="center" my="7px">
                <Icon
                  as={item.icon}
                  fontSize="23"
                  color={item.route === asPath ? '#eeeef0' : '#656d86'}
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
