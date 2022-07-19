import React, {Suspense} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import {QueryClientProvider, QueryClient} from 'react-query';
import {ThemeProvider, Global} from '@emotion/react';
import Router from '@routes/Router';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

import {GlobalStyle, theme} from '@styles/.';
import {Layout} from '@components/layout';
import Loading from '@components/common/Loading';

const MuiTheme = createTheme();

export default function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <MuiThemeProvider theme={MuiTheme}>
            <ThemeProvider theme={theme}>
              <Global styles={GlobalStyle} />
              <Suspense fallback={<Loading />}>
                <Layout>
                  <Router />
                </Layout>
              </Suspense>
            </ThemeProvider>
          </MuiThemeProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
