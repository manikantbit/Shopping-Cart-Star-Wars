import React,{Component} from 'react';

class Navbar extends Component{
    render(){
        return (
            <div className="header">
            <nav className="navbar navbar-default" style={{marginTop:'25px'}}>
                <div className = "navbar-header">
                 <a href= '#' title = "Clicktime.com">
                     <img alt="Clicktime Logo" src = "https://www.clicktime.com/images/clicktime-logo-blue.png" style={{width:"250px",height:"46px"}}></img>
                 </a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                     <li><a href="#">Login</a></li>
                     <li><a href="#">Sign Up</a></li>
                     <li><a href="#">Help</a></li>
                </ul>
                </nav>
            </div>
        )
    }
}
export default Navbar;