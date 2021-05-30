import React from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';

import Sample from 'components/Sample';

const Popup = () => {
   return (
      <div className='popup'>
         <Sample />
         <p className='popup-greet'>
            Thanks for using complex changess
            <span className='brand'>Modern extension Mark Projects</span>
         </p>

         <p className='contrib-msg'>
            We would love some of your help in making this boilerplate even
            better. <br />
         </p>
         <paper-button toggles raised class='green'>
            toggles
         </paper-button>
      </div>
   );
};

export default Popup;
