import 'bootstrap/dist/css/bootstrap.css'
import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import {SessionProvider} from "next-auth/react";
import { useRouter } from "next/router";
import { StyledEngineProvider } from '@mui/material/styles';

import Layout from "../components/Layout";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const url = router.asPath
  return (
    <>
    <SessionProvider session={session}>
      <StyledEngineProvider>
        <Provider store={store}>
          <Layout url={url}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </StyledEngineProvider>
    </SessionProvider>
    </>
  )
  
}

export default MyApp