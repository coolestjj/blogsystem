import React from "react";
import logo_blog from "../img/logo_blog.png";

const Footer = () => {
    return (
        <footer>
            <img src={logo_blog} alt="logo" />
            <span>Made by cooljj, using <b>React.js</b></span>
        </footer>
    );
}

export default Footer;