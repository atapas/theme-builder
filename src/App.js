import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from './theme/GlobalStyles';
import {useTheme} from './theme/useTheme';

import ThemeSelector from './ThemeSelector';

import Dialog from './Dialog';

const Container = styled.div`
  margin: 5px auto 5px auto;
`;


function App() {
  const {theme, themeLoaded} = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [showDialog, setShowDialog] = useState(false);
  
 useEffect(() => {
    WebFont.load({
      google: {
        families: [selectedTheme.font]
      }
    });
  });

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  const manageDialog = () => {
    setShowDialog(!showDialog);
  }


  return (
    <>
    {
      themeLoaded && <ThemeProvider theme={ selectedTheme }>
        <GlobalStyles/>
        <Container style={{fontFamily: selectedTheme.font}}>
          <h1>Theme Builder</h1>
          <p>
            Hey, There! It's great when the control is with you. The theme builder
            helps you building a theme of your choice and apply it to test live. Why
            wait? Just give it a try.
          </p>
          <button className="btn" onClick={ manageDialog }>Create a Theme</button>
          <Dialog 
            header="Create Theme"
            body={<p>Body</p>}
            footer={<p>Footer</p>}
            open={ showDialog } 
            callback = { manageDialog }/>
          <ThemeSelector setter={setSelectedTheme}/>
        </Container>
      </ThemeProvider>
    }
    </>
  );
}

export default App;
