import React, { useState, useEffect } from 'react';
import './Popup.css';
import Header from 'FinalPhaseOne/components/Header';
import MainPage from 'FinalPhaseOne/components/Main';
import { insurerList } from 'constant/insurers';
import { AppContext } from '../context/AppContext';

const Popup = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [insurerListRef, setInsurerListRef] = useState(insurerList);

  // FUNCTION REFERENCE HERE
  const onToggleSettings = () => {
    setIsToggle((toggle) => !toggle);
  };
  const onRecallConnect = (params) => {};
  const onUpdateSetListOfConnection = () => {};

  // LIFE CYCLE HOOKS HERE

  useEffect(() => {}, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isToggle,
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
