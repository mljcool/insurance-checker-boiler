import React, { useContext, Fragment, useEffect, useState } from 'react';
import './style.css';
import PaperWrapper from 'FinalPhaseOne/components/PaperWrapper';
import TabFilter from 'FinalPhaseOne/components/TabFilter';
import Loader from 'FinalPhaseOne/components/Loader';
import Settings from 'FinalPhaseOne/components/ConnectSettings';
import GotoSettings from 'FinalPhaseOne/components/GotoSettings';
import { AppContext } from 'context/AppContext';

const SubMain = () => {
  const { isToggle, isLoading, isZeroConnections } = useContext(AppContext);

  return (
    !isToggle && (
      <PaperWrapper isToggle={!isToggle}>
        {isZeroConnections ? (
          <GotoSettings />
        ) : (
          <Fragment>
            <Loader isLoading={isLoading} />
            <TabFilter />
          </Fragment>
        )}
      </PaperWrapper>
    )
  );
};

const SubSettings = ({ isToggle }) => {
  return (
    isToggle && (
      <PaperWrapper isToggle={isToggle}>
        <Settings />
      </PaperWrapper>
    )
  );
};

const MainPage = () => {
  const { isToggle } = useContext(AppContext);
  return (
    <Fragment>
      <SubMain />
      <SubSettings isToggle={isToggle} />
    </Fragment>
  );
};

export default MainPage;
