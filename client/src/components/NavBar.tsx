import React from 'react';
import {Link} from 'react-router-dom';
class NavBar extends React.Component {
    render(){
        return (
            <nav>
                <Link to="/">Posts List</Link>
                {" | "}
                <Link to="/new">New Post</Link>
            </nav>
        );
    }
}

export default NavBar;