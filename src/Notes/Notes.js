import React from 'react';
import './Notes.css'
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types';



class Notes extends React.Component {

    static contextType = NotefulContext;


    handleDelete = e => {
        e.preventDefault()
        let id = (e.target.id)
        fetch(`http://localhost:8000/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(response => {
                if(!response.ok) 
                    return response.json().then(e => Promise.reject(e))
                return response.json()
            .then(() => {
                this.props.history.push('/')
            })
            .then(() => {
                this.context.deleteNote(id)
            })
            .catch(error => {
                console.error({ error })
            })
        })
    }

    render() {
        let notes = [];
        if(this.props.match.path === '/') {
            notes = [...this.context.data.selected.notes];
        } 
        else if (this.props.match.path === "/notes/:note_id") {
            notes = this.context.data.selected.notes.filter(item => item.id === parseInt(this.props.match.params.note_id))
        } 
        else {
            notes = this.context.data.selected.notes.filter(note => note.folder_id === parseInt(this.props.match.params.folder_id));
        }
        const noteList = notes.map((obj, idx) => {
            return(
                <div className="wrapper" id={obj.id} key={idx}>
                    <Link to={`/notes/${obj.id}`}>
                        <button 
                            type="button"
                            className="note-btn"
                            >
                            <h3 className="note-title" id={obj.id}>
                                    {obj.name} 
                            </h3>
                        </button>
                    </Link>

                    <div className="note-bottom">
                        <h5 className="note-date">{obj.modified}</h5>
                        <button type="button"
                            className="delete-btn"
                            key={obj.id}
                            id={obj.id}
                            onClick = {e => this.handleDelete(e)}>
                                Delete Note
                        </button>
                    </div>
                    <div className="note-content">
                        { notes.length !== 1 
                        ? ""
                        : notes[0].content}
                    </div>
                </div>
            )
        })

        return (

            <div className="note-container">
                {noteList}
            </div>
        )
    }
}

Notes.propTypes ={
    match : PropTypes.object.isRequired
}

export default Notes