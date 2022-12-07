import React from 'react'
import styles from '../styles/Jobs.module.css'
import EquipmentCard from './EquipmentCard'
import Search from './Search'
import { useState,useEffect } from 'react'
import DropDown from './DropDown'

const Employeers = ({equipments}) => {
    const [searched,setSearched] = useState("");
    const [type,setType] = useState("");
    const [filteredEquipments,setFilteredEquipments] = useState(equipments);
    const requestSearch = (searchedVal) => {
      if(searchedVal == ""){
        setFilteredEquipments(equipments);
      }
        const filter1 = equipments.filter((obj) => {
          return obj.name?.toLowerCase().includes(searchedVal.toLowerCase());
        });
        const filtered = filter1.filter((obj) => {
          return obj.name?.toLowerCase().includes(type.toLowerCase());
        });
        setFilteredEquipments(filtered);
    };
    useEffect(()=>{
      requestSearch(searched);
      console.log(equipments)
    },[searched,type])
  return (
      <div className={styles.container}>
        <main className={styles.main}>
            <div className={styles.searchSection}>
                <div className={styles.searchWrapper}>
                  <Search searched={searched} setSearched={setSearched}/>
                </div>
            </div>
            <div className={styles.grid}>
              <EquipmentCard equipments={filteredEquipments}/>
            </div>
        </main>
    </div>
  )
}

export default Employeers
