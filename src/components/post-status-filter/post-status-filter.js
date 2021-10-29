import React, { Component } from 'react';


import './post-status-filter.css';

export default class PostStatusFilter extends Component {
    constructor(props){
        super(props);
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'important', label: 'Важное'}
        ]
    }
    render(){
        const buttons = this.buttons.map(({name, label}) => {
            return(
                <button key={name} type="button"className="btn btn-outline-secondary">{label}</button>
            )
        });
        return (
            <div className="btn-group">
               {buttons}
            </div>
        )
    }
}

