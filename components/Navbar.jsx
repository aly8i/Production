import React from 'react'
import styles from "../styles/Navbar.module.css"
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import logo from "../public/lightstudiosmall.png"
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { useState } from 'react';
const Navbar = ({nav}) => {
    const router= useRouter();
    const [showMenu,setShowMenu] = useState("false");
    const toggleMenu = ()=>{
        if(showMenu=="true"){
            setShowMenu("false");
        }else{
            setShowMenu("true")
        }
    }
    const getLinks = () =>{
        return(
            <>
            <div onClick={()=>{router.push("/")}} className={nav=="/"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>Home</div>
            <div onClick={()=>{router.push("/jobs")}} className={nav=="/jobs"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>Jobs</div>
            <div onClick={()=>{router.push("/talents")}} className={nav=="/talents"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>Talents</div>
            <div onClick={()=>{router.push("/employeers")}} className={nav=="/employeers"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>Employeers</div>
            <div onClick={()=>{router.push("/news")}} className={nav=="/news"?(`${styles.menuLink} ${styles.a} ${styles.isActive}`):(`${styles.menuLink} ${styles.a}`)}>News</div>
            </>
        )
    }
  return (
    <>
    <div className={styles.header}>
            <div className={styles.logo}>
                <Image src={logo} alt="" width={180} height={50}/>
            </div>
            <div className={styles.headerMenu}>
                {getLinks()}
            </div>
            <div className={styles.hamburger}>
                <MenuIcon className={styles.hamburgerImage} onClick={()=>toggleMenu()}/>
            </div>
            <div className={styles.headerProfile}>
            <div className={styles.message}>
                <ModeCommentIcon/>
            </div>
                <div className={styles.notification}>
                    <span className={`${styles.notificationNumber} ${styles.span}`}>3</span>
                    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={`${styles.feather} ${styles.svg} ${styles.featherBell}`}>
                        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                    </svg>
                </div>
                <img className={`${styles.profileImg} ${styles.img}`} src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt=""/>
            </div>
        </div>
        {showMenu=="true"?(
        <div className={styles.subHeader}>
            <div className={styles.subHeaderMenu}>
                {getLinks()}
            </div>
        </div>
        ):(<></>)}
    </>
  )
}

export default Navbar