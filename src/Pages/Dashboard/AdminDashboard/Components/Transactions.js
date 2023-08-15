import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { AuthContext } from '../../../../Context/AuthContext'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"

import delete_icon from '../../../../assets/images/delete.png'
import edit_icon from '../../../../assets/images/edit.png'

function Transactions() {

    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.payload.token}`
    }

    const [borrowerId, setBorrowerId] = useState("")
    const [borrowerDetails, setBorrowerDetails] = useState({})
    const [bookId, setBookId] = useState("")
    const [bookDetails, setBookDetails] = useState({})
    const [recentTransactions, setRecentTransactions] = useState([])
    const [allMembers, setAllMembers] = useState([])
    const [allBooks, setAllBooks] = useState([])
    const [transactions, setTransactions] = useState([])
    const [transaction, setTransaction] = useState()
    const [isEditting, setIsEditting] = useState(false)
    const [transactionId, setTransactionId] = useState()

    const [fromDate, setFromDate] = useState(null)
    const [returnDateString, setReturnDateString] = useState(null)

    const [returnDate, setReturnDate] = useState(null)
    const [fromDateString, setFromDateString] = useState(null)

    const [toDate, setToDate] = useState(null)
    const [toDateString, setToDateString] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)

    const transactionTypes = [
        { value: 'RESERVE', text: 'Reserve' },
        { value: 'ISSUE', text: 'Issue' }
    ]

    const [transactionType, setTransactionType] = useState("")

    /* Adding a Transaction */
    const addTransaction = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (bookId !== "" && borrowerId !== "" && transactionType !== "" && fromDate !== null && toDate !== null) {
            
            /* Checking weather the book is available or not */
            if ((bookDetails.bookCountAvailable > 0 && (transactionType === "ISSUE" || transactionType === "RESERVE")) || (bookDetails.bookCountAvailable === 0 && transactionType === "RESERVE")) {
                const transactionData = {
                    bookId: bookId,
                    borrowerId: borrowerId,
                    borrowerName: borrowerDetails.fullName,
                    bookName: bookDetails.bookName,
                    transactionType: transactionType,
                    fromDate: fromDateString,
                    toDate: toDateString,
                    returnDate: returnDateString
                }
                try {
                    const response = await axios.post(API_URL + "transactions/add-transaction", transactionData, { headers })
                    if (recentTransactions.length >= 5) {
                        (recentTransactions.splice(-1))
                    }
                    // await axios.put(API_URL + `api/users/${response.data._id}/move-to-activetransactions`, {
                    //     userId: borrowerId,
                    //     isAdmin: user.isAdmin
                    // })

                    await axios.put(API_URL+"books/updatebook/"+bookId,{
                        bookCountAvailable:bookDetails.data.bookCountAvailable - 1
                    })

                    setRecentTransactions([response.data, ...recentTransactions])
                    setBorrowerId("")
                    setBookId("")
                    setTransactionType("")
                    setFromDate(null)
                    setToDate(null)
                    setFromDateString(null)
                    setToDateString(null)
                    setShowAddForm(false)
                    alert("Transaction was Successfull 🎉")
                }
                catch (err) {
                    console.log(err)
                }
            }
            else{
                alert("The book is not available")
            }
        }
        else {
            alert("Fields must not be empty")
        }
        setIsLoading(false)
        setShowAddForm(false)
        getTransactions()
    }

    const openEditModal = async (transactionId) => {
        setIsEditting(true)
        try {
            const response = await axios.get(API_URL + `transactions/all-transactions?_id=${transactionId}`, {headers: headers})
            const singleTransaction = response.data.payload[0]
            setTransaction(singleTransaction)
            setTransactionId(singleTransaction._id)
            setShowAddForm(true)

            setBorrowerId(singleTransaction.borrowerId)
            setBookId(singleTransaction.bookId)
            setTransactionType(singleTransaction.transactionType)
            setFromDate(singleTransaction.fromDateString)
            setToDate(singleTransaction.toDateString)
            // setFromDateString(null)
            // setToDateString(null)

        } catch (error) {
            
        }
    }

    const openModal = () => {
        setShowAddForm(true)
    }

    const getTransactions = async () => {
        try {
            const response = await axios.get(API_URL + "transactions/all-transactions", { headers })
            const allTransactions = response.data.payload.reverse();
            if(allTransactions){
                setTransactions(allTransactions)
                setRecentTransactions(allTransactions.slice(0, 5))
            }
        }
        catch (err) {
            console.log("Error in fetching transactions")
        }

    }


    /* Fetch Transactions */
    useEffect(() => {
        
        getTransactions()
    }, [API_URL])


    /* Fetching borrower details */
    const getBorrowerDetails = async (borrowerId) => {
        try {
            if (borrowerId !== "") {
                const response = await axios.get(API_URL + "users/getuser/" + borrowerId, { headers })
                setBorrowerId(response.data._id)
                setBorrowerDetails(response.data)
            }
        }
        catch (err) {
            console.log("Error in getting borrower details")
        }
    }
    
    // Fetch Book Details
    const getBookDetails = async (bookId) => {
        try {
            if (bookId !== "") {
                const response = await axios.get(API_URL + "books/getBook/" + bookId, { headers })
                setBookId(response.data._id)
                setBookDetails(response.data)
            }
        }
        catch (err) {
            console.log("Error in getting borrower details")
        }
    }

    /* Fetching members */
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "users/allUsers", { headers })
                const all_members = await response.data.payload.map(member => (
                    { value: `${member?._id}`, text: `${member?.userType === "STUDENT" ? `${member?.fullName}[${member?.studentId}]` : `${member?.fullName}[${member?.employeeId}]`}` }
                ))
                setAllMembers(all_members)
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])


    /* Fetching books */
    useEffect(() => {
        const getallBooks = async () => {
            const response = await axios.get(API_URL + "books/allbooks", { headers })
            const allbooks = await response.data.payload.map(book => (
                { value: `${book._id}`, text: `${book.bookName}` }
            ))
            setAllBooks(allbooks)
        }
        getallBooks()
    }, [API_URL])


    return (
        <div>
            <p className="dashboard-option-title">Request for Book</p>
            <div className="dashboard-title-line"></div>
            <p className="add-btn" onClick={openModal}>Request Book</p>
            <table className="admindashboard-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Book Name</th>
                        <th>Borrower Name</th>
                        <th>Code</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{transaction.bookName}</td>
                                    <td>{transaction.borrowerName}</td>
                                    <td>{transaction.code}</td>
                                    <td>{transaction.transactionType}</td>
                                    <td>{transaction.transactionStatus}</td>
                                    <td>{transaction.updatedAt.slice(0, 10)}</td>
                                    <td className='action'>
                                        <img alt='' className='delete' src={delete_icon} />
                                        <img alt='' onClick={() => openEditModal(transaction._id)} className='edit' src={edit_icon} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                showAddForm && 
                <div className='overlay'>
                    <div className='modal-container'>
                        <p onClick={() => setShowAddForm(false)} className='close-'>X</p>
                        <form className='transaction-form' onSubmit={addTransaction}>
                            <div className='form-group'>
                                <label className="transaction-form-label" htmlFor="borrowerId">Borrower<span className="required-field">*</span></label>
                                <div className='semanticdropdown'>
                                    <Dropdown
                                        placeholder='Select Member'
                                        fluid
                                        search
                                        selection
                                        value={borrowerId}
                                        options={allMembers}
                                        onChange={(event, data) => getBorrowerDetails(data.value)}
                                    />
                                </div>
                            </div>

                            {/* <table className="admindashboard-table shortinfo-table" style={borrowerId === "" ? { display: "none" } : {}}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Issued</th>
                                        <th>Reserved</th>
                                        <th>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{borrowerDetails.fullName}</td>
                                        <td>{borrowerDetails.activeTransactions?.filter((data) => {
                                            return data.transactionType === "Issued" && data.transactionStatus === "Active"
                                        }).length
                                        }
                                        </td>
                                        <td>{borrowerDetails.activeTransactions?.filter((data) => {
                                            return data.transactionType === "Reserved" && data.transactionStatus === "Active"
                                        }).length
                                        }
                                        </td>
                                        <td>{borrowerDetails.points}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                            <table className="admindashboard-table shortinfo-table" style={borrowerId === "" ? { display: "none" } : {}}>
                                <thead>
                                    <tr>
                                        <th>Book-Name</th>
                                        <th>Transaction</th>
                                        <th>From Date<br /><span style={{ fontSize: "10px" }}>[MM/DD/YYYY]</span></th>
                                        <th>To Date<br /><span style={{ fontSize: "10px" }}>[MM/DD/YYYY]</span></th>
                                        <th>Fine</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        borrowerDetails.activeTransactions?.filter((data) => { return data.transactionStatus === "Active" }).map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{data.bookName}</td>
                                                    <td>{data.transactionType}</td>
                                                    <td>{data.fromDate}</td>
                                                    <td>{data.toDate}</td>
                                                    <td>{(Math.floor((Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate)) / 86400000)) <= 0 ? 0 : (Math.floor((Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate)) / 86400000)) * 10}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table> */}

                            <div className='half'>
                                <div className='form-group'>
                                    <label className="transaction-form-label" htmlFor="bookName">Book Name<span className="required-field">*</span></label><br />
                                    <div className='semanticdropdown'>
                                        <Dropdown
                                            placeholder='Select a Book'
                                            fluid
                                            search
                                            selection
                                            options={allBooks}
                                            value={bookId}
                                            onChange={(event, data) => getBookDetails(data.value)}
                                        />
                                    </div>
                                </div>

                                <div className='form-group'>
                                    <label className="transaction-form-label" htmlFor="transactionType">Transaction Type<span className="required-field">*</span></label><br />
                                    <div className='semanticdropdown'>
                                        <Dropdown
                                            placeholder='Select Transaction'
                                            fluid
                                            selection
                                            value={transactionType}
                                            options={transactionTypes}
                                            onChange={(event, data) => setTransactionType(data.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className="transaction-form-label" htmlFor="from-date">From Date<span className="required-field">*</span></label><br />
                                <DatePicker
                                    className="date-picker"
                                    placeholderText="MM/DD/YYYY"
                                    selected={fromDate}
                                    onChange={(date) => { setFromDate(date); setFromDateString(moment(date).format("MM/DD/YYYY")) }}
                                    minDate={new Date()}
                                    dateFormat="MM/dd/yyyy"
                                />
                            </div>

                            <div className='form-group'>
                                <label className="transaction-form-label" htmlFor="to-date">To Date<span className="required-field">*</span></label><br />
                                <DatePicker
                                    className="date-picker"
                                    placeholderText="MM/DD/YYYY"
                                    selected={toDate}
                                    onChange={(date) => { setToDate(date); setToDateString(moment(date).format("MM/DD/YYYY")) }}
                                    minDate={new Date()}
                                    dateFormat="MM/dd/yyyy"
                                />
                            </div>

                            {
                                isEditting && <div className='form-group'>
                                    <label className="transaction-form-label" htmlFor="to-date">Return Date<span className="required-field">*</span></label><br />
                                    <DatePicker
                                        className="date-picker"
                                        placeholderText="MM/DD/YYYY"
                                        selected={toDate}
                                        onChange={(date) => { setReturnDate(date); setReturnDateString(moment(date).format("MM/DD/YYYY")) }}
                                        minDate={new Date()}
                                        dateFormat="MM/dd/yyyy"
                                    />
                                </div>
                            }

                            <input className="transaction-form-submit" type="submit" value="SUBMIT" disabled={isLoading}></input>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default Transactions