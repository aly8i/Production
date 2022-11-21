import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import AboutCards from "../components/AboutCards";
import CubeSlider from "../components/CubeSlider";
export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Light Studios</title>
        <meta name="description" content="#1 Production Crew" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
      </Head>
      <main className={styles.main}>
        {/* <Slider/> */}
        <CubeSlider/>
        <div className={styles.grid}>
          <AboutCards/>
        </div>
      </main>
    </div>
  );
}
