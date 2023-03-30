import React from 'react';
import logo from '../assets/Resume.pdf';

function Resume() {
  return (
    <div>
      <br></br><br></br>
      <iframe title="Resume" src={logo} width="800" height="1100"></iframe>
    </div>
  );
}

export default Resume;