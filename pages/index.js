import Head from "next/head";
import styles from "../styles/Home.module.css";
import AboutCards from "../components/AboutCards";
import CubeSlider from "../components/CubeSlider";
import Mobile from "../components/Mobile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Light Studios</title>
        <meta name="description" content="#1 Production Crew" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar/>
        <CubeSlider/>
        <div className={styles.grid}>
          <AboutCards/>
        </div>
        <Mobile/>
      </main>
      <Footer/>
    </div>
  );
}
