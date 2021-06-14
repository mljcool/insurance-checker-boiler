import React, { useState } from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

import MainPage from 'PhaseOne/MainPage';
import Settings from 'components/settings';
import Header from 'components/Header/Header';
import { AppContext } from '../context/AppContext';

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
      <AppContext.Provider value={{ title: 'Sample' }}>
         <div className='popup'>
            <Header switchMenu={toggleSettings} />
            {isToggle && (
               <WrapperPapper isToggle={isToggle}>
                  <Settings />
               </WrapperPapper>
            )}
            {!isToggle && (
               <WrapperPapper isToggle={!isToggle}>
                  <MainPage />
               </WrapperPapper>
            )}
         </div>
      </AppContext.Provider>
   );
};

export default Popup;
