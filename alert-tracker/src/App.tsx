import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import { AlertProvider } from './contexts/AlertContext';
import AlertExample from "./components/AlertExample";
import {theme} from './constants/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <AlertExample />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
