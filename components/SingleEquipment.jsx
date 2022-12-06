import React from 'react'
import Image from 'next/image'
import styles from "../styles/SingleEquipment.module.scss"
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore, { Autoplay } from 'swiper/core';
import {useState,useEffect} from 'react'
import axios from "axios";
const SingleEquipment = ({singleEq}) => {
  SwiperCore.use([Autoplay]);
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>{singleEq.name}</h1>
        <Swiper className={styles.swiper}
          modules={{Pagination}}
          spaceBetween={40}
          slidesPerView={1}
          autoplay={{
              "delay": 5500,
              "disableOnInteraction": false
            }}
          pagination={{ clickable: true }}>
          {
            singleEq.images.map((image,id) => {
              return (
                <SwiperSlide key={id} className={styles.wrapper}>
                  <div className={styles.imgContainer}>
                    <Image src={image} alt={image} layout="fill" objectFit="contain" />
                  </div>
                </SwiperSlide>
              );
            })
          }
        </Swiper>
        <div className={styles.bottom}>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Price :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{singleEq.price}{" $"}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Category :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{singleEq.category}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Warranty :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{singleEq.warranty}</p>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>For :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{singleEq.for}</p>
              </div>
            </div>
            {singleEq.rentduration?(
            <div className={styles.section}>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionHeading}>Rent Duration :</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.sectionContent}>{singleEq.rentduration}</p>
              </div>
            </div>):(<></>)}
        </div>
    </div>
  )
}

export default SingleEquipment

