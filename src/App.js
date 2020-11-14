import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from './theme/GlobalStyles';
import {useTheme} from './theme/useTheme';

import ThemeSelector from './ThemeSelector';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

function App() {
  const [theme, themeLoaded] = useTheme();
  const [font,setFont] = useState(theme.font);
  
 useEffect(() => {
    WebFont.load({
      google: {
        families: [theme.font]
      },
      fontinactive: function(familyName, fvd) {setFont(theme.font)},
      active: function() {setFont(theme.font)}
    });
  });

  useEffect(() => {
    setFont(theme.font);
  }, [themeLoaded])

  return (
    <>
    {
      themeLoaded && <ThemeProvider theme={ theme }>
        <GlobalStyles/>
        <Container style={{fontFamily:font}}>
          <h1>Hi, This is for test.. We will change things later!</h1>
          <ThemeSelector />
        </Container>
      </ThemeProvider>
    }
    </>
  );
}

export default App;
