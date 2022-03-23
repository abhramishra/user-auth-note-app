import React, { useState } from 'react';
import axios from '../config/axios'
import { useNavigate } from 'react-router-dom'

function Register(props) {
    
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}

    const navigate = useNavigate()

    const runValidation = () => {
        if ( username.trim().length == 0 ) {
            errors.name = "Name Can't be blank!!"
        } else if ( email.trim().length == 0 ) {
            errors.email = "Email can't be blank!!"
        } else if ( password.trim().length == 0 ) {
            errors.password = "Password cannot be blank!!"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        runValidation()
        if (Object.keys(errors).length == 0) {
            const formData = {
                username: username,
                email: email,
                password: password
            }
            axios.post('/users/register', formData)
                .then(res => {
                    console.log("res ", res)
                    const result = res.data
                    if (result.errors) {
                        alert(result.message)

                    } else {
                        alert("Successfully Registered!!")
                        setUsername('')
                        setEmail('')
                        setPassword('')
                        navigate('/login')
                    }
                })
                .catch(err => {
                    console.log("Error ", err)
                })
        } else {
            setFormErrors(errors)
        }

    }
    const handleChange = (e) => {
        if (e.target.name == 'username') {
            setUsername(e.target.value)
        }
        if(e.target.name == 'email') {
            setEmail(e.target.value)
        }
        if(e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }
    return (
        <div>
            <h1>User Registrations</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} onChange={handleChange} placeholder="Enter your username" name='username' />
                { formErrors.name && <span>{ formErrors.name }</span> }
                <br/>
                <input type='text' value={email} onChange={handleChange} placeholder="Enter your email" name='email' />
                { formErrors.email && <span>{ formErrors.email }</span> }
                <br/>
                <input type='password' value={password} onChange={handleChange} placeholder="Enter your password" name='password' />
                { formErrors.password && <span>{ formErrors.password }</span> }
                <br/>
                <input type='submit' />
            </form>
        </div>
    )
}

export default Register