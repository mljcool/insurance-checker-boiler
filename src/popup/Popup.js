import React, { useState, useEffect } from 'react';
import './Popup.css';
import Header from 'FinalPhaseOne/components/Header';
import MainPage from 'FinalPhaseOne/components/Main';
import { insurerList } from 'constant/insurers';
import { AppContext } from '../context/AppContext';
import { setChromeIdentity } from 'FinalPhaseOne/storage';
import { getProviderConnections } from 'FinalPhaseOne/services/connect';

const Popup = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isZeroConnections, setZeroConnections] = useState(true);

  const [insurerListRef, setInsurerListRef] = useState(insurerList);
  const [browserId, setBrowserId] = useState('');
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
      console.log('getProviderConnections', data);
      if (succeeded) {
        setInsurerListRef(
          insurerList.map((insurer) => {
            insurer.isConnected = data.some(
              (insurance) => insurance.insurerId === insurer.id
            );
            return insurer;
          })
        );

        const zeroConnections =
          insurerListRef.filter((insurance) => insurance.isConnected).length ===
          0;

        setZeroConnections(zeroConnections);

        if (data.length === 1) {
          setIsToggle(false);
        }
      }
      setIsLoading(false);
    });
  };

  /** LIFE CYCLE  **/

  useEffect(() => {
    setChromeIdentity((chromeId) => {
      setBrowserId(chromeId);
      getAllConnectedProviders(chromeId);
      console.log('chromeId HERE', chromeId);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        browserId,
        isLoading,
        isToggle,
        isZeroConnections,
        insurerListRef,
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
