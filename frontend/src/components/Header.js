
import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    render() {
        return  (
           <header style={headerS}>
               <h1>Are You Ready TODO Ninka?</h1>
               <Link  style={headerSLink} to="/">Home</Link> || <Link  style={headerSLink} to="/about">About</Link>
           </header>
            )
    }
}
const headerS ={
    backgroundColor:"#4A235A",
    color: "#ffff",
    textAlign: "center",
    padding: "10px",
    marginBottom: "15px"
}

const headerSLink = {
    color:"white"
}

export default Header;
