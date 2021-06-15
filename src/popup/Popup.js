import React, { useState, useEffect } from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';

import Header from 'PhaseOne/components/Header';
import MainPage from 'PhaseOne/MainPage';
import { insurerList } from 'constant/insurers';
import { getProviderConnections } from 'PhaseOne/services/connect';
import { setScrappingStructure } from 'PhaseOne/services/mapper';
import { AppContext } from '../context/AppContext';
import { setChromeIdentity, GetStorageClient } from 'PhaseOne/storage';

let setGlobaleInsurers = [];
let setGlobaleClients = [];
let setGlobalBrowserId = '';

const Popup = () => {
   const [clientList, setClientList] = useState([]);
   const [connectedInsurers, setConnectedInsurers] = useState([]);
   const [dataScraping, setDataScraping] = useState([]);
   const [insurerListRef, setInsurerListRef] = useState(insurerList);
   const [browserId, setBrowserId] = useState('');

   const [isToggle, setIsToggle] = useState(false);
   const [hasConnections, setHasConnections] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const toggleSettings = () => {
      setIsToggle((toggle) => !toggle);
   };

   const shapeDataScraping = () => {
      setScrappingStructure(
         setGlobaleClients,
         setGlobaleInsurers,
         setGlobalBrowserId,
      ).then((setList) => {
         setDataScraping(setList);
         console.log('dataScraping', setList);
      });
   };

   const updateSetListConnection = (id, status) => {
      setInsurerListRef(
         insurerList.map((insurer) => {
            if (insurer.id === id) {
               insurer.isConnected = status;
            }
            return insurer;
         }),
      );
   };

   const setListConnection = (data) => {
      setInsurerListRef(
         insurerList.map((insurer) => {
            insurer.isConnected = data.some(
               (insurance) => insurance.insurerId === insurer.id,
            );
            return insurer;
         }),
      );
   };

   const recallConnect = () => {
      setIsLoading(true);
      getProviderConnections(setGlobalBrowserId)
         .then(({ succeeded, data }) => {
            setIsLoading(false);
            console.log('getProviderConnections', data);
            if (succeeded) {
               setGlobaleInsurers = data;
               setConnectedInsurers(data);
               setHasConnections(!!data.length);
               setListConnection(data);
               if (data.length === 1) {
                  setIsToggle(false);
               }
               if (data.length) {
                  shapeDataScraping(browserId);
               }
            }
         })
         .catch((err) => {
            setIsLoading(false);
         });
   };

   useEffect(() => {
      GetStorageClient().then(({ clientList }) => {
         if (clientList.length) {
            setGlobaleClients = clientList;
            setClientList(clientList);
            console.log('clientList', clientList);
         }
      });

      setChromeIdentity((chromeId) => {
         setGlobalBrowserId = chromeId;
         setBrowserId(chromeId);
         setTimeout(() => {
            recallConnect();
         }, 500);
      });
   }, []);

   return (
      <AppContext.Provider
         value={{
            browserId,
            clientList,
            insurerList: insurerListRef,
            connectedInsurers,
            isToggle,
            isLoading,
            hasConnections,
            dataScraping,
            toggleSettings,
            updateSetListConnection,
            recallConnect,
         }}>
         <div className='popup'>
            <Header switchMenu={toggleSettings} isToggle={isToggle} />
            <MainPage />
         </div>
      </AppContext.Provider>
   );
};

export default Popup;
