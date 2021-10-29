import React, { Component } from 'react';
import AppHeader from '../app-header';
// import SearchPanel from '../search-panel';
// import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
// import {nanoid} from 'nanoid';

import './app.css';

export default class App extends Component  {
    constructor(props){
        super(props);
       
        this.state = {
            data: [],
            editItemId: undefined,
            filter: 'all',
            editName: '',
            isVisible: false
            
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onTogglePerform = this.onTogglePerform.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        

        // this.maxId = 13;
    }
    deleteItem(id){
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newArr
            }
        }, () => {
            window.localStorage.setItem('dataList', JSON.stringify(this.state.data));
        });
    }

    editItem(id){
        this.setState (({
            editItemId: id
        }))
        
    }
    
    editSuccess = (id, name) => {
        const {data} = this.state;
        const newPosts = [...data].map((item) => {
            return id === item.id ? {
                ...item,
                label: name,

            } : item;
        })
        this.setState (({
            data: newPosts,
            editItemId: undefined
        }), () => {
            window.localStorage.setItem('dataList', JSON.stringify(this.state.data));
        })
    }

    editCancel = () => {
        this.setState(({
            editItemId : undefined
        }))
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            perform: false,
            id: Math.random().toString(32).substr(2, 12)
        }
        this.setState(({data}) => {
            const newArr = [newItem, ...data];
                return {
                    data: newArr
                }
            
        }, () => {
            window.localStorage.setItem('dataList', JSON.stringify(this.state.data));
        });
    }

    onToggleImportant (id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
               
            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        }) 
    }

    onTogglePerform (id) {
        
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
               
            const old = data[index];
            const newItem = {...old, perform: !old.perform};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        }) 
        console.log(id);
        
    }

    
    filterPost(items, filter) {
        if (filter === 'important'){
            return items.filter(item => item.important)
        } else {
            return items
        }
    }

    onFilterSelect(filter) {
        this.setState({filter})
        

    }   
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        const data = window.localStorage.getItem('dataList');
        const parsedData = JSON.parse(data);

        this.setState({
            data: parsedData,
        })
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll = () => {
        
        if (window.scrollY > 100  && !this.state.isVisible) {
          this.setState({ isVisible: true });
        } else if (window.scrollY < 100 && this.state.isVisible) {
          this.setState({ isVisible: false });
        }
    };

    topScroll = () => {
        window.scrollTo(0, 0);
    };
    
    render() {
        
        const {data, filter, editItemId, isVisible } = this.state;
        const importanted = data.filter(item => item.important).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPost(data, filter);
        
        return (
            <div className="app"> 
                <AppHeader
                    importanted={importanted}
                    allPosts={allPosts}

                />
                    
                {/* <div className="search-panel d-flex">
                  <SearchPanel/>
                  <PostStatusFilter/>
                </div> */}
                <PostAddForm
                onAdd={this.addItem}
                filter={filter}
                onFilterSelect={this.onFilterSelect}/>
                
                <PostList 
                isVisible={isVisible}
                topScroll={this.topScroll}
                editItemId={editItemId}
                posts={visiblePosts}
                onDelete={this.deleteItem}
                onEdit={this.editItem}
                editSuccess={this.editSuccess}
                editCancel={this.editItem}
                onToggleImportant={this.onToggleImportant}
                onTogglePerform={this.onTogglePerform}/>
                
                
            </div>  
            )
     }

  

   
}

