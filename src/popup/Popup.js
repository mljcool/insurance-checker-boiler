import React, { useState } from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';

import Main from 'components/main';
import Settings from 'components/settings';
import Header from 'components/Header/Header';

const Popup = () => {
   const [isToggle, setIsToggle] = useState(false);

   const toggleSettings = () => {
      setIsToggle((v) => !v);
      console.log('COOL', isToggle);
   };

   return (
      <div className='popup'>
         <Header switchMenu={toggleSettings} />
         {isToggle && <Settings />}
         {!isToggle && <Main />}

         <p className='contrib-msg'>
            We would love some of your help in making this boilerplate even
            better. <br />
         </p>
      </div>
   );
};

export default Popup;
