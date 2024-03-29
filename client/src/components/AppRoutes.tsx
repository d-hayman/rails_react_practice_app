import {Route, Routes} from 'react-router-dom';

import  ArticlesList  from "../features/articles/ArticlesList";
import ArticleDetails from '../features/articles/ArticleDetails';
import NewArticleForm from '../features/articles/NewArticleForm';
import EditArticleForm from '../features/articles/EditArticleForm';
import AdminRoot from '../features/admin/AdminRoot';
import AdminUsers from '../features/admin/AdminUsers';
import AdminUsersPermissions from '../features/admin/AdminUsersPermissions';
import AdminInvites from '../features/admin/AdminInvites';
import AdminSettings from '../features/admin/AdminSettings';

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
            <Route path="/admin/invites" element={<AdminInvites/>}/>
            <Route path="/admin/settings" element={<AdminSettings/>}/>
        </Routes>
    )
}

export default AppRoutes;