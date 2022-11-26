import React from 'react'
import styles from "../styles/Navbar.module.css"
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import logo from "../public/lightstudiosmall.png"
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import { useDispatch } from 'react-redux';
import { addUser,resetUser } from '../redux/userSlice';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Profile from './Profile';
import SignIn from '../components/SignIn';
import axios from 'axios';
import { useSelector } from 'react-redux';
const Navbar = ({nav}) => {
    const { data: session } = useSession()
    const user = useSelector((state) => state.user);
    const router= useRouter();
    const [showMenu,setShowMenu] = useState("false");
    const [showProfile,setShowProfile] = useState("false")
    const [showLogin,setShowLogin] = useState("false")
    //
    const dispatch = useDispatch();
    const postUser = async(u)=>{
        const newuser={
          email:u.email,
          username:u.name,
          fullname:u.name,
          image:u.image
        };
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, newuser);
            return res.data._id;
        }catch(err){
          console.log("You have an account")
          try{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/find`, newuser);
              return res.data._id
          }
          catch(err){
            console.log("An error occured")
          }
        }
      }
      const loginWithToken = async() => {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signinwithtoken`,{},{
          withCredentials: true
        }).then((res)=>{
            dispatch(addUser({id:res.data.sub,username:res.data.username,fullname:res.data.username,image:res.data.image}));
        }).catch((err)=>{
          console.log("You are not authenticated");
          if(session){
            postUser(session.user).then((id)=>{
              dispatch(addUser({id:id,username:session.user.name,fullname:session.user.name,image:session.user.image}));
            })
            .catch((err) => {
              console.log("failed to post user");
            });
          }else{
            console.log("you are not logged in");
            dispatch(resetUser());
          }
        });
      }
    useEffect(()=>{
    loginWithToken().catch((err)=>{
        console.log(err);
        });
    
    },[session?.user?.image])



    const toggleMenu = ()=>{
        if(showMenu=="true"){
            setShowMenu("false");
        }else{
            setShowMenu("true")
        }
    }
    const toggleLogin = ()=>{
        if(showLogin=="true"){
            setShowLogin("false");
        }else{
            setShowLogin("true")
        }
    }
    const toggleProfile = ()=>{
        if(showProfile=="true"){
            setShowProfile("false");
        }else{
            setShowProfile("true")
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
            
            {
              user.username!="Guest"?
              (
                <div className={styles.imageCon}>
                  <Image className={`${styles.profileImg} ${styles.img}`} onClick={()=>toggleProfile()} alt="" width={25} height={25}
                  // className={`${styles.profileImg} ${styles.img}`}
                  src={user.image}/>
                </div>
              )
              :(< LockOpenIcon onClick={()=>toggleLogin()} className={styles.lock}/>)
            }
            </div>
          </div>
        {showMenu=="true"?(
        <div className={styles.subHeader}>
            <div className={styles.subHeaderMenu}>
                {getLinks()}
            </div>
        </div>
        ):(<></>)}
        {showProfile=="true"?(
            <Profile/>
        ):(<></>)}
        {showLogin=="true"?(
            <SignIn/>
        ):(<></>)}
    </>
  )
}

export default Navbar