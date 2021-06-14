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
   const [insurerListRef, setInsurerListRef] = useState(insurerList);
   // const insurerListRef = useRef(insurerList);

   const toggleSettings = () => {
      setIsToggle((toggle) => !toggle);
   };

   const updateSetListConnection = (id, status) => {
      setInsurerListRef((prevState) => [
         ...prevState,
         insurerList.map((insurer) => {
            if (insurer.id === id) {
               insurer.isConnected = status;
            }
            return insurer;
         }),
      ]);
      console.log('setListConnection', insurerListRef);
   };

   const setListConnection = (data) => {
      setInsurerListRef((prevState) => [
         ...prevState,
         insurerList.map((insurer) => {
            insurer.isConnected = data.some(
               (insurance) => insurance.insurerId === insurer.id,
            );
            return insurer;
         }),
      ]);
      console.log('setListConnection', insurerListRef);
   };

   const recallConnect = (paramBrowserId) => {
      getProviderConnections(browserId || paramBrowserId).then(
         ({ succeeded, data }) => {
            if (succeeded) {
               setConnectedInsurers(data);
               setHasConnections(!!data.length);
               setListConnection(data);
            }
            console.log('getProviderConnections', data);
         },
      );
   };

   useEffect(() => {
      setChromeIdentity((chromeId) => {
         setBrowserId(chromeId);
         getProviderConnections(chromeId).then(({ succeeded, data }) => {
            if (succeeded) {
               recallConnect(chromeId);
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
            updateSetListConnection,
            recallConnect,
            insurerList: insurerListRef,
         }}>
         <div className='popup'>
            <Header switchMenu={toggleSettings} />
            <MainPage />
         </div>
      </AppContext.Provider>
   );
};

export default Popup;
