import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = ({ children , url}) => {

  return (
    <>
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
    </>
  );
};

export default Layout;
