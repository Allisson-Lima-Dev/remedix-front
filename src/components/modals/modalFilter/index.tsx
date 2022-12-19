import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Input } from '~/components/input';
import { Modal } from '../modalDefault';

interface IModalFilerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalFilter({ isOpen, onClose }: IModalFilerProps) {
  const dateRef = useRef<any>();
  const dateRef2 = useRef<any>();
  const dates = [5, 15, 30, 60];
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="FILTRAR POR PERÍODO">
      <Box
        as="form"
        // onSubmit={handleSubmit(handleDowloadExtract)}
      >
        <Flex
          align="center"
          w="full"
          justify="space-between"
          mb="15px"
          // minH="80px"
        >
          <Box w="full" mr="20px">
            <Input
              cursor="pointer"
              ref={dateRef}
              onClick={() => dateRef.current?.showPicker()}
              label="De:"
              labelColor="#A6B0CF"
              name=""
              w="full"
              size="sm"
              bg="#252B3B"
              color="#A6B0CF"
              type="date"
              fontSize="16px"
              border="1px"
              borderColor="#A6B0CF"
              borderRadius="5px"
              p="15px"
              //   value={filterStart}
              //   onChange={(e) => {
              //     setFilterDate('');
              //     setActiveFilter(false);
              //     setFilterStart(e.target.value);
              //   }}
              placeholder="dd/mm/aaaa"
              _focus={
                {
                  // borderBottom: '1px solid #2E4EFF',
                }
              }
              // {...register('date_start')}
              // error={formState?.errors?.date_start}
            />
          </Box>
          <Box w="full">
            <Input
              ref={dateRef2}
              onClick={() => dateRef2.current?.showPicker()}
              name=""
              label="Até:"
              labelColor="#A6B0CF"
              w="full"
              size="sm"
              bg="#252B3B"
              color="#A6B0CF"
              type="date"
              fontSize="16px"
              border="1px"
              borderColor="#A6B0CF"
              borderRadius="5px"
              p="15px"
              //   value={filterEnd}
              //   onChange={(e) => {
              //     setFilterDate('');
              //     setActiveFilter(false);
              //     setFilterEnd(e.target.value);
              //     if (filterStart) {
              //       setTimeout(() => onCloseFilter(), 1000);
              //     }
              //   }}
              placeholder="dd/mm/aaaa"
              _focus={
                {
                  // borderBottom: '1px solid #2E4EFF',
                }
              }
              // {...register('date_end')}
              // error={formState?.errors?.date_end}
            />
          </Box>
        </Flex>
        <Text color="#A6B0CF">Últimos:</Text>
        <Flex w="65%" justify="space-between">
          {dates.map((day, key) => (
            <Button
              mt="5px"
              key={key}
              transition="all linear .55s"
              variant="unstyled"
              w="67px"
              h="26"
              fontSize="14px"
              borderRadius="5px"
              border="1px solid #A6B0CF"
              //   borderColor={+filterDate === day ? '#556ee6' : '#A6B0CF'}
              //   color={+filterDate === day ? '#fff' : '#A6B0CF'}
              //   bg={+filterDate === day ? '#556ee6' : '#252B3B'}
              //   onClick={() => {
              //     setFilterStart(formatPrevDate(day));
              //     setFilterEnd('');
              //     setActiveFilter(!activeFilter);
              //     if (+day !== +filterDate) {
              //       setCurrentPage(1);
              //       setFilterDate(day.toString());
              //       onCloseFilter();
              //       return;
              //     }
              //     if (!activeFilter) {
              //       setCurrentPage(1);
              //       setFilterDate(day.toString());
              //       onCloseFilter();
              //       return;
              //     }
              //     setFilterDate('');
              //   }}
            >
              {day} dias
            </Button>
          ))}
        </Flex>
        <Flex
          my="20px"
          h="35px"
          color="#A6B0CF"
          _hover={{
            border: '1px solid #556ee6',
            bg: '#556ee6',
            color: '#ffff',
            px: '10px',
          }}
          p="5px"
          borderColor="transparent"
          transition="all linear .55s"
          borderRadius="7px"
          cursor="pointer"
          // flexDir="row-reverse"
          w="-webkit-max-content"
          align="center"
          //   onClick={() => {
          //     setFilterDate('');
          //     setFilterStart('');
          //     setFilterEnd('');
          //     onCloseFilter();
          //   }}
        >
          <Icon icon="ep:delete" width={20} />
          <Text ml="5px">Limpar Filtro</Text>
        </Flex>
      </Box>
    </Modal>
  );
}
