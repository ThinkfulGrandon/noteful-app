import React from 'react';
import './GoBack.css'
import NotefulContext from '../NotefulContext'
import PropTypes from 'prop-types';


class GoBack extends React.Component {
    static contextType = NotefulContext;

    getFolderName() {
        let folder = {};
        const {folders, notes} = this.context.data.selected
        let singleNote = notes.filter(note =>
            parseInt(this.props.match.params.note_id) === note.id)
        folder = folders.filter(folder => 
            folder.folder_id === singleNote[0].folder_id);
        // console.log(folder)
        return folder[0]?.folder_name
    }

    render() {
            return (
                <div>
                    <button 
                        onClick={() => this.props.history.goBack()}
                        className="go-back-btn">
                            Go Back
                    </button>
                        <h4>Folder: {
                         this.getFolderName()
                        
                        } </h4>
                </div>
            )
    }
}
GoBack.propTypes = {
    props : PropTypes.object
}


export default GoBack