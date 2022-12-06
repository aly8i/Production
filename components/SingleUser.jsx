import React from 'react'
import Image from 'next/image'
import styles from "../styles/SingleUser.module.scss"
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore, { Autoplay } from 'swiper/core';
import {useState,useEffect} from 'react'
import axios from "axios";
const SingleEquipment = ({user}) => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>{user.fullname}</h1>
            <div className={styles.imgContainer}>
                <Image src={user.image} alt={user.image} layout="fill" objectFit="contain" />
            </div>
        <div className={styles.bottom}>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Phone Number :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{user.phonenumber||"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Address :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{`${user.city}, ${user.country}`||"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>About :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{user.about||"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Department :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{user.department||"NAN"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Speciality :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{user.speciality||"NAN"}</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default SingleEquipment

