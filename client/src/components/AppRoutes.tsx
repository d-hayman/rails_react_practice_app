import React from 'react';
import {Route, Routes} from 'react-router-dom';

import  ArticlesList  from "../features/articles/ArticlesList";
import ArticleDetails from '../features/articles/ArticleDetails';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ArticlesList/>}/>
            <Route path="/article/:id" element={<ArticleDetails/>}/>
            <Route path="/new" element={<h1>New Post Form</h1>}/>
        </Routes>
    )
}

export default AppRoutes;