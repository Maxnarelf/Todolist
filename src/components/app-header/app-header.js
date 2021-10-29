import React from 'react';


import './app-header.css'

const AppHeader = ({importanted, allPosts}) => {
    return (
        <div className="app-header ">
            <h1 className="d-flex justify-content-center  ">To Do List</h1>
            <h2 className="d-flex justify-content-center">Всего добавлено {allPosts} записей, из них важных {importanted} </h2>
        </div>
    )
}

export default AppHeader;

