import React, {useState} from 'react';
import axios from '../config/axios'
import { useNavigate } from 'react-router-dom'

function Login(props) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}

    const navigate = useNavigate()

    const runValidation = () => {
        if (email.trim().length == 0) {
            errors.email = "email can't be blank !!"
        } else if (password.trim().length == 0) {
            errors.password = "Password can't be blank !!"
        }
    }
    const handleChange = (e) => {
        if (e.target.name == 'email'){
            setEmail(e.target.value)
        }
        if (e.target.name == 'password'){
            setPassword(e.target.value)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if (Object.keys(errors).length == 0) {
            const formData = {
                email: email,
                password: password
            }
            // console.log(formData)
            axios.post('/users/login', formData)
                .then(res => {
                    const result = res.data
                    if (result.errors) {
                        alert(result.errors)
                    } else {
                        console.log(result)
                        alert("Successfully Logged in!")
                        localStorage.setItem('token', result.token)
                        navigate('/')
                        props.handleToggle()
                    }
                })
                .catch(err => {
                    console.log("Error ",err)
                })
        } else {
            setFormErrors(errors)
        }
        
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' value={email} name='email' onChange={handleChange} placeholder='email' />
                { formErrors.email && <span>{ formErrors.email }</span> }
                <br/>
                <input type='password' value={password} name='password' onChange={handleChange} placeholder='Password' />
                { formErrors.password && <span>{ formErrors.password }</span>}
                <br/>
                <input type='submit' value='Login' />
            </form>
        </div>
    )
}

export default Login