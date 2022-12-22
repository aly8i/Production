import React from 'react'
import styles from '../styles/Jobs.module.css'
import EquipmentCard from './EquipmentCard'
import Search from './Search'
import { useState,useEffect } from 'react'

const Employeers = ({equipments}) => {
    const [searched,setSearched] = useState("");
    const [filteredEquipments,setFilteredEquipments] = useState(equipments);
    const requestSearch = (searchedVal) => {
      var forfilter = [];
      var forr = "";
      var around = "";
      var aroundfilter = [];
      var inparr;
      var inp;
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
      if(searchedVal.toLowerCase().includes("around")){
        inparr = searchedVal.toLowerCase().trim("around");
        inp = inparr[0]
      }
      else if(searchedVal.toLowerCase().includes("for")){
        inparr = searchedVal.toLowerCase().trim("for");
        inp = inparr[0]
      }else{
        inp=searchedVal.toLowerCase().trim();
      }
        

        const filter1 = equipments.filter((obj) => {
          return obj.name?.toLowerCase().includes()||inp.includes(obj.name?.toLowerCase())||obj.category?.toLowerCase().includes(inp)||searchedVal.toLowerCase().includes(obj.category?.toLowerCase());
        });
        if(searchedVal.toLowerCase().includes("around")&&searchedVal.toLowerCase().includes("for")){
          const str1 = searchedVal.split("for");
          forr = str1[1].trim()
          forfilter = filter1.filter((obj) => {
            return obj.forr?.toLowerCase().includes(forr.toLowerCase())||forr.toLowerCase().includes(obj.forr?.toLowerCase());
          });
          const str2 = searchedVal.split("around");
          around = str2[1].trim()
          aroundfilter = forfilter.filter((obj) => {
            return (+obj.price*3) > +around && (+obj.price/3) < +around
          });
          setFilteredEquipments(aroundfilter);
          return
        }
        if(searchedVal.toLowerCase().includes("for")){
          const str = searchedVal.split("for");
          forr = str[1].trim()
          forfilter = filter1.filter((obj) => {
            return obj.forr?.toLowerCase().includes(forr.toLowerCase())||forr.toLowerCase().includes(obj.forr?.toLowerCase());
          });
          setFilteredEquipments(forfilter);
          return
        }
        if(searchedVal.toLowerCase().includes("around")){
          const str = searchedVal.split("around");
          around = str[1].trim()
            aroundfilter = filter1.filter((obj) => {
              return (+obj.price*3) > +around && (+obj.price/3) < +around
            });
            setFilteredEquipments(aroundfilter);
            return
        }

         setFilteredEquipments(filter1);
  };
    useEffect(()=>{
      requestSearch(searched);
    },[searched])
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
