import React from 'react';
import {Link} from 'react-router-dom';


const NavBarForm = (props) => {
console.log("NavBarForm props", props)
  return (
  <nav className="navbar navbar-default">
    <div className="navbar-header">
        <Link className="navbar-brand" to="/">React App</Link>
      {props.loggedIn ? (
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/logout" onClick={props.onClick} >Log out</Link>
          </li>
          <li className="nav-item">
            {props.modalButton}
          </li>
        </ul>
      ) : (
        <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link to="/login">Log in</Link>
        </li>
        <li className="nav-item">
          <Link to="/signup">Sign up</Link>
        </li>
        </ul>
      )}
    </div>
  </nav>
);
};


export default NavBarForm;
