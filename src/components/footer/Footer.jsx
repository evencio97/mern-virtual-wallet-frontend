import React from 'react';
import './Footer.scss';
import PropTypes from 'prop-types';

const Footer = ({year= new Date().getFullYear(), author=null}) => ( 
    <footer id="footer">
        <p>
            Copyright { author.name && author.link? <a className="footer-autor" href={author.link} target="_blank" rel="noopener noreferrer">{author.name}</a> : null } &copy;{year}
        </p>
    </footer>
);

Footer.propTypes = {
    year: PropTypes.string,
    author: PropTypes.object
}

export default Footer;
