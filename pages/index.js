import styles from "../styles/Home.module.css";
import AboutCards from "../components/AboutCards";
import CubeSlider from "../components/CubeSlider";
import Mobile from "../components/Mobile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Home({nav}) {

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
export async function getServerSideProps() {
  return {
    props: {
      nav: "/",
    }, // will be passed to the page component as props
  }
}
