
import React from 'react';
import { Global, css } from '@emotion/react';

const lightTheme = `
  --text: black;
  --background: #F9F9F9;
  --boxBackground: #F9F9F9;
  --header: #F9F9F9;
  --boxShadow:rgba(0, 0, 0, 0.1);
  --homeDetail:#EFEFEF;
  --profileLink :#0075FF;
  --whiteBlack :#ffffff;
`;

const darkTheme = `
  --text: #EFEFEF;
  --background: #1F1F1F;
  --boxBackground: #383737;
  --header: #282828;
  --boxShadow:#383737;
  --homeDetail:#1F1F1F;
  --profileLink :#8CACFF;
  --whiteBlack : #2e2e2e;
`;

const cssVar = (name: string) => `var(--${name})`;

export const themedPalette = {
  text: cssVar('text'),
  background: cssVar('background'),
  boxBackground: cssVar('boxBackground'),
  header: cssVar('header'),
  boxShadow: cssVar('boxShadow'),
  homeDetail: cssVar('homeDetail'),
  profileLink: cssVar('profileLink'),
  whiteBlack: cssVar('whiteBlack'),
};

const style = css`
body {
    ${lightTheme};
  }
  
  @media (prefers-color-scheme: dark) {
    html {
    color-scheme: dark;
    }
    body {
      ${darkTheme}
    }
  }
  body[data-theme='light'] {
    ${lightTheme};
  }
  
  body[data-theme='dark'] {
    ${darkTheme};
  }
`;

const GlobalStyle = () => {
    return <Global styles={style} />;
};

export default GlobalStyle;