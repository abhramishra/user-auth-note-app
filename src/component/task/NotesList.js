import React from 'react';
import NotesItem from  './NotesItem'

function NotesList(props) {
    const { notes, removeNote, editNote }  = props
    console.log(notes)
    return (
        <div>
            
            {
                notes.length ? (
                        notes.map(note => {
                            return <NotesItem 
                                    key={note._id} 
                                    {...note} 
                                    removeNote={removeNote}
                                    editNote={editNote}
                                   />
                        })
                ) : (
                    <div>
                        <h2>No notes found... Add your first note here</h2>
                    </div>
                )
                
            }
        </div>
    )
}

export default NotesList