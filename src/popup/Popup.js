import React, { useState, useEffect } from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';

import Header from 'PhaseOne/components/Header';
import MainPage from 'PhaseOne/MainPage';
import { getProviderConnections } from 'PhaseOne/services/connect';

import { AppContext } from '../context/AppContext';
import { setChromeIdentity, GetStorageClient } from 'PhaseOne/storage';

const Popup = () => {
   const [isToggle, setIsToggle] = useState(false);
   const [clientList, setClientList] = useState([]);
   const [connectedInsurers, setConnectedInsurers] = useState([]);
   const [hasConnections, setHasConnections] = useState(false);
   const toggleSettings = () => {
      setIsToggle((toggle) => !toggle);
   };

   useEffect(() => {
      setChromeIdentity((chromeId) => {
         getProviderConnections(chromeId).then(({ succeeded, data }) => {
            if (succeeded) {
               setConnectedInsurers(data);
               setHasConnections(!!data.length);
            }
            console.log('getProviderConnections', data);
         });
      });

      GetStorageClient().then(({ clientList }) => {
         if (clientList.length) {
            console.log(clientList);
            setClientList(clientList);
         }
      });
   }, []);

   return (
      <AppContext.Provider
         value={{
            title: 'Sample',
            clientList,
            hasConnections,
            connectedInsurers,
            isToggle,
         }}>
         <div className='popup'>
            <Header switchMenu={toggleSettings} />
            <MainPage />
         </div>
      </AppContext.Provider>
   );
};

export default Popup;
