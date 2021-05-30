import React, { Component } from 'react';
import '@polymer/paper-button/paper-button.js';

import './Options.css';

class Options extends Component {
   render() {
      return (
         <div className='App'>
            <header className='App-header'>
               <a
                  className='App-link'
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'>
                  Insurance Options
               </a>
               <h1>currently unavailable</h1>
               <paper-button toggles raised class='green'>
                  toggles
               </paper-button>
            </header>
         </div>
      );
   }
}

export default Options;
