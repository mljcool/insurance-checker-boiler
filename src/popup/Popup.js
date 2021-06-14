import React, { useState } from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';

import MainPage from 'PhaseOne/MainPage';
import Header from 'PhaseOne/components/Header';
import TabFilter from 'PhaseOne/components/TabFilter';
import PaperWrapper from 'PhaseOne/components/PaperWrapper';
import Settings from 'components/settings';
import { AppContext } from '../context/AppContext';

const Popup = () => {
   const [isToggle, setIsToggle] = useState(false);
   const toggleSettings = () => {
      setIsToggle((toggle) => !toggle);
   };
   return (
      <AppContext.Provider value={{ title: 'Sample' }}>
         <div className='popup'>
            <Header switchMenu={toggleSettings} />
            <TabFilter switchMenu={true} />
            {isToggle && (
               <PaperWrapper isToggle={isToggle}>
                  <Settings />
               </PaperWrapper>
            )}
            {!isToggle && (
               <PaperWrapper isToggle={!isToggle}>
                  <MainPage />
               </PaperWrapper>
            )}
         </div>
      </AppContext.Provider>
   );
};

export default Popup;
