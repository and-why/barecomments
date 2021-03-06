import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  }
});

export default theme;
