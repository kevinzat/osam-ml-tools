/* Copyright 2018 Kevin Zatloual. All rights reserved. */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import TopBar from './ui/TopBar';
import MainBody from './ui/MainBody';


ReactDOM.render(
  <div>
    <TopBar/>
    <MainBody/>
  </div>,
  document.getElementById('root'));


//registerServiceWorker();
