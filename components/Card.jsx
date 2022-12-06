import React from 'react'
import styles from '../styles/Card.module.scss'
import Link from 'next/link'
import Image from 'next/image'
// import SocialIcon from './SocialIcon';
const card = ({jobs}) => {
const shorten =(str) =>{
  var result;
  if(str.length>=60)
    result = str.substring(0,60)+"...";
  else
    result = str
  return result
}
  return (
    jobs.map((job)=>(
        <div className={styles.card} key={job._id}>
          <h2>{job.title}</h2>
          <Image src={job.image} alt="" width={100} height={100} className={styles.profileImg}/>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Employment Type</p>
            <p className={styles.col2}>{job.employmenttype}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Salary</p>
            <p className={styles.col2}>{`${job.salary} $`}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Salary Duration</p>
            <p className={styles.col2}>{`${job.salaryduration.value} ${job.salaryduration.unit}s`}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Work Days</p>
            <p className={styles.col2}>{job.workdays.length}</p>
          </div>
          <div className={styles.sectionD}>
            <p className={styles.col1}>Work hours</p>
            <p className={styles.col2}>{job.workhours.length}</p>
          </div>
          <p className={styles.sectionD}>{job.description}</p>
        </div>
    )
    )
  )
}

export default card