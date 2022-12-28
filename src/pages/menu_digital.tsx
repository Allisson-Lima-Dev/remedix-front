import React from 'react';
import { Icon } from '@iconify/react';
import {
  Box,
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  IconButton,
  HStack,
  Switch,
  Center,
  Button,
  VStack,
  Image,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { ModalCreateCategory } from '~/components/modals/modalCreateCategory';
import { useMenuCompany } from '~/services/hooks/useMenuCompany';

export default function MenuDigital() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: dataMenuCategory } = useMenuCompany();
  return (
    <Box h="full" w="full">
      <Text>Menu Digital</Text>
      <Flex w="full" align="center" justify="space-between">
        <Button
          mt="20px"
          leftIcon={<Icon icon="material-symbols:add" />}
          onClick={onOpen}
        >
          Cadastrar Categoria
        </Button>

        <Box>
          <InputGroup w="290px">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon icon="ic:baseline-search" width={20} />}
            />

            <Input
              h="36px"
              type="tel"
              placeholder="Busque por categoria"
              variant="outline"
              //   onChange={(e) => {
              //     debouncedSearch(e.target.value);
              //   }}
            />

            <InputRightElement
              cursor="pointer"
              children={
                <Tooltip
                  label="Pesquise pelo nome do cliente ou n° do Pedido"
                  bg="yellow.500"
                  mt="5px"
                  mr="50px"
                  closeDelay={500}
                  color="#fff"
                >
                  <Icon icon="lucide:alert-circle" color="#cccccc86" />
                </Tooltip>
              }
            />
          </InputGroup>
        </Box>
      </Flex>
      {dataMenuCategory && dataMenuCategory.menu_company?.length === 0 && (
        <VStack bg="#121626b2" py="30px" mt="20px">
          <Image src="/assets/boxEmptyLight.png" w="10%" />
          <Text>Vazio</Text>
          <Text textAlign="center" mt="30px">
            Não existem Categorias listadas nesse momento.
          </Text>
          <Button
            mt="20px"
            leftIcon={<Icon icon="material-symbols:add" />}
            onClick={onOpen}
          >
            Inserir Categoria
          </Button>
        </VStack>
      )}

      <Accordion defaultIndex={[0]} allowMultiple>
        {dataMenuCategory &&
          dataMenuCategory?.menu_company?.map((item) => (
            <AccordionItem
              bg="#121626b2"
              border="none"
              my="20px"
              borderRadius="2px"
              borderLeft="3px solid #ccc"
              zIndex={1}
            >
              <AccordionButton
                h="75px"
                borderBottom="2px solid #cccccc1d"
                zIndex={1}
              >
                <AccordionIcon fontSize={30} />
                <Flex align="center" w="full" justify="space-between" ml="7px">
                  <Box textAlign="left">
                    <Text color="#fff" fontSize="18px">
                      {item.menu_name}
                    </Text>
                    <Text color="#cccc">Nenhum Item</Text>
                  </Box>
                  <HStack>
                    <Center mr="5px">
                      <Switch size="md" />
                      <Text ml="5px">Ativo</Text>
                    </Center>
                    <IconButton
                      zIndex={2}
                      variant="unstyled"
                      onClick={() => console.log('Oii')}
                      aria-label="Search database"
                      icon={<Icon icon="carbon:edit" width={25} />}
                    />
                    <IconButton
                      variant="unstyled"
                      aria-label="Search database"
                      icon={
                        <Icon
                          icon="material-symbols:delete-outline"
                          width={25}
                        />
                      }
                    />
                  </HStack>
                </Flex>
              </AccordionButton>
              <AccordionPanel p={4} maxH="400px">
                <VStack my="20px" color="#ccc">
                  <Text textAlign="center">
                    Não existem itens listados nesta categoria no momento.
                  </Text>
                  <Text textAlign="center">
                    Portanto, ela não está disponível para os clientes
                    visualizarem no Menu Digital. Está atualmente vazia.
                  </Text>
                  <Button
                    mt="20px"
                    leftIcon={<Icon icon="material-symbols:add" />}
                  >
                    Inserir Item
                  </Button>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
      <ModalCreateCategory isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
