import React, { useState, useEffect } from 'react';
import axios from '../config/axios'
function Account(props) {
    const [ user, setUser ] = useState({})
    const [ loader, setLoader ] = useState(false)
    useEffect(() => {
        setLoader(true)
        axios.get('/users/account', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log("res ", res)
                const userInfo = res.data
                setUser(userInfo)
                setLoader(false)
            })
    },[])
    return (
        <div>
            {
                loader ? (
                    <React.Fragment>
                        Loading..........
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <h2>My Account</h2>
                        <h3>Username - { user.username }</h3>
                        <p>Email - {user.email}</p>
                    </React.Fragment>
                )
            }
        </div>
    )
}
export default Account