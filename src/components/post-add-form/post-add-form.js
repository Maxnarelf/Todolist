import React, { Component } from 'react';

import './post-add-form.css'

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state ={
            text: ''
        }
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'important', label: 'Важное'}
        ]
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onValueChange(e) {
        this.setState({
            text: e.target.value
        })
        

    }

    onSubmit(e){
        e.preventDefault();
        this.props.onAdd(this.state.text)
        this.setState({
            text: ''
        });
                
    }

    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const {filter, onFilterSelect} = this.props;
            const active = filter === name;
            const clazz = active ? 'btn-secondary' : 'btn-outline-secondary'
            return(
                <button 
                    key={name} 
                    type="button"
                    className={`btn ${clazz}`}
                    onClick={() => onFilterSelect(name)}>{label}</button>
            )
        });
        return (
            
           
            <form 
                className="bottom-panel d-flex" 
                onSubmit = {this.onSubmit}
                
                >
                <input
                    type="text"
                    
                    placeholder="Введите заметку"
                    className="form-control new-post-label"
                    onChange={this.onValueChange}
                    value={this.state.text}
                    required
                />
                <div className="btn-group">
                
                <button type="submit"className="btn btn-outline-secondary">Добавить</button>
                {buttons}
                
                </div>
            </form> 
           
        )
    }
}
