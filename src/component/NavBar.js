import React, { useState, useEffect } from 'react';
import { Link, Route, Routes  } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
import Login from './Login'
import Account from './Account'
import NoteContainer from './task/NoteContainer'

function NavBar(props) {
    const { userLogin, handleToggle } = props

    const handleLogout = () => {
        const confirm = window.confirm('Are you sure you want to logout ?')
        if (confirm) {
            localStorage.removeItem('token')
            props.handleToggle()
        }
    }
    return (
        <div>
            <ul>
                {
                    userLogin ? (
                        <React.Fragment>
                            <li><Link to="/">Home </Link></li>
                            <li><Link to='/account'>Account</Link></li>
                            <li><Link to='/tasks'>My Task</Link></li>
                            <li><Link to='' onClick={handleLogout}>Logout</Link></li>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <li><Link to="/">Home </Link></li>
                            <li><Link to='/register'>Register</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                        </React.Fragment>
                    )
                }

            </ul>
            <Routes>
                <Route path="/" element={<Home/>} exact={true} />
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login  handleToggle={handleToggle} />} />
                <Route path='/account' element={<Account/>} />
                <Route path='/tasks' element={<NoteContainer/>} />
            </Routes>
        </div>
    )
}

export default NavBar