import React from 'react'
import './Footer.css'

import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Facebook, YouTube } from '@material-ui/icons';

function Footer() {
    return (
        <div className='footer'>
            <div>
                <div className='footer-data'>
                    <div className="usefull-links">
                        <h1>Students</h1>
                        <a href='https://portal.futo.edu.ng/' target='_blank'>Students Information</a>
                        <a href='https://portal.futo.edu.ng/' target='_blank'>Schedule of classes</a>
                        <a href='https://portal.futo.edu.ng/' target='_blank'>Student portal</a>
                        <a href='https://portal.futo.edu.ng/' target='_blank'>Admission Brochure 2020/2021 session</a>
                    </div>
                    <div className='usefull-links'>
                        <h1>Usefull Links</h1>
                        <a href='https://futo.edu.ng/wp-content/uploads/2022/03/PPRC-FUTO-PROGRAMME-2020.pdf'>Timetable</a>
                        <a href='https://futo.edu.ng/#:~:text=FUTO%20Online%20Research%20Project%20Sur'>Futo Online Research Project Survey</a>
                        <a href='https://futo.edu.ng/calendar/'>Academic Calendar</a>
                        <a href='https://futo.edu.ng/calendar/'>Admission Calendar</a>
                    </div>
                    <div className='librarian-details'>
                        <h1>Librarian</h1>
                        <p>Name</p>
                        <p>Education</p>
                        <p>Contact: +91 9123456787</p>
                    </div>
                </div>
                <div className="contact-social" >
                    <a href='https://twitter.com/Futoweb' target='_blank' className='social-icon'><TwitterIcon style={{ fontSize: 40,color:"#ffffff"}} /></a>
                    <a href='https://web.facebook.com/F.U.T.O.Nigeria?_rdc=1&_rdr' target='_blank' className='social-icon'><Facebook style={{ fontSize: 40,color:"#ffffff"}} /></a>
                    <a href='https://www.youtube.com/channel/UCuVgpEWaFAutM2kFoSuG' className='social-icon'><YouTube style={{ fontSize: 40,color:"#ffffff"}} /></a>
                    {/* <a href='#home' className='social-icon'><InstagramIcon style={{ fontSize: 40,color:"#ffffff"}} /></a> */}
                </div>
            </div>
            <div className='copyright-details text-white'>
                <p className='footer-copyright'>&#169; 2023 copyright all right reserved<br /><span>Designed with ❤️ by Ozor Michael, Onyeukwu Daniel and Onwugharam Michael</span></p>
            </div>
        </div>
    )
}

export default Footer