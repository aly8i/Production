import React from 'react'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import styles from "../styles/Profile.module.css"
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ShareIcon from '@mui/icons-material/Share';
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

const Profile = () => {
    const { data: session } = useSession()
    const logout = async() => {
        // await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`).then((res)=>{
          signOut(); 
        // });
      };
  return (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <div className={styles.info}>
                <img className={`${styles.profileImg} ${styles.img}`} src={session?.user?.image} alt=""/>
                <div className={styles.section}>
                    <p className={styles.name}>{session.user.name}</p>
                    <div className={styles.sectionsub}>
                        <div className={styles.button}>
                            <MeetingRoomIcon onClick={()=>{logout()}}/>
                        </div>
                        <div className={styles.button}>
                            <ShareIcon/>
                        </div>
                    </div>
                </div>
            </div>
            <ChatBubbleIcon className={styles.icon}/>
        </div>
    </div>
  )
}

export default Profile