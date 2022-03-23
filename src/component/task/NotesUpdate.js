import React from 'react'
import NotesForm from './NotesForm'
import axios from '../../config/axios'

function NotesUpdate(props) {
    const { _id, title, body, editNote, handleToggle } = props
    const formSubmit = (formData) => {
        console.log("Inside form submit ", formData)
        axios.put(`/api/notes/${_id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(res => {
                if (res.data) {
                    editNote(res.data)
                }
            })
            .catch(err => {
                alert(err)
            })
    }
    return (
        <div>
            <h2>Edit Notes</h2>
            <NotesForm
                _id={_id}
                title={title}
                body={body}
                formSubmit={formSubmit}
                handleToggle={handleToggle}
            />
        </div>
    )
}

export default NotesUpdate