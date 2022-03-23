import React from 'react';
import NotesForm from './NotesForm'
import axios from '../../config/axios'

function NotesAdd(props) {
    const { addNote } = props
    const formSubmit = (formData) => {
        console.log("Inside form submit")
        axios.post('/api/notes', formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res)
                const result = res.data
                addNote(result)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <h3>Add Note</h3>
            <NotesForm
                formSubmit={formSubmit}
            />
        </div>
    )
}
export default NotesAdd