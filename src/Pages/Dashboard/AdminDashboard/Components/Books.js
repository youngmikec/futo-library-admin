import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { AuthContext } from '../../../../Context/AuthContext'
import { Dropdown } from 'semantic-ui-react'

import delete_icon from '../../../../assets/images/delete.png'
import edit_icon from '../../../../assets/images/edit.png'

function Books() {

    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.payload.token}`
    }

    const [bookName, setBookName] = useState("")
    const [alternateTitle, setAlternateTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [bookCountAvailable, setBookCountAvailable] = useState(null)
    const [language, setLanguage] = useState("")
    const [bookStatus, setBookStatus] = useState("AVAILABLE")
    const [publisher, setPublisher] = useState("")
    const [allCategories, setAllCategories] = useState([])
    const [categories, setCategories] = useState([])
    const [recentAddedBooks, setRecentAddedBooks] = useState([])
    const [books, setBooks] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)


    /* Fetch all the Categories */
    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const response = await axios.get(API_URL + "categories/allBookcategories", {headers: headers})
                const all_categories = await response.data.payload.map(category => (
                    { value: `${category._id}`, text: `${category.categoryName}` }
                ))
                setAllCategories(all_categories)
            }
            catch (err) {
                console.log(err)
            }
        }
        getAllCategories()
    }, [API_URL])

    /* Adding book function */
    const addBook = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const BookData = {
            bookName: bookName,
            alternateTitle: alternateTitle,
            author: author,
            bookCountAvailable: bookCountAvailable,
            language: language,
            publisher: publisher,
            categories: categories,
            bookStatus: bookStatus
        }
        try {
            const response = await axios.post(API_URL + "books/addbook", BookData, {headers: headers})
            if (recentAddedBooks.length >= 5) {
                recentAddedBooks.splice(-1)
            }
            setRecentAddedBooks([response.data, ...recentAddedBooks])
            setBookName("")
            setAlternateTitle("")
            setAuthor("")
            setBookCountAvailable(null)
            setLanguage("")
            setPublisher("")
            setBookStatus("")
            setCategories([])
            setShowAddForm(false)
            setBooks(response.payload, ...books)
            alert("Book Added Successfully 🎉")
        }
        catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }

    const editBook = async () => {

    }

    const openEditModal = async () => {
        
    }

    const openModal = () => {
        setShowAddForm(true)
    }

    useEffect(() => {
        const getallBooks = async () => {
            const response = await axios.get(API_URL + "books/allbooks", {headers: headers})
            const allBooks = await response.data.payload.reverse()
            setBooks(allBooks)
            const recentBooks = allBooks.slice(0, 5)
            setRecentAddedBooks(recentBooks)
        }
        getallBooks()
    }, [API_URL])


    return (
        <div>
            <p className="dashboard-option-title">Books</p>
            <div className="dashboard-title-line"></div>
            <div>
                <p className="add-btn" onClick={openModal}>Add book</p>
                <table className='admindashboard-table'>
                    <tr>
                        <th>S.No</th>
                        <th>Book Name</th>
                        <th>Book Author</th>
                        <th>Book Status</th>
                        <th>Added Date</th>
                        <th>Actions</th>
                    </tr>
                    {
                        books.map((book, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{book.bookName}</td>
                                    <td>{book.author}</td>
                                    <td>{book.bookStatus}</td>
                                    <td>{book.createdAt.substring(0, 10)}</td>
                                    <td className='action'>
                                        <img className='delete' src={delete_icon} />
                                        <img className='edit' src={edit_icon} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            {
                showAddForm && (
                    
                    <div className='overlay'>
                        <div className='modal-container'>
                            <p onClick={() => setShowAddForm(false)} className='close-'>X</p>
                            <form className='addbook-form' onSubmit={addBook}>

                                <div className='half'>
                                    <div className="form-group">
                                        <label className="addbook-form-label" htmlFor="bookName">Book Name<span className="required-field">*</span></label>
                                        <input className="addbook-form-input" type="text" name="bookName" value={bookName} onChange={(e) => { setBookName(e.target.value) }} required />
                                    </div>

                                    <div className="form-group">
                                        <label className="addbook-form-label" htmlFor="alternateTitle">AlternateTitle</label>
                                        <input className="addbook-form-input" type="text" name="alternateTitle" value={alternateTitle} onChange={(e) => { setAlternateTitle(e.target.value) }} />
                                    </div>
                                </div>

                                <div className='half'>
                                    <div className="form-group">
                                        <label className="addbook-form-label" htmlFor="author">Author Name<span className="required-field">*</span></label>
                                        <input className="addbook-form-input" type="text" name="author" value={author} onChange={(e) => { setAuthor(e.target.value) }} required />
                                    </div>

                                    <div className="form-group">
                                        <label className="addbook-form-label" htmlFor="language">Language</label>
                                        <input className="addbook-form-input" type="text" name="language" value={language} onChange={(e) => { setLanguage(e.target.value) }} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="addbook-form-label" htmlFor="publisher">Publisher</label>
                                    <input className="addbook-form-input" type="text" name="publisher" value={publisher} onChange={(e) => { setPublisher(e.target.value) }} />
                                </div>

                                <div className="form-group">
                                    <label className="addbook-form-label" htmlFor="copies">No.of Copies Available<span className="required-field">*</span></label>
                                    <input className="addbook-form-input" type="text" name="copies" value={bookCountAvailable} onChange={(e) => { setBookCountAvailable(e.target.value) }} required />
                                </div>

                                <div>
                                    <label className="addbook-form-label" htmlFor="categories">Categories<span className="required-field">*</span></label>
                                    <div className="semanticdropdown">
                                        <Dropdown
                                            placeholder='Category'
                                            fluid
                                            multiple
                                            search
                                            selection
                                            options={allCategories}
                                            value={categories}
                                            onChange={(event, value) => setCategories(value.value)}
                                        />
                                    </div>
                                </div>

                                <input className="addbook-submit" type="submit" value="SUBMIT" disabled={isLoading} />
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Books