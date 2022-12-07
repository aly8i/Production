import React from 'react'
import styles from '../styles/Jobs.module.css'
import NewsCard from './NewsCard'
import Search from './Search'
import { useState,useEffect } from 'react'
import DropDown from './DropDown'

const News = ({news}) => {
    const [searched,setSearched] = useState("");
    const [type,setType] = useState("");
    const [filteredNews,setFilteredNews] = useState(news);
    const requestSearch = (searchedVal) => {
      if(searchedVal == ""){
        setFilteredNews(news);
      }
        const filter1 = news.filter((obj) => {
          return obj.title?.toLowerCase().includes(searchedVal.toLowerCase());
        });
        const filtered = filter1.filter((obj) => {
          return obj.title?.toLowerCase().includes(type.toLowerCase());
        });
        setFilteredNews(filtered);
    };
    useEffect(()=>{
      requestSearch(searched);
      console.log(news)
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
              <NewsCard news={filteredNews}/>
            </div>
        </main>
    </div>
  )
}

export default News
