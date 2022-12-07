import React from 'react'
import styles from '../styles/Card.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect,useState } from 'react'

const NewsCard = ({news}) => {
  const shorten =(str) =>{
    var result;
    if(str.length>=60)
      result = str.substring(0,60)+"...";
    else
      result = str
    return result
  }
  return (
    news.map((n)=>(
      <Link key={n._id} href={`/news/${n._id}`} passHref >
        <div className={styles.card} >
          <h2>{n.title}</h2>
          <Image src={n.image[0]} alt="" width={100} height={100} className={styles.profileImg}/>
          <p>{n.description}</p>
        </div>
      </Link>
    ))
  )
}

export default NewsCard