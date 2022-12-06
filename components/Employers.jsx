import React from 'react'
import styles from '../styles/Jobs.module.css'
import EmployeerCard from './EmployeerCard'
import Search from './Search'
import { useState,useEffect } from 'react'
import DropDown from './DropDown'
import Link from 'next/link'

const Employeers = ({users}) => {
    const [searched,setSearched] = useState("");
    const [type,setType] = useState("");
    const [filteredUsers,setFilteredUsers] = useState(users);
    const requestSearch = (searchedVal) => {
      if(searchedVal == ""){
        setFilteredUsers(users);
      }
        const filter1 = users.filter((obj) => {
          return (obj.fullname?.toLowerCase().includes(searchedVal.toLowerCase())||obj.speciality?.toLowerCase().includes(searchedVal.toLowerCase()))&&obj.view?.toLowerCase().includes("employeer");
        });
        const filtered = filter1.filter((obj) => {
          return obj.fullname?.toLowerCase().includes(type.toLowerCase());
        });
        setFilteredUsers(filtered);
    };
    useEffect(()=>{
      requestSearch(searched);
      console.log(users)
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
              <EmployeerCard users={filteredUsers} type="employeer"/>
            </div>
        </main>
    </div>
  )
}

export default Employeers
