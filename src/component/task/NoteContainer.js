import React, { useState, useEffect } from 'react';
import TasksList from './NotesList'
import TasksAdd from './NotesAdd'
import axios from '../../config/axios'

function NoteContainer(props) {
    const [ notes, setNotes ] = useState([])
    useEffect(() => {
        axios.get('/api/notes', {
            headers: {
                'x-auth': localStorage.getItem('token') 
            }
        })
            .then(res => {
                console.log("Inside then ", res)
                const result = res.data
                if (result.errors) {
                    alert("Error")
                } else {
                    setNotes(result)
                }
            })
            .catch(err => {
                console.log("Inside catch ", err)
            })
    },[])

    const addNote = (data) => {
        setNotes([ data, ...notes ])
        alert("Your note has been added successfully")
    }

    const removeNote = (id) => {
        console.log("Inside remove note ", id)

        const result = notes.filter(note =>  note._id != id)
        setNotes(result)
    }

    const editNote = (formData) => {
        console.log("Inside Edit ", formData)
        const result = notes.map(note => {
            if(note._id == formData._id) {
                return {...formData}
            } else {
                return {...note}
            }
        })
        setNotes(result)
        alert("Your note has been edited successfully")
    }

    return (
        <div>
            <h2>My Notes  {notes.length}</h2>
            <TasksList
                notes={notes}
                removeNote={removeNote}
                editNote={editNote}
            />
            <TasksAdd
                addNote={addNote}
            />
        </div>
    )
}
export default NoteContainer