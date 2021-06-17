import React, { useState, useEffect } from 'react';
import './Popup.css';
import Header from 'FinalPhaseOne/components/Header';
import MainPage from 'FinalPhaseOne/components/Main';
import { insurerList } from 'constant/insurers';
import { AppContext } from '../context/AppContext';
import {
  setChromeIdentity,
  GetStorageClient,
  getFamilyIdStorage,
} from 'FinalPhaseOne/storage';
import { getProviderConnections } from 'FinalPhaseOne/services/connect';
import {
  filterInsurance,
  zeroConnections,
  checkBeforeForProceed,
  filterizeConnections,
} from 'FinalPhaseOne/util';
import { setScrappingStructure } from 'FinalPhaseOne/services/mapper';

const setGlobalScrapingData = [];

const Popup = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isZeroConnections, setZeroConnections] = useState(true);

  const [clientList, setClientList] = useState([]);
  const [dataForScraping, setDataForScraping] = useState([]);
  const [insurerListRef, setInsurerListRef] = useState(insurerList);
  const [browserId, setBrowserId] = useState('');
  const [familyID, setFamilyID] = useState('');
  /** FUNCTION REFERENCE HERE  **/

  const onToggleSettings = () => {
    setIsToggle((toggle) => !toggle);
  };
  const onRecallConnect = (params) => {};
  const onUpdateSetListOfConnection = () => {
    getAllConnectedProviders(browserId);
  };

  /** Get ALl connected insurance and set connected status  **/
  const getAllConnectedProviders = (browserId) => {
    setIsLoading(true);
    getProviderConnections(browserId).then(({ succeeded, data }) => {
      if (succeeded) {
        setInsurerListRef(filterInsurance(insurerList, data));
        setZeroConnections(zeroConnections(insurerListRef));

        if (data.length === 1) {
          setIsToggle(false);
        }
      }
      setIsLoading(false);
    });
  };

  const getClientList = () => {
    GetStorageClient().then(({ clientList }) => {
      setClientList(clientList);
    });
  };

  const getStoreFamilyId = () => {
    getFamilyIdStorage().then(({ familyIdStorage }) => {
      setFamilyID(familyIdStorage);
    });
  };

  /** LIFE CYCLE  **/

  useEffect(() => {
    setChromeIdentity((chromeId) => {
      setBrowserId(chromeId);
      getAllConnectedProviders(chromeId);
      getClientList();
      getStoreFamilyId();
    });
  }, []);

  useEffect(
    () => {
      if (checkBeforeForProceed({ clientList, isZeroConnections })) {
        const getConnectedOnly = filterizeConnections(insurerListRef);
        setScrappingStructure(
          clientList,
          getConnectedOnly,
          browserId,
          familyID
        ).then((response) => {
          response.forEach((clients) => {
            clients.forEach((scraping) => {
              setDataForScraping((oldArray) => [...oldArray, scraping]);
              setGlobalScrapingData.push(scraping);
            });
          });
          console.log('setGlobalScrapingData', setGlobalScrapingData);
        });
      }
    },
    [clientList.length, isZeroConnections]
  );

  return (
    <AppContext.Provider
      value={{
        browserId,
        insurerListRef,
        dataForScraping,
        clientList,
        isLoading,
        isToggle,
        isZeroConnections,
        onToggleSettings,
        onRecallConnect,
        onUpdateSetListOfConnection,
      }}
    >
      <div className='popup'>
        <Header onSwitchMenu={onToggleSettings} isToggle={isToggle} />
        <MainPage />
      </div>
    </AppContext.Provider>
  );
};
export default Popup;
