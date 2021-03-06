import React, { useState, useReducer, useEffect } from 'react';
import './Popup.css';
import '@polymer/paper-button/paper-button.js';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

import Main from 'components/main';
import Settings from 'components/settings';
import Header from 'components/Header/Header';
import { AppContext, reducer, initialState } from '../context/AppContext';
import { insurerList } from 'constant/insurers';
import {
  getProviderConnections,
  onStartScrapingAPI,
} from 'PhaseTwo/services/connect';
import {
  setChromeIdentity,
  GetStorageClient,
  getFamilyIdStorage,
  GetStorageAdviser,
  GetStorageToken,
} from 'PhaseTwo/storage';
import {
  filterSatus,
  setSyncID,
  getInsurerNameAPIFormat,
  createNotify,
} from 'PhaseTwo/util';

import biri from 'biri';

const WrapperPapper = ({ isToggle = false, children }) => {
  return (
    <Grow in={isToggle}>
      <Paper elevation={0} className='page_render'>
        {children}
      </Paper>
    </Grow>
  );
};

let scrapingListPayLoad = [];
let globalConnectedInsurer = [];
let globalClientList = [];
let globalSuccededList = [];
let globalUnSuccededList = [];
let globalJwtToken = '';
let globalBrowserId = '';

const Popup = () => {
  const [hasIssueClientData, setHasIssueClientData] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [isSearching, setSearch] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [succededResultList, setSuccededResultList] = useState([]);
  const [unSuccededResultList, setUnSuccededResultList] = useState([]);
  const [resultList, setResultList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [connectedInsurer, setConnectedInsurer] = useState([]);
  const [browserId, setBrowserId] = useState('');
  const [familyID, setFamilyID] = useState('');
  const [adviserData, setAdviserData] = useState('');
  const [jwtToken, setJWTtoken] = useState('');
  const [count, dispatch] = useReducer(reducer, initialState);

  // START All FUNCTIONS HERE

  const toggleSettings = () => {
    setIsToggle((toggle) => !toggle);
  };

  const setToggleSearch = (id) => {
    setSearch(true);
    setResultList([]);
    setTimeout(() => {
      setSearch(false);
      const insurerSample = insurerList.find((insurer) => insurer.id === id);
      const setNewClient = clientList.map((client) => {
        client.insurerDetails = insurerSample;
        client.isSelected = false;
        return client;
      });
      setResultList(setNewClient);
    }, 500);
  };

  const onFilterSelectedClient = (id) => {
    if (id === 'ALL') {
      setResultList(
        clientList.map((client) => {
          client.isSelected = false;
          return client;
        })
      );
      setSuccededResultList(globalSuccededList);
      setViewAll(false);
      return;
    }
    console.log('onFilterSelectedClient', id);
    if (succededResultList.length) {
      setSuccededResultList(
        globalSuccededList.filter((client) => client.clientId === id)
      );

      setClientList(
        clientList.map((client) => {
          client.isSelected = client.personId === id;
          return client;
        })
      );
      setViewAll(true);
    }
  };

  const onFilteInsurances = (filterType) => {
    const newResults = filterSatus(globalSuccededList, filterType);
    if (filterType === 'All') {
      setSuccededResultList(globalSuccededList);
      return;
    }
    setSuccededResultList(newResults);
  };

  const onResyncResult = (insuranceDetails = {}) => {
    const {
      syncID,
      insurerId,
      birthday,
      clientId,
      firstName,
      lastName,
      userName,
    } = insuranceDetails;
    console.log('onResyncResult', insuranceDetails);
    setSuccededResultList(
      globalSuccededList.map((insurance) => {
        if (insurance.syncID === syncID) {
          insurance.isSync = true;
        }
        return insurance;
      })
    );

    const resyncPayLoad = {
      BrowserId: globalBrowserId,
      InsurerId: insurerId,
      InsurerName: getInsurerNameAPIFormat(insurerId),
      UserName: userName,
      AccessToken: globalJwtToken,
      Clients: [
        {
          ClientId: clientId,
          FirstName: firstName,
          LastName: lastName,
          Birthday: birthday,
        },
      ],
    };

    createNotify(`Checking: ${firstName} ${lastName}`);

    onStartScrapingAPI(resyncPayLoad, true).then((response) => {
      console.log('onStartScrapingAPI_onResyncResult', response);
      const { succeeded, data } = response;
      if (succeeded) {
        console.log('here>>>>>>.');
        setSuccededResultList(
          globalSuccededList.map((insurance) => {
            if (insurance.syncID === syncID) {
              insurance.isSync = false;

              return {
                ...insurance,
                ...data.clients[0],
              };
            } else {
              return insurance;
            }
          })
        );
        return;
      }
      setSuccededResultList(
        globalSuccededList.map((insurance) => {
          if (insurance.syncID === syncID) {
            insurance.isSync = false;
          }
          return insurance;
        })
      );
    });
  };

  const onResyncResultUnsuccessData = (insuranceDetails = {}) => {
    const {
      syncID,
      insurerId,
      birthday,
      clientId,
      firstName,
      lastName,
      userName,
    } = insuranceDetails;

    console.log('onResyncResultUnsuccessData', insuranceDetails);
    setUnSuccededResultList(
      globalUnSuccededList.map((insurance) => {
        if (insurance.syncID === syncID) {
          insurance.isSync = true;
        }
        return insurance;
      })
    );

    const resyncPayLoad = {
      BrowserId: globalBrowserId,
      InsurerId: insurerId,
      InsurerName: getInsurerNameAPIFormat(insurerId),
      UserName: userName,
      AccessToken: globalJwtToken,
      Clients: [
        {
          ClientId: clientId,
          FirstName: firstName,
          LastName: lastName,
          Birthday: birthday,
        },
      ],
    };

    createNotify(`Checking: ${firstName} ${lastName}`);

    onStartScrapingAPI(resyncPayLoad, true).then((response) => {
      console.log('onResyncResultUnsuccessData', response);
      const { succeeded, data } = response;
      if (succeeded) {
        console.log('here>>>>>>.');
        setSuccededResultList(
          globalSuccededList.map((insurance) => {
            if (insurance.syncID === syncID) {
              insurance.isSync = false;

              return {
                ...insurance,
                ...data.clients[0],
              };
            } else {
              return insurance;
            }
          })
        );
        return;
      }
      setUnSuccededResultList(
        globalUnSuccededList.map((insurance) => {
          if (insurance.syncID === syncID) {
            insurance.isSync = false;
          }
          return insurance;
        })
      );
    });
  };

  const onStartScraping = () => {
    createNotify('is already in progress');
    setSearch(true);

    Promise.all(globalConnectedInsurer)
      .then((responses = []) => {
        if (!!responses.length) {
          console.log('>>>>>>>>>>', responses);

          const uniqueArray = (a) =>
            a.filter((e, i) => {
              return (
                a.findIndex((x) => {
                  return (
                    x.clientId == e.clientId &&
                    x.insurerId == e.insurerId &&
                    x.userName == e.userName
                  );
                }) == i
              );
            });

          setSearch(false);
          const getSuccededData = responses
            .filter((scrapeData) => scrapeData.succeeded)
            .map((dataResult) => {
              return dataResult.data;
            })
            .map((arrange) => {
              return arrange.clients.map((client) => {
                client.insurerId = arrange.insurerId;
                client.userName = arrange.userName;
                client.syncID = setSyncID();
                client.isSync = false;
                return client;
              });
            })
            .flat();

          if (getSuccededData.length) {
            const newSetOFclients = uniqueArray(getSuccededData);
            const polish = newSetOFclients.filter((client) => client.policies);

            setSuccededResultList(polish);
            globalSuccededList = polish;
            console.log('getSuccededData', polish);
          }

          // unsucceededData
          const getUnSuccededData = responses
            .filter((scrapeData) => !scrapeData.succeeded)
            .map((dataResult) => {
              return dataResult.data;
            })
            .map((arrange) => {
              return arrange.clients.map((client) => {
                client.insurerId = arrange.insurerId;
                client.userName = arrange.userName;
                client.syncID = setSyncID();
                client.isSync = false;
                return client;
              });
            })
            .flat();

          // force to add if product is empty
          if (getSuccededData.length) {
            const newSetOFclients = uniqueArray(getSuccededData);
            getUnSuccededData.push(
              newSetOFclients.find((client) => !client.policies)
            );
          }

          if (getUnSuccededData.length) {
            console.log('clear_globalUnSuccededList', getUnSuccededData);
            const newSetOFclients = uniqueArray(
              getUnSuccededData.filter((x) => x !== undefined)
            );
            setUnSuccededResultList(newSetOFclients);
            globalUnSuccededList = newSetOFclients;
            console.log('globalUnSuccededList', newSetOFclients);
          }
        }
      })
      .catch((error) => {
        console.log('error', error);
        setSearch(false);
      });
  };

  const onUpdateInsuranceList = (dataInsured = []) => {
    console.log('onUpdateInsuranceList', dataInsured);
    dataInsured
      .filter((insured) => insured.isActive)
      .forEach((data) => {
        const properPayload = {
          BrowserId: globalBrowserId,
          InsurerId: data.insurerId,
          InsurerName: data.insurerName,
          UserName: data.userName,
          AccessToken: globalJwtToken,
          Clients: globalClientList,
        };
        scrapingListPayLoad = properPayload;
        globalConnectedInsurer.push(onStartScrapingAPI(scrapingListPayLoad));
        console.log('properPayload', properPayload);
      });

    console.log('globalConnectedInsurer', globalConnectedInsurer);
  };

  const onGetAllConnectedProviders = (browserId) => {
    setSearch(true);
    setTimeout(() => {
      getProviderConnections(browserId)
        .then((response) => {
          setSearch(false);
          const { succeeded, data } = response;
          setConnectedInsurer([]);
          onUpdateInsuranceList([]);
          setConnectedInsurer((data || {}).insurerAcount);
          onUpdateInsuranceList((data || {}).insurerAcount);
          if (data && succeeded) {
            onStartScraping();
          }
          console.log('getProviderConnections', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }, 100);
  };

  const onRegetConnectedProviders = () => {
    onGetAllConnectedProviders(globalBrowserId);
  };

  const getClientList = () => {
    GetStorageClient().then(({ clientList = [] }) => {
      setClientList((clientList || []).sort().reverse());
      globalClientList = clientList.map((client) => ({
        ClientId: client.personId,
        FirstName: client.firstName,
        LastName: client.lastName,
        Birthday: client.birthday,
      }));
      const check = globalClientList.some(
        (clients) =>
          !clients.ClientId ||
          !clients.FirstName ||
          !clients.LastName ||
          !clients.Birthday
      );
      setHasIssueClientData(check);
      console.log('setHasIssueClientData', check);
      console.log('clientList', globalClientList);
    });
  };

  const getAdviserData = () => {
    GetStorageAdviser().then(({ adviserDetails = {} }) => {
      setAdviserData(adviserDetails);
      console.log('adviserDetails', adviserDetails);
    });
  };

  const getJWTtokenData = () => {
    GetStorageToken().then(({ jwtToken = {} }) => {
      setJWTtoken(jwtToken);
      globalJwtToken = jwtToken;
      console.log('jwtToken', jwtToken);
    });
  };

  const getStoreFamilyId = () => {
    getFamilyIdStorage().then(({ familyIdStorage }) => {
      setFamilyID(familyIdStorage);
      console.log('familyIdStorage', familyIdStorage);
    });
  };

  const coreFunctions = (chromeIdNew) => {
    setChromeIdentity((chromeId) => {
      // setBrowserId(chromeId);
      getClientList();
      getAdviserData();
      getJWTtokenData();
      getStoreFamilyId();
      onGetAllConnectedProviders(chromeIdNew);
      console.log('chromeId', chromeIdNew);
      console.log('%c Set Chrome Identity step - 1 success', 'color: #bada55');
    });
  };

  useEffect(() => {
    biri().then((response) => {
      globalBrowserId = response;
      setBrowserId(response);
      console.log('uniqueId', response);
      coreFunctions(response);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        count,
        dispatch,
        setToggleSearch,
        onFilterSelectedClient,
        onStartScraping,
        onRegetConnectedProviders,
        onResyncResultUnsuccessData,
        onFilteInsurances,
        onResyncResult,
        unSuccededResultList,
        succededResultList,
        connectedInsurer,
        isSearching,
        hasIssueClientData,
        resultList,
        clientList,
        viewAll,
        browserId,
        familyID,
        adviserData,
        jwtToken,
      }}
    >
      <div className='popup'>
        <Header switchMenu={toggleSettings} />
        {isToggle && (
          <WrapperPapper isToggle={isToggle}>
            <Settings />
          </WrapperPapper>
        )}
        {!isToggle && (
          <WrapperPapper isToggle={!isToggle}>
            <Main />
          </WrapperPapper>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default Popup;
