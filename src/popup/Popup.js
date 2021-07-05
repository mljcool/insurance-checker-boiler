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
  GetStorageAdviser,
  GetStorageToken,
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
  filterSatus,
  isLastIndex,
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
  const [countConnected, setCountConnected] = useState(0);
  const [browserId, setBrowserId] = useState('');
  const [familyID, setFamilyID] = useState('');
  const [filterName, setFilterName] = useState('');

  const [adviserData, setAdviserData] = useState('');
  const [jwtToken, setJWTtoken] = useState('');

  /** FUNCTION REFERENCE HERE  **/

  const onRecallConnect = () => {};
  const onToggleSettings = () => {
    setIsToggle((toggle) => !toggle);
  };
  const onFilteInsurances = (filterType) => {
    setFilterName(filterType);

    console.log('newResults', filterType);
    const newResults = filterSatus(setGlobalScrapingData, filterType);
    if (filterType === 'All') {
      setDataForScraping(setGlobalScrapingData);
      return;
    }
    setDataForScraping(newResults);
  };
  const onUpdateSetListOfConnection = (recall = false) => {
    getAllConnectedProviders(browserId, recall);
  };

  /** Get ALl connected insurance and set connected status  **/
  const getAllConnectedProviders = (browserId, recall = false) => {
    setIsLoading(true);
    getProviderConnections(browserId).then(({ succeeded, data }) => {
      if (succeeded) {
        const getOnlyActiveInsurance = insurerList.filter(
          (insured) => insured.isActive
        );
        setInsurerListRef(filterInsurance(getOnlyActiveInsurance, data));
        setZeroConnections(zeroConnections(insurerListRef));

        if (data.length === 1) {
          setIsToggle(false);
        } else {
          if (recall) {
            onStartSrcaping();
          }
        }
        setCountConnected(data.length);
      }
      setIsLoading(false);
    });
  };

  const getClientList = () => {
    GetStorageClient().then(({ clientList = [] }) => {
      setClientList((clientList || []).sort().reverse());
    });
  };

  const getAdviserData = () => {
    GetStorageAdviser().then(({ adviserDetails = {} }) => {
      console.log('getAdviserData', adviserDetails);
      setAdviserData(adviserDetails);
    });
  };

  const getJWTtokenData = () => {
    GetStorageToken().then(({ jwtToken = {} }) => {
      console.log('jwtToken', jwtToken);
      setJWTtoken(jwtToken);
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
              if (display.insurerId === insurerId && !display.policies.length) {
                display.isLoadingScrape = false;
                display.hasData = !!data.length ? 'YES' : 'BLANK';
                display.message = messages;
              }
              return display;
            })
          );

          console.log('if data.length', setGlobalScrapingData);
          console.log('if data.length insurerId', insurerId);
        } else {
          console.log('else null');
          setDataForScraping(
            setGlobalScrapingData.map((display) => {
              if (display.insurerId === insurerId && !display.policies.length) {
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

  const onStartSrcaping = () => {
    const promises = [];
    setGlobalScrapingData.forEach((scrape, index) => {
      scrape.accessToken = jwtToken;
      promises.push(onStartScrapingAPI([mapScrapeForAPI(scrape)]));

      if (isLastIndex(index, setGlobalScrapingData)) {
        onGetScraping(promises);
      }
    });
  };

  const secondCoreFuntions = () => {
    if (checkBeforeForProceed({ clientList, isZeroConnections })) {
      onFormDataScraping();
      console.log(
        '%c On Form Data Scraping step - 2 success',
        'color: #bada55'
      );
    }
    if (dataForScraping.length && !filterName) {
      onStartSrcaping();
      console.log('%c Ready To Scrape step - 3 success', 'color: #45ca4f');
    }
  };

  const coreFunctions = () => {
    setChromeIdentity((chromeId) => {
      setBrowserId(chromeId);
      getAllConnectedProviders(chromeId, false);
      getClientList();
      getAdviserData();
      getJWTtokenData();
      getStoreFamilyId();
      console.log('%c Set Chrome Identity step - 1 success', 'color: #bada55');
    });
  };

  /** LIFE CYCLE  **/

  useEffect(() => {
    coreFunctions();
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
    [clientList.length, isZeroConnections, countConnected]
  );

  useEffect(
    () => {
      if (dataForScraping.length && !filterName) {
        setTimeout(() => {
          onStartSrcaping();
        }, 2500);
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
        filterName,
        isLoading,
        isToggle,
        isZeroConnections,
        jwtToken,
        adviserData,
        onToggleSettings,
        onRecallConnect,
        onUpdateSetListOfConnection,
        onFilteInsurances,
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
