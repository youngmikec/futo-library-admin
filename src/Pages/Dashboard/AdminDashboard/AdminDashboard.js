import React, { useState } from 'react'
import "./AdminDashboard.css"
import Transactions from './Components/Transactions'
import Members from './Components/Members'
import Books from './Components/Books';
import Pofile from './Components/Profile';

import logo from '../../../assets/images/FUTO_logo.png';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BookIcon from '@material-ui/icons/Book';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import GetMember from './Components/GetMember';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import Return from './Components/Return';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';


/* Semantic UI Dropdown Styles Import */
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function AdminDashboard() {

    const [active, setActive] = useState("profile")
    const [sidebar, setSidebar] = useState(false)

    /* Logout Function*/
    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }


    return (
        <div className="dashboard">
            <div className="dashboard-card">
                <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
                    <IconButton>
                        {sidebar ? <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} /> : <DoubleArrowIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />}
                    </IconButton>
                </div>

                {/* Sidebar */}
                <div className={sidebar ? "dashboard-options active" : "dashboard-options"}>
                    <div className='dashboard-logo'>
                        <img src={logo} width="40px" alt='logo' />
                        <p className="logo-name"><span className="futo-">FUTO</span>LIBRARY</p>
                    </div>
                    <p className={`dashboard-option ${active === "profile" ? "clicked" : ""}`} onClick={() => { setActive("profile"); setSidebar(false) }}><AccountCircleIcon className='dashboard-option-icon' /> Profile</p>
                    <p className={`dashboard-option ${active === "book" ? "clicked" : ""}`} onClick={() => { setActive("book"); setSidebar(false) }}><BookIcon className='dashboard-option-icon' />Books</p>
                    <p className={`dashboard-option ${active === "members" ? "clicked" : ""}`} onClick={() => { setActive("members"); setSidebar(false) }}><PersonAddIcon className='dashboard-option-icon' /> Members </p>
                    <p className={`dashboard-option ${active === "member" ? "clicked" : ""}`} onClick={() => { setActive("member"); setSidebar(false) }}><AccountBoxIcon className='dashboard-option-icon' /> Member Detail </p>
                    <p className={`dashboard-option ${active === "transactions" ? "clicked" : ""}`} onClick={() => { setActive("transactions"); setSidebar(false) }}><ReceiptIcon className='dashboard-option-icon' /> Transactions </p>
                    <p className={`dashboard-option ${active === "returntransaction" ? "clicked" : ""}`} onClick={() => { setActive("returntransaction"); setSidebar(false) }}><AssignmentReturnIcon className='dashboard-option-icon' /> Return </p>
                    <p className={`dashboard-option`} onClick={logout}><PowerSettingsNewIcon className='dashboard-option-icon' /> Log out </p>

                </div>
                <div className="dashboard-option-content">
                    <div className="dashboard-profile-content" style={active !== "profile" ? { display: 'none' } : {}}>
                        <Pofile />
                    </div>
                    <div className="dashboard-addbooks-content" style={active !== "book" ? { display: 'none' } : {}}>
                        <Books />
                    </div>
                    <div className="dashboard-transactions-content" style={active !== "transactions" ? { display: 'none' } : {}}>
                        <Transactions />
                    </div>
                    <div className="dashboard-addmember-content" style={active !== "members" ? { display: 'none' } : {}}>
                        <Members />
                    </div>
                    <div className="dashboard-addmember-content" style={active !== "member" ? { display: 'none' } : {}}>
                        <GetMember />
                    </div>
                    <div className="dashboard-addmember-content" style={active !== "returntransaction" ? { display: 'none' } : {}}>
                        <Return />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard