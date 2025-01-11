import React from "react";
import './navSS.css'
import logo from './logo.svg'
const NavSS = () => {
    const userName = 'Sabarish V S'
    return (
       <div className="navSS">
        <img src={logo} alt="logo" className="logo" />
        <div className="profile">
            <div className="profileCircle">
                {/* img */}
            </div>
            <h1 className="nameSS">{userName}</h1>
        </div>
       </div>
    )
}
export default NavSS