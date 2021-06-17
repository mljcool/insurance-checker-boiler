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
import {
  getProviderConnections,
  onStartScrapingAPI,
} from 'FinalPhaseOne/services/connect';
import {
  filterInsurance,
  zeroConnections,
  checkBeforeForProceed,
  filterizeConnections,
  setScrapeStructure,
  makeCleanString,
} from 'FinalPhaseOne/util';
import {
  setScrappingStructure,
  mapScrapeForAPI,
} from 'FinalPhaseOne/services/mapper';

let setGlobalScrapingData = [];

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
  const onFilterData = (params) => {};
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

  const onFormDataScraping = () => {
    const getConnectedOnly = filterizeConnections(insurerListRef);
    setScrappingStructure(
      clientList,
      getConnectedOnly,
      browserId,
      familyID
    ).then((response) => {
      setScrapeStructure(response, (allSet) => {
        setGlobalScrapingData = allSet;
        setDataForScraping(allSet);
      });
    });
  };

  const onGetScraping = (promises) => {
    Promise.all(promises).then((responses) => {
      console.log('responses', responses);
      responses.forEach((response) => {
        const { succeeded, data, insurerId, messages } = response;
        if (succeeded) {
          if (data.length) {
            setDataForScraping(
              setGlobalScrapingData.map((resp) => {
                if (
                  resp.insurerId === insurerId &&
                  makeCleanString(resp.firstName) ===
                    makeCleanString(data[0].firstName)
                ) {
                  resp.isLoadingScrape = false;
                  resp.hasData = 'YES';
                  resp.policies = data.find(
                    (result) => result.insurerId === insurerId
                  ).policies;
                }
                return resp;
              })
            );
            return;
          }
          setDataForScraping(
            setGlobalScrapingData.map((display) => {
              if (display.insurerId === insurerId) {
                display.isLoadingScrape = false;
                display.hasData = !!data.length ? 'YES' : 'BLANK';
              }
              return display;
            })
          );
        } else {
          setDataForScraping(
            setGlobalScrapingData.map((display) => {
              if (display.insurerId === insurerId) {
                display.isLoadingScrape = false;
                display.hasData = 'BLANK';
                display.message = messages;
              }
              return display;
            })
          );
        }
      });
    });
  };

  /** LIFE CYCLE  **/

  useEffect(() => {
    setChromeIdentity((chromeId) => {
      setBrowserId(chromeId);
      getAllConnectedProviders(chromeId);
      getClientList();
      getStoreFamilyId();
      console.log('%c Set Chrome Identity step - 1 success', 'color: #bada55');
    });
  }, []);

  useEffect(
    () => {
      if (checkBeforeForProceed({ clientList, isZeroConnections })) {
        onFormDataScraping();
        console.log(
          '%c On Form Data Scraping step - 2 success',
          'color: #bada55'
        );
      }
    },
    [clientList.length, isZeroConnections]
  );

  useEffect(
    () => {
      if (dataForScraping.length) {
        const promises = [];
        setGlobalScrapingData.forEach((scrape, index) => {
          promises.push(onStartScrapingAPI([mapScrapeForAPI(scrape)]));
          console.log('promises', promises);
          if (index === setGlobalScrapingData.length - 1) {
            onGetScraping(promises);
          }
        });
        console.log('%c Ready To Scrape step - 3 success', 'color: #45ca4f');
      }
    },
    [dataForScraping.length]
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
