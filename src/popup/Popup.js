import React, { useState } from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

import Main from 'components/main';
import Settings from 'components/settings';
import Header from 'components/Header/Header';

const WrapperPapper = ({ isToggle = false, children }) => {
   return (
      <Grow in={isToggle}>
         <Paper elevation={0} className='page_render'>
            {children}
         </Paper>
      </Grow>
   );
};

const Popup = () => {
   const [isToggle, setIsToggle] = useState(false);

   const toggleSettings = () => {
      setIsToggle((toggle) => !toggle);
   };

   return (
      <div className='popup'>
         <Header switchMenu={toggleSettings} />
         {isToggle && (
            <WrapperPapper isToggle={isToggle}>
               <Settings />
            </WrapperPapper>
         )}
         {!isToggle && (
            <WrapperPapper isToggle={!isToggle}>
               <Main />
            </WrapperPapper>
         )}
      </div>
   );
};

export default Popup;
