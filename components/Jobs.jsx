import styles from '../styles/Jobs.module.css'
import Card from '../components/Card'
import Search from '../components/Search'
import { useState,useEffect } from 'react'
import DropDown from '../components/DropDown'
import Link from 'next/link'
export default function Jobs({jobs}) {
  const [searched,setSearched] = useState("");
  const [type,setType] = useState("");
  const [filteredJobs,setFilteredJobs] = useState(jobs);
  const requestSearch = (searchedVal) => {
    if(searchedVal == ""){
      setFilteredJobs(jobs)
    }
      const filter1 = jobs.filter((obj) => {
        return obj.title.toLowerCase().includes(searchedVal.toLowerCase());
      });
      const filtered = filter1.filter((obj) => {
        return obj.speciality.toLowerCase().includes(type.toLowerCase());
      });
      setFilteredJobs(filtered);
  };
  useEffect(()=>{
    requestSearch(searched);
},[searched,type])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.searchSection}>
          <div className={styles.searchWrapper}>
            <Search searched={searched} setSearched={setSearched}/>
          </div>
          <div className={styles.dropDownWrapper}>
            <DropDown setType={setType} type={type}/>
          </div>
        </div>
        <div className={styles.grid}>
          <Card jobs={filteredJobs}/>
        </div>
        <Link href={`/jobs/add`} passHref>
            <button className={`${styles.contentButton} ${styles.button} ${styles.statusButton}`}>Add</button>
        </Link>
      </main>
    </div>
  )
}
