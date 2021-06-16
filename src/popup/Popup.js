import React, { useState, useEffect } from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';

import Header from 'PhaseOne/components/Header';
import MainPage from 'PhaseOne/MainPage';
import { insurerList } from 'constant/insurers';
import {
   getProviderConnections,
   onStartScraping,
} from 'PhaseOne/services/connect';
import { setScrappingStructure } from 'PhaseOne/services/mapper';
import { AppContext } from '../context/AppContext';
import {
   setChromeIdentity,
   GetStorageClient,
   setHasDoneScraping,
   hasStorageDoneScraping,
   setStoreDataScraping,
   getFamilyId,
   getFamilyIdStorage,
   getStoreDataScraping,
} from 'PhaseOne/storage';
let setGlobaleInsurers = [];
let setGlobaleClients = [];
let setGlobalBrowserId = '';
let setGlobalfamilyId = '';

const Popup = () => {
   const [clientList, setClientList] = useState([]);
   const [connectedInsurers, setConnectedInsurers] = useState([]);
   const [dataScraping, setDataScraping] = useState([]);
   const [forDisplay, setForDisplay] = useState([]);
   const [forStorageDisplay, setForStorageDisplay] = useState([]);
   const [insurerListRef, setInsurerListRef] = useState(insurerList);
   const [browserId, setBrowserId] = useState('');
   const [familyId, setFamilyId] = useState('');

   const [isToggle, setIsToggle] = useState(false);
   const [hasConnections, setHasConnections] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isLoadingScrape, setIsLoadingScrape] = useState(false);

   const toggleSettings = () => {
      setIsToggle((toggle) => !toggle);
   };

   const onStartScrapingFromInsurer = () => {
      if (dataScraping.length) {
         console.log('response', dataScraping);
         setIsLoadingScrape(true);
         onStartScraping(dataScraping).then(
            ({ succeeded, data, insurerId, messages }) => {
               console.log('response', succeeded);
               setHasDoneScraping(succeeded);
               if (succeeded) {
                  if (data.length) {
                     console.log(`datahere1`);
                     const setData = data.map((resp) => {
                        resp.isLoadingScrape = false;
                        resp.hasData = 'YES';
                        return resp;
                     });
                     setForDisplay(setData);
                     setStoreDataScraping(JSON.stringify(setData));
                     return;
                  }
                  console.log(`datahere2`);
                  setForDisplay(
                     forDisplay.map((display) => {
                        if (display.insurerId === insurerId) {
                           display.isLoadingScrape = false;
                           display.hasData = !!data.length ? 'YES' : 'BLANK';
                        }
                        return display;
                     }),
                  );
               } else {
                  setForDisplay(
                     forDisplay.map((display) => {
                        display.isLoadingScrape = false;
                        display.hasData = 'BLANK';
                        display.message = messages;
                        return display;
                     }),
                  );
               }
            },
         );
      }
   };

   const shapeDataScraping = () => {
      setScrappingStructure(
         setGlobaleClients,
         setGlobaleInsurers,
         setGlobalBrowserId,
         setGlobalfamilyId,
      ).then(({ forPostData, forDisplayData }) => {
         setDataScraping(forPostData);
         setForDisplay(forDisplayData);
         console.log('dataScraping', forDisplayData);
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

   const getOldScrapingData = () => {
      getStoreDataScraping().then(({ storageScrape }) => {
         const parseList = JSON.parse(storageScrape);
         setForDisplay(parseList);
      });
   };

   const checkOld = () => {
      getFamilyIdStorage().then(({ familyIdStorage }) => {
         const isSame = familyIdStorage === familyId;
         if (familyIdStorage && isSame) {
            getOldScrapingData();
         } else {
            onStartScrapingFromInsurer();
         }
      });
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
               checkOld();
            }
         })
         .catch((err) => {
            setIsLoading(false);
         });
   };

   const onFilterData = (filterType) => {
      console.log('filterType', filterType);
   };

   useEffect(() => {
      GetStorageClient().then(({ clientList }) => {
         if (clientList.length) {
            setGlobaleClients = clientList;
            setClientList(clientList);
            console.log('clientList', clientList);
         }
      });

      getFamilyId().then(({ familyId }) => {
         setGlobalfamilyId = familyId;
         setFamilyId(familyId);
      });

      setChromeIdentity((chromeId) => {
         setGlobalBrowserId = chromeId;
         setBrowserId(chromeId);
      });
   }, []);

   useEffect(
      () => {
         setTimeout(() => {
            recallConnect();
         }, 500);
      },
      [browserId],
   );

   return (
      <AppContext.Provider
         value={{
            browserId,
            clientList,
            insurerList: insurerListRef,
            connectedInsurers,
            forDisplay,
            isToggle,
            isLoading,
            isLoadingScrape,
            hasConnections,
            dataScraping,
            toggleSettings,
            updateSetListConnection,
            recallConnect,
            onStartScrapingFromInsurer,
            onFilterData,
         }}>
         <div className='popup'>
            <Header switchMenu={toggleSettings} isToggle={isToggle} />
            <MainPage />
         </div>
      </AppContext.Provider>
   );
};

export default Popup;
