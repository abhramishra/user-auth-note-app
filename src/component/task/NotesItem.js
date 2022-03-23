import React, { useState } from 'react';
import axios from '../../config/axios'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import NotesUpdate from './NotesUpdate'

function NotesItem(props) {
    const { _id, title, body, user, removeNote, editNote } = props
    const [ toggle, setToggle ] = useState(false)

    const handleRemove = () => {
        const confirm = window.confirm('Are you sure you want to delete this note ?')
        if (confirm) {
            axios.delete(`/api/notes/${_id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then(res => {
                    if (res.data) {
                        removeNote(_id)
                    }
                })
                .catch(err => {
                    alert(err)
                })
        }
    }

    const handleShow = () => {
        Swal.fire({
            title: title,
            html: `<b>${body}</b>`
        })
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <div>
            <hr/>
            {
                !toggle ? (
                    <blockquote>
                        <Link to='' onClick={ handleShow }> { title } </Link>
                        <button onClick={handleToggle}> Edit </button>
                        <button onClick={handleRemove}> Delete </button>
                    </blockquote>
                ) : (
                    <React.Fragment>
                        <NotesUpdate
                            _id={_id}
                            title={title}
                            body={body}
                            editNote={editNote}
                            handleToggle={handleToggle}
                        />
                        <button onClick={handleToggle}>Cancel</button>
                    </React.Fragment>
                )
            }
            
            <hr/>
        </div>
    )
}

export default NotesItem