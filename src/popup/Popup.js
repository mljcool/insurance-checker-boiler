import React, { useState, useEffect } from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';

import Header from 'PhaseOne/components/Header';
import MainPage from 'PhaseOne/MainPage';

import { AppContext } from '../context/AppContext';
import { GetStorageClient } from 'PhaseOne/storage';

const Popup = () => {
   const [isToggle, setIsToggle] = useState(false);
   const [clientList, setClientList] = useState([]);
   const toggleSettings = () => {
      setIsToggle((toggle) => !toggle);
   };

   useEffect(() => {
      GetStorageClient().then(({ clientList }) => {
         if (clientList.length) {
            console.log(clientList);
            setClientList(clientList);
         }
      });
   }, []);

   return (
      <AppContext.Provider value={{ title: 'Sample' }}>
         <div className='popup'>
            <Header switchMenu={toggleSettings} />
            <MainPage isToggle={isToggle} />
         </div>
      </AppContext.Provider>
   );
};

export default Popup;
