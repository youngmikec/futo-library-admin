import React, { useContext, useState } from 'react'
import './Signin.css'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext.js'
import { CircularProgress } from '@material-ui/core'

function Signin() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    // const [userType, setUserType] = useState('STUDENT')
    const [error, setError] = useState("")
    const { dispatch } = useContext(AuthContext)

    const API_URL = process.env.REACT_APP_API_URL
    
    const loginCall = async (userCredential, dispatch) => {
        setLoading(true);
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(API_URL+"auth/login", userCredential);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            setLoading(false);
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err })
            setError("Wrong Password Or Username")
            setLoading(false);
        }
    }

    const handleForm = (e) => {
        e.preventDefault()
        loginCall({ email, password }, dispatch)
    }

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <form onSubmit={handleForm}>
                    <h2 className="signin-title"> Log in</h2>
                    <p className="line"></p>
                    {/* <div className="persontype-question">
                        <p>Are you Admin member ?</p>
                        <Switch
                            onChange={() => setUserType('ADMIN')}
                            color="primary"
                        />
                    </div> */}
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signin-fields">
                        <label htmlFor='email'> <b>Email</b></label>
                        <input className='signin-textbox' type="text" placeholder="studentuser@gmail.com" name="email" required onChange={(e) => { setEmail(e.target.value) }}/>
                        <label htmlFor="password"><b>Password</b></label>
                        <input className='signin-textbox' type="password" minLength='6' placeholder="Enter Password" name="password" required onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    <button className="signin-button">
                        { loading ? <CircularProgress color='#ffffff' /> : "Log In" }
                    </button>
                    <a className="forget-pass" href="#home">Forgot password?</a>
                </form>
                <div className='signup-option'>
                    <p className="signup-question">Don't have an account? Contact Librarian</p>
                </div>
            </div>
        </div>
    )
}

export default Signin