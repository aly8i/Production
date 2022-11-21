import React from 'react'
import styles from '../styles/AboutCards.module.css'
import Image from 'next/image'

const AboutCards = () => {
  return (
    <div className={styles.container1}>
        <h4>Services</h4>
        <div className={styles.container2}>
        <div className={`${styles.flip} ${styles.flipVertical}`}>
            <div className={`${styles.front} ${styles.first}`} >
                <h1 className={styles.textShadow}>Actors</h1>
            </div>
            <div className={styles.back}>
            <h2>Actors</h2>
            <p>Join our proffessional acting community and select performing roles based on previous experiences.</p>
            </div>
        </div>
        <div className={`${styles.flip} ${styles.flipVertical}`}>
            <div className={`${styles.front} ${styles.second}`}>
            <h1 className={styles.textShadow}>Production</h1>
            </div>
            <div className={styles.back}>
            <h2>Production</h2>
            <p>Our production team will handle all the video editing tasks proffesionally, in order to maximize your product.</p>
            </div>
        </div>
        <div className={`${styles.flip} ${styles.flipVertical}`}>
            <div className={`${styles.front} ${styles.third}`}>
            <h1 className={styles.textShadow}>Shooting</h1>
            </div>
            <div className={styles.back}>
            <h2>Shooting</h2>
            <p>Bring your script, your actors, and let our shooting scene transform your words into awesome scenes.</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AboutCards