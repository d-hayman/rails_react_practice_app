import {Route, Routes} from 'react-router-dom';

import  ArticlesList  from "../features/articles/ArticlesList";
import ArticleDetails from '../features/articles/ArticleDetails';
import NewArticleForm from '../features/articles/NewArticleForm';
import EditArticleForm from '../features/articles/EditArticleForm';
import AdminRoot from '../features/admin/AdminRoot';
import AdminUsers from '../features/admin/AdminUsers';
import AdminUsersPermissions from '../features/admin/AdminUsersPermissions';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ArticlesList/>}/>
            <Route path="/article/:id" element={<ArticleDetails/>}/>
            <Route path="/new" element={<NewArticleForm/>}/>
            <Route path="/article/:id/edit" element={<EditArticleForm/>}/>

            <Route path="/admin" element={<AdminRoot/>}/>
            <Route path="/admin/users" element={<AdminUsers/>}/>
            <Route path="/admin/users/:id/permissions" element={<AdminUsersPermissions/>}/>
        </Routes>
    )
}

export default AppRoutes;