import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <p>
        <a className="copyright" href="https://github.com/vmcgargill">&copy; 2020 Vincent McGargill</a> 
      </p>
      <p>
      Email: <a className="email" id="email" href="mailto:vincentmcgargill@gmail.com">vincentmcgargill@gmail.com</a>
      </p>
      <p>
        <a href="https://github.com/vmcgargill" className="github" target="_blank" rel="noopener noreferrer">GitHub</a>
      </p>
      <p>
        <a href="https://www.linkedin.com/in/vincent-mcgargill-b6244660/" className="linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </p>
      <p>
        <a href="https://vmcgargill.github.io/portfolio/" className="portfolio" target="_blank" rel="noopener noreferrer">GitHub Portfolio</a>
      </p>
    </div>
  );
}

export default Footer;

