import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { AuthContext } from '../../../../Context/AuthContext';

import delete_icon from '../../../../assets/images/delete.png'
import edit_icon from '../../../../assets/images/edit.png'

function Members() {

    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)

    const { user } = useContext(AuthContext)

    const [isEditting, setIsEditting] = useState(false)
    const [fullName, setFullName] = useState('')
    const [studentId, setStudentnId] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [recentAddedMembers, setRecentAddedMembers] = useState([])
    const [userType, setUserType] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState(null)
    const [dob, setDob] = useState('')
    const [dobString, setDobString] = useState('')
    const [members, setMembers] = useState([])
    const [memberId, setMemberId] = useState()
    const [member, setMember] = useState()
    const [showAddForm, setShowAddForm] = useState(false)


    const genderTypes = [
        { value: "MALE", text: "Male" },
        { value: "FEMALE", text: "Female" }
    ]

    const userTypes = [
        { value: 'STAFF', text: 'Staff' },
        { value: 'STUDENT', text: 'Student' }
    ]

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.payload.token}`
    }

    //Add a Member
    const addMember = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (fullName !== null && userType !== null && age !== null && dobString !== null && gender !== null && address !== null && phoneNumber !== null && email !== null && password !== null) {
            const userData = {
                userType: userType,
                fullName: fullName,
                studentId: studentId,
                employeeId: employeeId,
                age: age,
                dob: dobString,
                gender: gender,
                address: address,
                phoneNumber: phoneNumber,
                email: email,
                password: password
            }

            if(userType === 'STUDENT') {
                delete userData.employeeId
            }

            if(userType === 'STAFF') {
                delete userData.studentId
            }

            try {
                const response = await isEditting == false ? axios.post(API_URL + "auth/register", userData) : axios.put(API_URL + `auth/register/${memberId}`, userData)
                if (recentAddedMembers.length >= 5) {
                    recentAddedMembers.splice(-1)
                }
                setRecentAddedMembers([response.data, ...recentAddedMembers])
                setFullName(null)
                setUserType("STUDENT")
                setStudentnId(null)
                setEmployeeId(null)
                setAddress(null)
                setPhoneNumber(null)
                setEmail(null)
                setPassword(null)
                setGender(null)
                setAge(null)
                setDob(null)
                setDobString(null)
                alert("Member Added")
                setShowAddForm(false)
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            alert("All the fields must be filled")
        }
        setIsLoading(false)
    }

    const openEditModal = async (memberId) => {
        console.log('RUNNING')
        setIsEditting(true)
        try {
            const response = await axios.get(API_URL + `users/allUsers?_id=${memberId}`, {headers: headers})
            const singleMember = response.data.payload[0]
            setMember(singleMember)
            setMemberId(singleMember._id)
            setShowAddForm(true)

            setUserType(singleMember.userType)
            setFullName(singleMember.fullName)
            setAddress(singleMember.address)
            setStudentnId(singleMember.studentId)
            setEmployeeId(singleMember.employeeId)
            setAge(singleMember.age)
            setDob(singleMember.dob)
            setGender(singleMember.gender)
            setPhoneNumber(singleMember.phoneNumber)
            setEmail(singleMember.email)
            setPassword(singleMember.password)

        } catch (error) {
            
        }
    }

    const openModal = () => {
        setShowAddForm(true)
    }

    //Fetch Members
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "users/allUsers", {headers: headers})
                const allMembers = await response.data.payload
                setMembers(allMembers)
                const recentMembers = allMembers.slice(0, 5)
                setRecentAddedMembers(recentMembers)
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])

    return (
        <div>
            <p className="dashboard-option-title">Members</p>
            <div className="dashboard-title-line"></div>

            <p className="add-btn" onClick={openModal}>Add Member</p>
            <table className='admindashboard-table'>
                <tr>
                    <th>S.No</th>
                    <th>Member Type</th>
                    <th>Member ID</th>
                    <th>Member Name</th>
                    <th>Actions</th>
                </tr>
                {
                    members.map((member, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{member.userType}</td>
                                <td>{member.userType === "STUDENT" ? member.admissionId : member.employeeId}</td>
                                <td>{member.fullName}</td>
                                <td className='action'>
                                    <img alt='' onClick={() => openEditModal(member._id)} className='delete' src={delete_icon} />
                                    <img alt='' className='edit' src={edit_icon} />
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            {
                showAddForm && 
                <div className='overlay'>
                    <div className='modal-container'>
                        <p onClick={() => setShowAddForm(false)} className='close-'>X</p>
                        <form className="addmember-form" onSubmit={addMember}>
                            <div className="form-group">
                                <div className='semanticdropdown'>
                                    <Dropdown
                                        placeholder='User Type'
                                        fluid
                                        selection
                                        options={userTypes}
                                        onChange={(event, data) => setUserType(data.value)}
                                    />
                                </div>
                            </div>

                           <div className='half'>
                                <div className="form-group">
                                    <label className="addmember-form-label" htmlFor="fullName">Full Name<span className="required-field">*</span></label>
                                    <input className="addmember-form-input" type="text" name="fullName" value={fullName} required onChange={(e) => setFullName(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label className="addmember-form-label" htmlFor={userType === "STUDENT" ? "studentId" : "employeeId"}>{userType === "STUDENT" ? "Student Id" : "Employee Id"}<span className="required-field">*</span></label>
                                    <input className="addmember-form-input" type="text" value={userType === "STUDENT" ? studentId : employeeId} required onChange={(e) => { userType === "STUDENT" ? setStudentnId(e.target.value) : setEmployeeId(e.target.value) }} />
                                </div>
                           </div>

                            <div className='half'>
                                <div className="form-group">
                                    <label className="addmember-form-label" htmlFor="mobileNumber">Phone Number<span className="required-field">*</span></label>
                                    <input className="addmember-form-input" type="text" value={phoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="addmember-form-label" htmlFor="gender">Gender<span className="required-field">*</span></label>
                                    <div className='semanticdropdown'>
                                        <Dropdown
                                            placeholder='Gender'
                                            fluid
                                            selection
                                            value={gender}
                                            options={genderTypes}
                                            onChange={(event, data) => setGender(data.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='half'>
                                <div className="form-group">
                                    <label className="addmember-form-label" htmlFor="age">Age<span className="required-field">*</span></label>
                                    <input className="addmember-form-input" type="text" value={age} required onChange={(e) => setAge(e.target.value)}></input>
                                </div>

                                <div className="form-group">
                                    <label className="addmember-form-label" htmlFor="dob">Date of Birth<span className="required-field">*</span></label>
                                    <DatePicker
                                        className="date-picker"
                                        placeholderText="MM/DD/YYYY"
                                        selected={dob}
                                        onChange={(date) => { setDob(date); setDobString(moment(date).format("MM/DD/YYYY")) }}
                                        dateFormat="MM/dd/yyyy"
                                    />
                                </div>
                            </div>

                            <div className='half'>
                                <div className="form-group">
                                    <label className="addmember-form-label" htmlFor="address">Address<span className="required-field">*</span></label>
                                    <input className="addmember-form-input address-field" value={address} type="text" required onChange={(e) => setAddress(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label className="addmember-form-label" htmlFor="email">Email<span className="required-field">*</span></label>
                                    <input className="addmember-form-input" type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="addmember-form-label" htmlFor="password">Password<span className="required-field">*</span></label>
                                <input className="addmember-form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <input className="addmember-submit" type="submit" value="SUBMIT" disabled={isLoading} ></input>

                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default Members
