import React, { useState } from 'react';
import axios from '../../config/axios'

function NotesForm(props) {
    const { formSubmit, _id, title: heading, body: content, handleToggle } = props
    const [ title, setTitle ] = useState(heading ? heading : '')
    const [ body, setBody ] = useState(content ? content : '')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}

    const handleChange = (e) => {
        if (e.target.name == 'title') {
            setTitle(e.target.value)
        }
        if (e.target.name == 'body') {
            setBody(e.target.value)
        }
    }

    const runValidation = () => {
        if (title.trim().length == 0) {
            errors.title = "Note title can't be blank!"
        } else if( body.trim().length == 0 ) {
            errors.body = "Note body can't be empty!"
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // validation
        runValidation()
        if ( Object.keys(errors).length == 0 ) {
            const formData = {
                title: title,
                body: body
            }
            formSubmit(formData)
            if (handleToggle) {
                handleToggle()
            }
            setTitle('')
            setBody('')
        } else {
            setFormErrors(errors)
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Title' name='title' value={title} onChange={handleChange}  />
                { formErrors.title && <span>{ formErrors.title }</span> }
                <br/>
                <textarea placeholder='Body' name='body' value={body} onChange={handleChange}></textarea>
                { formErrors.body && <span>{ formErrors.body }</span> }
                <br/>
                <input type='submit' value='Add Note' />
            </form>
        </div>
    )
}

export default NotesForm