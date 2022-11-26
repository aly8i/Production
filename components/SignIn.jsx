import React from 'react'
import { signIn } from "next-auth/react"
import styles from "../styles/SignIn.module.css"
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
const SignIn = () => {
    const handleSignIn = (method)=>{
        signIn(method,{callbackUrl:`${process.env.NEXT_PUBLIC_BASE_URL}`});
      }
  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
        <div className={styles.info}>
                <div className={styles.socialLinks}>
                    <div className={styles.row}>
                        <GoogleIcon className={`${styles.icon} ${styles.top}`} onClick={()=>{handleSignIn('google')}}/>
                        <LinkedInIcon className={styles.icon}/>
                    </div>
                    <div className={styles.row}>
                        <FacebookIcon className={`${styles.icon} ${styles.top}`}/>
                        <AppleIcon className={styles.icon}/>
                    </div>
                </div>
            </div>
            <ChatBubbleIcon className={styles.back}/>
        </div>
    </div>

  )
}

export default SignIn