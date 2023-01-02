import React, { useState } from 'react';
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
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Divider,
  Avatar,
} from '@chakra-ui/react';
import { ModalCreateCategory } from '~/components/modals/modalCreateCategory';
import { useMenuCompany } from '~/services/hooks/useMenuCompany';
import { ModalCreateItems } from '~/components/modals/modalCreateItems';
import { useColorModeDefault } from '~/styles/colorMode';

export default function MenuDigital() {
  const { bg_container, text_color, bg_tablet } = useColorModeDefault();
  const [id_category, setId_category] = useState('');
  const [type, setType] = useState<'new' | 'existing'>('new');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreateItem,
    onOpen: onOpenCreateItem,
    onClose: onCloseCreateItem,
  } = useDisclosure();
  const { data: dataMenuCategory, refetch } = useMenuCompany();
  return (
    <Box h="full" w="full" color={text_color}>
      <Text>Menu Digital</Text>
      <Flex w="full" align="center" justify="space-between">
        <HStack mt="20px">
          <Button
            // mt="20px"
            leftIcon={<Icon icon="material-symbols:add" />}
            onClick={onOpen}
          >
            Cadastrar Categoria
          </Button>
          <Button
            // mt="20px"
            leftIcon={<Icon icon="material-symbols:add" />}
            onClick={() => {
              setId_category('');
              setType('existing');
              onOpenCreateItem();
            }}
          >
            Cadastrar Item
          </Button>
        </HStack>

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
            onClick={() => {
              onOpen();
            }}
          >
            Inserir Categoria
          </Button>
        </VStack>
      )}

      <Accordion defaultIndex={[0]} allowMultiple>
        {dataMenuCategory &&
          dataMenuCategory?.menu_company?.map((item) => (
            <AccordionItem
              // bg="#121626b2"
              bg={bg_container}
              color={text_color}
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
                    <Text color={text_color} fontSize="18px">
                      {item.menu_name}
                    </Text>
                    <Text color="#cccc">
                      {item.items_menu?.length
                        ? `${item.items_menu?.length} Items`
                        : 'Nenhum Item'}
                    </Text>
                  </Box>
                  <HStack>
                    <Center mr="5px">
                      <Switch
                        size="md"
                        defaultChecked={item.active}
                        onChange={(e) => {
                          console.log(e.target.checked);

                          e.target.checked = !e.target.checked;
                        }}
                      />
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
              <AccordionPanel p="0" maxH="400px">
                {item.items_menu?.length ? (
                  <TableContainer
                    whiteSpace="nowrap"
                    w="full"
                    // borderTopRadius="8px"
                    overflowY="auto"
                    maxH="700px"
                    // mt="10px"
                  >
                    <Table variant="unstyled" size="sm">
                      <Thead w="full" pos="relative">
                        <Tr
                          pos="sticky"
                          top={0}
                          zIndex={1}
                          h="40px"
                          bg={bg_tablet}
                          // bg="#1E2540"
                          textAlign="center"
                        >
                          {[
                            'nome',
                            'Imagem',
                            'Valor',
                            'Descrição',
                            'Ativar',
                            'Datelhes',
                          ]?.map(
                            (name, key) =>
                              name?.trim() && (
                                <Th
                                  textAlign={
                                    key === 8 || key === 6 || key === 9
                                      ? 'center'
                                      : 'left'
                                  }
                                  key={key}
                                >
                                  {name}
                                </Th>
                              )
                          )}
                        </Tr>
                      </Thead>
                      <Tbody pos="relative">
                        {item.items_menu?.map((items, idx) => (
                          <Tr
                            borderBottom="1px solid #32394e"
                            key={idx}
                            _hover={{
                              bg: '#282e3f',
                            }}
                          >
                            <Td>{items?.title}</Td>
                            <Td>
                              {items?.image_product ? (
                                <Avatar
                                  size="md"
                                  src={
                                    items?.image_product ||
                                    'https://bit.ly/broken-link'
                                  }
                                />
                              ) : (
                                <Icon
                                  icon="majesticons:image-circle-line"
                                  width={35}
                                />
                              )}
                            </Td>

                            <Td>
                              {parseFloat(String(items.amount)).toLocaleString(
                                'pt-BR',
                                {
                                  style: 'currency',
                                  currency: 'BRL',
                                }
                              )}
                            </Td>
                            <Td>{items.description}</Td>
                            <Td>
                              <Switch />
                            </Td>
                            <Td justifyContent="center">
                              <Flex
                                border="1px solid #cccccc39"
                                boxShadow="2xl"
                                borderRadius="5px"
                                w="-webkit-fit-content"
                                p="5px"
                              >
                                <Icon icon="circum:menu-kebab" width={22} />
                              </Flex>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                ) : (
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
                      onClick={() => {
                        setId_category(item.id);
                        setType('new');
                        onOpenCreateItem();
                      }}
                      leftIcon={<Icon icon="material-symbols:add" />}
                    >
                      Inserir Item
                    </Button>
                  </VStack>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
      <ModalCreateCategory
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
      />
      <ModalCreateItems
        id={id_category}
        type={type}
        isOpen={isOpenCreateItem}
        onClose={onCloseCreateItem}
        refetch={refetch}
      />
    </Box>
  );
}
