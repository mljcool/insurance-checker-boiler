import React, { useState, useEffect, useRef } from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';

import Header from 'PhaseOne/components/Header';
import MainPage from 'PhaseOne/MainPage';
import { insurerList } from 'constant/insurers';
import { getProviderConnections } from 'PhaseOne/services/connect';
import { AppContext } from '../context/AppContext';
import { setChromeIdentity, GetStorageClient } from 'PhaseOne/storage';

const Popup = () => {
   const [isToggle, setIsToggle] = useState(false);
   const [clientList, setClientList] = useState([]);
   const [browserId, setBrowserId] = useState('');
   const [connectedInsurers, setConnectedInsurers] = useState([]);
   const [hasConnections, setHasConnections] = useState(false);
   const insurerListRef = useRef(insurerList);

   const toggleSettings = () => {
      setIsToggle((toggle) => !toggle);
   };

   useEffect(() => {
      setChromeIdentity((chromeId) => {
         setBrowserId(chromeId);
         getProviderConnections(chromeId).then(({ succeeded, data }) => {
            if (succeeded) {
               setConnectedInsurers(data);
               setHasConnections(!!data.length);
               data.forEach((insurance) => {
                  insurerListRef.current = insurerList.map((insurer) => {
                     console.log('insurerListRef', insurer);
                     if (insurance.insurerId === insurer.id) {
                        insurer.isConnected = true;
                     }
                     return insurer;
                  });
                  console.log('insurerListRef', insurerListRef.current);
               });
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
            toggleSettings,
            browserId,
            insurerList: insurerListRef.current,
         }}>
         <div className='popup'>
            <Header switchMenu={toggleSettings} />
            <MainPage />
         </div>
      </AppContext.Provider>
   );
};

export default Popup;
