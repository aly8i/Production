import styles from "../styles/Home.module.css";
import AboutCards from "../components/AboutCards";
import CubeSlider from "../components/CubeSlider";
import Mobile from "../components/Mobile";
export default function Home() {

  return (
    <>
      <CubeSlider/>
      <div className={styles.grid}>
        <AboutCards/>
      </div>
      <Mobile/>
    </>

  );
}
