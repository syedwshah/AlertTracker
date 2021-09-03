import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import {theme} from './constants/theme'

const App = () => {
  const [isReady, setIsReady] = React.useState<boolean>(false)

  React.useEffect(() => {
    //connect to server

    //make ready
    setIsReady(true)
  }, [])

  return (
    <ThemeProvider theme={theme}>
    </ThemeProvider>
  );
}

export default App;
