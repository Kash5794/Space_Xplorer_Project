import React from 'react'
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import '../css/Footer.css'

const Footer = () => {
  return (
    <footer>
    
    <a href='https://github.com/Kash5794' target="_blank"><IoLogoGithub size={30} /></a>
    <a href='https://www.linkedin.com/in/i-am-kazeem-saheed/' target="_blank"><FaLinkedin size={30} color='blue'/></a>

    </footer>
  )
}

export default Footer