import React from 'react'
import styles from '../styles/Jobs.module.css'
import EquipmentCard from './EquipmentCard'
import Search from './Search'
import { useState,useEffect } from 'react'

const Employeers = ({equipments}) => {
    const [searched,setSearched] = useState("");
    const [type,setType] = useState("");
    const [filteredEquipments,setFilteredEquipments] = useState(equipments);
    const requestSearch = (searchedVal) => {
      if(searchedVal == ""){
        setFilteredEquipments(equipments);
      }
      if(searchedVal.toLowerCase().includes("#")){
        const filter2 = equipments.filter((obj) => {
          return obj.tags.includes(searchedVal.toLowerCase().substring(1,80));
        });
        setFilteredEquipments(filter2);
        return
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
