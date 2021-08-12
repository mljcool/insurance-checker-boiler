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
import { getProviderConnections } from 'PhaseTwo/services/connect';
import {
  setChromeIdentity,
  GetStorageClient,
  getFamilyIdStorage,
  GetStorageAdviser,
  GetStorageToken,
} from 'PhaseTwo/storage';

const WrapperPapper = ({ isToggle = false, children }) => {
  return (
    <Grow in={isToggle}>
      <Paper elevation={0} className='page_render'>
        {children}
      </Paper>
    </Grow>
  );
};

const Popup = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [isSearching, setSearch] = useState(false);
  const [viewAll, setViewAll] = useState(false);
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
    }, 2100);
  };

  const onFilterSelectedClient = (id) => {
    if (id === 'ALL') {
      setResultList(
        clientList.map((client) => {
          client.isSelected = false;
          return client;
        })
      );
      setViewAll(false);
      return;
    }
    if (resultList.length) {
      setResultList(
        clientList.filter((client) => {
          if (client.id === id) {
            client.isSelected = !client.isSelected;
            return client;
          } else {
            client.isSelected = false;
          }
        })
      );

      setViewAll(true);
    }
  };

  const onGetAllConnectedProviders = (browserId) => {
    getProviderConnections(browserId).then(({ succeeded, data }) => {
      console.log('getProviderConnections', data);
      setConnectedInsurer(data);
    });
  };

  const getClientList = () => {
    GetStorageClient().then(({ clientList = [] }) => {
      setClientList((clientList || []).sort().reverse());
      console.log('clientList', clientList);
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
      console.log('jwtToken', jwtToken);
    });
  };

  const getStoreFamilyId = () => {
    getFamilyIdStorage().then(({ familyIdStorage }) => {
      setFamilyID(familyIdStorage);
      console.log('familyIdStorage', familyIdStorage);
    });
  };

  const coreFunctions = () => {
    setChromeIdentity((chromeId) => {
      setBrowserId(chromeId);
      getClientList();
      getAdviserData();
      getJWTtokenData();
      getStoreFamilyId();
      onGetAllConnectedProviders(chromeId);
      console.log('%c Set Chrome Identity step - 1 success', 'color: #bada55');
    });
  };

  useEffect(() => {
    coreFunctions();
  }, []);

  return (
    <AppContext.Provider
      value={{
        count,
        dispatch,
        setToggleSearch,
        onFilterSelectedClient,
        connectedInsurer,
        isSearching,
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
