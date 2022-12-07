/* eslint-disable react/no-children-prop */
import React from 'react';
import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Input,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import dynamic from 'next/dynamic';
import { CardMetric } from '~/components';
import { TabletEmpaty } from '~/components/tablets/TabletEmpaty';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Home() {
  return (
    <Box w="full" p="30px">
      <Flex>
        <Box w="80%">
          <Text mb="20px" fontSize="3xl">
            Pedidos de Hoje
          </Text>
          <Flex w="90%" justify="space-between">
            <CardMetric amount={100} type="concluded" />
            <CardMetric amount={20} type="pending" />
            <CardMetric amount={10} type="lead-new" />
            <CardMetric amount={20} type="delivery" />
            <CardMetric amount={20} type="withdraw" />
          </Flex>
        </Box>
        <InputGroup w="300px">
          <InputRightElement
            pointerEvents="none"
            children={<Icon icon="ic:baseline-search" width={20} />}
          />
          <Input
            type="tel"
            name=""
            placeholder="Buscar Pedido"
            variant="outline"
          />
        </InputGroup>
      </Flex>
      <Flex minH="400px" w="full" justify="space-between" mt="30px">
        <Box
          bg="#161A2E"
          borderRadius="8px"
          border="1px solid #29304D"
          p="20px"
          w="45%"
        >
          <Chart
            type="area"
            width="100%"
            height="100%"
            series={[
              {
                name: 'Concluídos',
                data: [
                  {
                    x: '15/05',
                    y: 1260,
                  },
                  {
                    x: '5/05',
                    y: 560,
                  },
                  {
                    x: '25/05',
                    y: 10,
                  },
                  {
                    x: '04/05',
                    y: 500,
                  },
                ],
              },
              {
                name: 'Saídas',
                data: [
                  {
                    x: '10/05',
                    y: 50,
                  },
                  {
                    x: '02/05',
                    y: 860,
                  },
                  {
                    x: '27/05',
                    y: 10,
                  },
                  {
                    x: '25/05',
                    y: 150,
                  },
                ],
              },
              {
                name: 'Pendentes',
                data: [
                  {
                    x: '10/05',
                    y: 228,
                  },
                  {
                    x: '02/05',
                    y: 86,
                  },
                  {
                    x: '27/05',
                    y: 741,
                  },
                  {
                    x: '20/05',
                    y: 71,
                  },
                ],
              },
            ]}
            options={{
              chart: {
                background: 'none',
                id: 'apexchart-example',
                zoom: {
                  enabled: false,
                },
              },
              theme: {
                mode: 'dark',
              },
              title: { text: 'Relatório Semanal' },

              markers: {
                size: 5,
                colors: ['#000524'],
                strokeWidth: 3,
              },
              colors: ['#27AE60', '#AF52DE', '#FF9500', '#487cd0'],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: '100%',
                    },
                    legend: {
                      show: false,
                    },
                  },
                },
              ],
              fill: {
                type: 'gradient',
              },
              xaxis: {
                categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
              },
            }}
          />
        </Box>
        <Box
          w="55%"
          bg="#161A2E"
          borderRadius="8px"
          border="1px solid #29304D"
          ml="20px"
        >
          <TabletEmpaty
            head_options={[
              'N° Pedido',
              'Tipo',
              'Nome',
              'Telefone',
              'Data',
              'Total',
              'Status',
              'Ação',
            ]}
          />
        </Box>
      </Flex>
      <Box
        bg="#161A2E"
        borderRadius="8px"
        border="1px solid #29304D"
        p="20px"
        w="full"
        h="250px"
        mt="20px"
      >
        <Chart
          type="bar"
          width="100%"
          height="100%"
          series={[
            {
              name: 'N° Pedidos',
              data: [10, 25, 50, 16],
            },
          ]}
          options={{
            chart: {
              background: 'none',
              id: 'apexchart-example',
              zoom: {
                enabled: false,
              },
              // stacked: true,
              stackType: '100%',
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
                barHeight: '65px',
              },
            },
            // dataLabels: {
            //   enabled: false,
            // },
            theme: {
              mode: 'dark',
            },
            title: { text: 'Top List Pedidos' },

            colors: ['#27AE60'],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: '100%',
                  },
                  legend: {
                    show: false,
                  },
                },
              },
            ],
            fill: {
              type: 'gradient',
            },
            xaxis: {
              categories: ['Pizza', 'Hot-dog', 'Macarronada', 'Bebidas'],
            },
          }}
        />
      </Box>
    </Box>
  );
}
