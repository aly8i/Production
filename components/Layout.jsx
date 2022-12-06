import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createTheme,ThemeProvider } from "@mui/material";
const Layout = ({ children , url}) => {

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <Head>
        <title>Light Studios</title>
        <meta name="description" content="#1 Production Crew" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navbar nav={url}/>
          {children}
        </main>
        <Footer/>
      </div>
    </ThemeProvider>
    </>
  );
};

export default Layout;
