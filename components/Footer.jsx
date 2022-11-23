import React from 'react'
import styles from '../styles/Footer.module.css'
import Image from 'next/image'
import lt from "../public/lt.png"
const Footer = () => {
    
  return (
<footer>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
<div className={styles.footer}>
<div className={styles.row}>
<a href="#"><i class="fa fa-facebook"></i></a>
<a href="#"><i class="fa fa-instagram"></i></a>
<a href="#"><i class="fa fa-linkedin"></i></a>
<a href="#"><i class="fa fa-twitter"></i></a>
</div>

<div className={styles.row}>
<ul>
<li><a href="#">Contact us</a></li>
<li><a href="#">Our Services</a></li>
<li><a href="#">Privacy Policy</a></li>
<li><a href="#">Terms & Conditions</a></li>
<li><a href="#">Career</a></li>
</ul>
</div>

<div className={styles.row}>
    <div className={styles.copyright}></div>
    <p>Powered by</p> <Image src={lt} alt="Lebanon Token" width={150} height={95}/>
</div>
</div>
</footer>

  )
}

export default Footer