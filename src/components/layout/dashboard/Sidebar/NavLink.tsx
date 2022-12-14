import {
  Link as ChakraLink,
  Text,
  LinkProps as ChakraLinkProps,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { Icon, Icon as IconName } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ElementType, Fragment } from 'react';
import { ActiveLink } from '../ActiveLink';
import { useColorModeDefault } from '~/styles/colorMode';

interface IPropsSubMenu<T = string> {
  title: T;
  route: T;
}

interface NavLinkProps extends ChakraLinkProps {
  // icon: ElementType;
  icon: string;
  children: string;
  href: string;
  activeDrawer?: boolean;
  subMenu?: Array<IPropsSubMenu>;
  indiceSubMenu?: number;
}

export function NavLink({
  icon,
  children,
  href,
  activeDrawer,
  subMenu,
  indiceSubMenu = 0,
  ...rest
}: NavLinkProps) {
  const { asPath } = useRouter();
  const { bg, text_color } = useColorModeDefault();
  return activeDrawer ? (
    <Box w="full">
      <Accordion
        allowToggle
        // w="80%"
        transition="all 0.5s"
        w="full"
        defaultIndex={
          subMenu?.find((item) => item.route === asPath) ? [indiceSubMenu] : []
        }
      >
        <AccordionItem w="full" borderY="none" isFocusable>
          <AccordionButton
            _hover={{
              bg: subMenu?.find((item) => item.route === asPath)
                ? '#3c7df4'
                : '',
            }}
            bg={subMenu?.find((item) => item.route === asPath) ? '#4988FA' : ''}
            borderRadius="5px"
            p="5px 10px"
            w="full"
            // p="0"
            transition="all linear .55s"
          >
            <ChakraLink display="flex" alignItems="center" {...rest} w="full">
              <Icon
                icon={icon}
                fontSize="20"
                color={
                  subMenu?.find((item) => item.route === asPath)
                    ? '#eeeef0'
                    : '#656d86'
                }
              />
              <Text
                ml="4"
                fontWeight="medium"
                fontSize="14px"
                color={
                  subMenu?.find((item) => item.route === asPath)
                    ? '#eeeef0'
                    : '#656d86'
                }
              >
                {children}
              </Text>
            </ChakraLink>

            {!!subMenu?.length && <AccordionIcon w="16px" />}
          </AccordionButton>
          <AccordionPanel pb="0" transition="all linear .55s" ml="10px">
            {subMenu?.map((item, idx) => (
              <Fragment key={idx}>
                <Link href={item.route}>
                  <ChakraLink
                    display="flex"
                    alignItems="center"
                    {...rest}
                    w="full"
                  >
                    <Box />
                    <Text
                      ml="4"
                      my="5px"
                      fontWeight="medium"
                      fontSize="14px"
                      color={item.route === asPath ? '#eeeef0' : '#656d8694'}
                      transition="all linear .55s"
                      _hover={{ color: '#eeeef0' }}
                    >
                      {item.title}
                    </Text>
                  </ChakraLink>
                </Link>
              </Fragment>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  ) : (
    <ActiveLink href={href} passHref checkHref={href}>
      <ChakraLink
        cursor={href === '/chat' ? 'not-allowed' : 'pointer'}
        display="flex"
        alignItems="center"
        bg={href === asPath ? '#4988FA' : ''}
        borderRadius="5px"
        p="5px 10px"
        {...rest}
      >
        <Icon
          icon={icon}
          fontSize="20"
          color={href === asPath ? '#eeeef0' : '#656d86'}
        />
        <Text
          ml="4"
          fontWeight="medium"
          fontSize="14px"
          color={href === asPath ? '#eeeef0' : '#656d86'}
        >
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
