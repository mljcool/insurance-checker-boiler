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

const Popup = () => {
   const [isToggle, setIsToggle] = useState(false);
   const [clientList, setClientList] = useState([]);
   const [browserId, setBrowserId] = useState('');
   const [connectedInsurers, setConnectedInsurers] = useState([]);
   const [hasConnections, setHasConnections] = useState(false);
   const [insurerListRef, setInsurerListRef] = useState(insurerList);
   const [isLoading, setIsLoading] = useState(false);
   const [dataScraping, setDataScraping] = useState([]);

   const toggleSettings = () => {
      setIsToggle((toggle) => !toggle);
   };

   const shapeDataScraping = (browserId) => {
      setScrappingStructure(
         setGlobaleClients,
         setGlobaleInsurers,
         browserId,
      ).then((setList) => {
         setDataScraping(setList);
         console.log('dataScraping', setList);
      });
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
   };

   const recallConnect = (paramBrowserId) => {
      const browserId = browserId || paramBrowserId;
      setIsLoading(true);
      getProviderConnections(browserId).then(({ succeeded, data }) => {
         setIsLoading(false);
         if (succeeded) {
            setGlobaleInsurers = data;
            setConnectedInsurers(data);
            setHasConnections(!!data.length);
            setListConnection(data);
            if (data.length === 1) {
               setIsToggle(false);
            }

            shapeDataScraping(browserId);
         }
         console.log('getProviderConnections', data);
      });
   };

   useEffect(() => {
      GetStorageClient().then(({ clientList }) => {
         if (clientList.length) {
            console.log(clientList);
            setGlobaleClients = clientList;
            setClientList(clientList);
         }
      });

      setChromeIdentity((chromeId) => {
         setBrowserId(chromeId);
         recallConnect(chromeId);
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
            toggleSettings,
            updateSetListConnection,
            recallConnect,
         }}>
         <div className='popup'>
            <Header switchMenu={toggleSettings} />
            <MainPage />
         </div>
      </AppContext.Provider>
   );
};

export default Popup;
