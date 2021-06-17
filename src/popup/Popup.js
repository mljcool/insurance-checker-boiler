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

  const toggleSettings = () => {
    setIsToggle((toggle) => !toggle);
  };

  return (
    <AppContext.Provider
      value={{ toggleSettings, isLoading, isToggle, insurerListRef }}
    >
      <div className='popup'>
        <Header onSwitchMenu={toggleSettings} isToggle={isToggle} />
        <MainPage />
      </div>
    </AppContext.Provider>
  );
};
export default Popup;
