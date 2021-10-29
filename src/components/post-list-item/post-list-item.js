import React, { Component } from 'react';

import './post-list-item.css'

export default class PostListItem extends Component{
    constructor(props) {
        super(props);
        const {label} = this.props;
        this.state = {
            newName: label
        }
    }

    render() {
        const {newName} = this.state;
        const {label, onDelete, onEdit, onToggleImportant, onTogglePerform,  isEditing, onEditSuccess, onEditCencel, id} = this.props;
 
        let classNames = 'app-list-item   d-flex justify-content-between';


       
        return(
            <div className={classNames}>
                <div className="break" >
                    {isEditing ? (
                        <input  value = {newName} onChange ={(e) => {
                            this.setState({newName: e.target.value})
                            
                        }}/>
                        
                    ) : (
                        <span className="app-list-item-label">
                            {label}
                        </span>
                    )}
                
                </div>
                <div className="d-flex justify-content-center align-items-center">
                {isEditing ? (
                    <>
                    <button 
                        className="btn-outline-success btn-sm"
                        type="button"
                        onClick={() => onEditSuccess(id, newName)}
                        disabled={!newName}
                    >
                        <i className="bi bi-check-lg"></i>
                    </button>
                    <button
                        className=" btn-outline-danger btn-sm"
                        type="button"
                        onClick={() => onEditCencel(label) }
                    >
                        <i className="bi bi-x-lg"></i>
                     </button>
                    </>
                ) : (
                    <>
                   
                    <button 
                        className="btn-perform btn-sm"
                        type="button"
                        onClick={onTogglePerform}>
                        <i className="bi bi-check-lg"></i>
                    </button>
                    <button 
                        className="btn-star btn-sm"
                        type="button"
                        onClick={onToggleImportant}>
                        <i className="bi bi-star-fill"></i>
                    </button>
                    <button 
                        className="btn-edit btn-sm"
                        type="button"
                        onClick={onEdit}>
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button 
                        className=" btn-trash btn-sm" 
                        type="button"
                        onClick={onDelete}>
                        <i className="bi bi-trash"></i>
                    </button>
                    
                </>
                
                )}
                    </div>

            </div>
        )
    }
}

