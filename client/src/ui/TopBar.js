/* Copyright 2018 Kevin Zatloual. All rights reserved. */

import React from 'react';


const TopBar = () => {
//    <div className="navbar" style={{background: 'rgb(18,123,191)',
  return (
    <div className="navbar" style={{background: 'rgb(27,139,205)',
                                    marginBottom: '10px'}}>
      <span className="navbar-brand mb-0 h1" style={{color: 'white'}}>
        <img src="osam.png" height="30" width="30" alt="logo"
             style={{marginRight: '10px', padding: '2px', borderRadius: '2px', backgroundColor: 'white'}} />
        <span style={{position: 'relative', top: '3px'}}>OSAM ML Tools</span>
      </span>
    </div>);
}

export default TopBar;
