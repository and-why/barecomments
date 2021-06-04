import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { css, Global } from '@emotion/react';

import { ChakraProvider, CSSReset, useColorMode } from '@chakra-ui/react';
import '@/styles/globals.css';
import theme from '@/styles/theme';
import { AuthProvider } from '@/lib/auth';
import SEO from '@/components/next-seo-config';
import { MDXProvider } from '@mdx-js/react';
import MDXComponents from '@/components/MDXComponents';

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <div>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </div>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <MDXProvider components={MDXComponents}>
          <DefaultSeo {...SEO} />
          <GlobalStyle />
          <Component {...pageProps} />
        </MDXProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
