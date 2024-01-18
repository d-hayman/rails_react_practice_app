import React from 'react';
import {Route, Routes} from 'react-router-dom';

import  ArticlesList  from "../features/articles/ArticlesList";
import ArticleDetails from '../features/articles/ArticleDetails';
import NewArticleForm from '../features/articles/NewArticleForm';
import EditArticleForm from '../features/articles/EditArticleForm';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ArticlesList/>}/>
            <Route path="/article/:id" element={<ArticleDetails/>}/>
            <Route path="/new" element={<NewArticleForm/>}/>
            <Route path="/article/:id/edit" element={<EditArticleForm/>}/>
        </Routes>
    )
}

export default AppRoutes;