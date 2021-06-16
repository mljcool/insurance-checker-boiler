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
   setStoreDataScraping,
   getFamilyId,
   getFamilyIdStorage,
   getStoreDataScraping,
} from 'PhaseOne/storage';
let setGlobaleInsurers = [];
let setGlobaleClients = [];
let setGlobaleUIforDisplay = [];
let setGlobalBrowserId = '';
let setGlobalfamilyId = '';
let noResults = '';

const Popup = () => {
   const [clientList, setClientList] = useState([]);
   const [connectedInsurers, setConnectedInsurers] = useState([]);
   const [dataScraping, setDataAPIScraping] = useState([]);
   const [forDisplay, setForUIDisplay] = useState([]);
   const [forDisplayPlaceHolder, setForDisplayPlaceHolder] = useState([]);
   const [insurerListRef, setInsurerListRef] = useState(insurerList);
   const [browserId, setBrowserId] = useState('');
   const [familyId, setFamilyId] = useState('');
   const [filterName, setFilterName] = useState('');

   const [isToggle, setIsToggle] = useState(false);
   const [hasConnections, setHasConnections] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [isLoadingScraping, setIsLoadingScrape] = useState(false);

   const toggleSettings = () => {
      setIsToggle((toggle) => !toggle);
   };

   const onStartScrapingFromInsurer = () => {
      console.log('onStartScrapingFromInsurer', dataScraping);
      if (dataScraping.length) {
         setIsLoadingScrape(true);
         onStartScraping(dataScraping).then(
            ({ succeeded, data, insurerId, messages }) => {
               if (succeeded) {
                  console.log('response', data);
                  if (data.length) {
                     console.log(`datahere1`, forDisplay);
                     const setData = data.map((resp) => {
                        resp.isLoadingScrape = false;
                        resp.hasData = 'YES';
                        return resp;
                     });
                     setForUIDisplay(setData);
                     setForDisplayPlaceHolder(setData);
                     setStoreDataScraping(JSON.stringify(setData));
                     return;
                  }

                  console.log(`datahere2`, forDisplay);
                  setForUIDisplay(
                     setGlobaleUIforDisplay.map((display) => {
                        if (display.insurerId === insurerId) {
                           display.isLoadingScrape = false;
                           display.hasData = !!data.length ? 'YES' : 'BLANK';
                        }
                        return display;
                     }),
                  );

                  setForDisplayPlaceHolder(forDisplay);
                  setStoreDataScraping(JSON.stringify(forDisplay));
               } else {
                  setForUIDisplay(
                     setGlobaleUIforDisplay.map((display) => {
                        display.isLoadingScrape = false;
                        display.hasData = 'BLANK';
                        display.message = messages;
                        return display;
                     }),
                  );
                  setForDisplayPlaceHolder(forDisplay);
                  setStoreDataScraping(JSON.stringify(forDisplay));
               }
               setHasDoneScraping(succeeded);
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
         setGlobaleUIforDisplay = forDisplayData;
         setDataAPIScraping(forPostData);
         setForUIDisplay(forDisplayData);
         setForDisplayPlaceHolder(forDisplayData);

         console.log('forDisplayData', forDisplayData);
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
         console.log('getOldScrapingData', storageScrape);
         if (!!parseList.length) {
            setForDisplayPlaceHolder(parseList);
            setForUIDisplay(parseList);
         } else {
            onStartScrapingFromInsurer();
         }
      });
   };

   const checkOld = () => {
      console.log('checkOld');
      getFamilyIdStorage().then(({ familyIdStorage }) => {
         const isSame = familyIdStorage === familyId;
         if (familyIdStorage && isSame) {
            getOldScrapingData();
            console.log('checkOld111', isSame);
         } else {
            onStartScrapingFromInsurer();
         }
      });
   };

   const recallConnect = () => {
      console.log('recallConnect');
      setIsLoading(true);
      getProviderConnections(setGlobalBrowserId)
         .then(({ succeeded, data }) => {
            console.log('getProviderConnections', data);
            setIsLoading(false);
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

   const onFilterData = (filterType) => {
      setFilterName(filterType);
      setForUIDisplay(forDisplayPlaceHolder);
      console.log('filterType', forDisplay);
      if (filterType === 'All') {
         setForUIDisplay(forDisplayPlaceHolder);
         return;
      }
      setForUIDisplay(
         forDisplay.filter((policy) =>
            policy.policies.some(
               (insurer) => insurer.policyStatus === filterType,
            ),
         ),
      );
   };

   // set first all data
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
         recallConnect(chromeId);
      });
   }, []);

   useEffect(
      () => {
         setTimeout(() => {
            if (dataScraping.length) {
               checkOld();
            }
         }, 3000);
      },
      [dataScraping.length],
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
            isLoadingScraping,
            hasConnections,
            dataScraping,
            filterName,
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
