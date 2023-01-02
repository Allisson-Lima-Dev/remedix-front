import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import { theme } from '~/styles/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="google-site-verification"
            content="fRI-UdR0xUune55VjbwHaMNxR-VCQw5LrsUpdagUjDA"
          />
          {/* <meta property="og:url" content="https://allissonlima.com.br/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Allisson Lima - Portfólio" />
          <meta
            property="og:description"
            content="Olá, Seja Bem vindo! acesse e encontre mais informações sobre mim."
          />
          <meta
            property="og:image"
            content="https://allissonlima.com.br/assets/allisson.jpeg"
          /> */}
          {/* <meta property="og:image:type" content="image/jpeg" /> */}
          {/* <link
            itemProp="thumbnailUrl"
            href="https://allissonlima.com.br/assets/allisson.png"
          /> */}
          {/* <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Allisson Lima" /> */}

          {/* <!-- HTML Meta Tags --> */}
          {/* <meta
            name="description"
            content="Olá, Seja Bem vindo! acesse e encontre mais informações sobre mim."
          /> */}
          {/* <!-- Google / Search Engine Tags --> */}
          {/* <meta itemProp="name" content="Allisson Lima - Portfólio" />
          <meta
            itemProp="description"
            content="Olá, Seja Bem vindo! acesse e encontre mais informações sobre mim."
          />
          <meta
            itemProp="image"
            content="https://allissonlima.com.br/assets/allisson.jpeg"
          /> */}

          {/* <!-- Facebook Meta Tags --> */}
          {/* <meta property="og:url" content="https://allissonlima.com.br" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Allisson Lima - Portfólio" />
          <meta
            property="og:description"
            content="Olá, Seja Bem vindo! acesse e encontre mais informações sobre mim."
          />
          <meta
            property="og:image"
            content="https://allissonlima.com.br/assets/allisson.jpeg"
          /> */}

          {/* <!-- Twitter Meta Tags --> */}
          {/* <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Allisson Lima - Portfólio" />
          <meta
            name="twitter:description"
            content="Olá, Seja Bem vindo! acesse e encontre mais informações sobre mim."
          />
          <meta
            name="twitter:image"
            content="https://allissonlima.com.br/assets/allisson.jpeg"
          /> */}
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
