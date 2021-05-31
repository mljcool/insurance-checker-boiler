import React, { useState } from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

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
         {isToggle && (
            <Grow in={isToggle}>
               <Paper elevation={0}>
                  <Settings />
               </Paper>
            </Grow>
         )}
         {!isToggle && (
            <Grow in={!isToggle}>
               <Paper elevation={0}>
                  <Main />
               </Paper>
            </Grow>
         )}
      </div>
   );
};

export default Popup;
