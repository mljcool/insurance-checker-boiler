import React, { useContext, Fragment, useEffect, useState } from 'react';
import './style.css';
import PaperWrapper from 'FinalPhaseOne/components/PaperWrapper';
import TabFilter from 'FinalPhaseOne/components/TabFilter';
import Loader from 'FinalPhaseOne/components/Loader';
import Settings from 'FinalPhaseOne/components/ConnectSettings';
import GotoSettings from 'FinalPhaseOne/components/GotoSettings';
import EmptyClients from 'FinalPhaseOne/components/Clients/EmptyClients';
import ClientList from 'FinalPhaseOne/components/Clients';
import { AppContext } from 'context/AppContext';

const SubMain = () => {
  const { isToggle, isLoading, isZeroConnections } = useContext(AppContext);
  const beforeRender = !isLoading && isZeroConnections;
  return (
    !isToggle && (
      <PaperWrapper isToggle={!isToggle}>
        <Loader isLoading={isLoading} />
        {beforeRender && <GotoSettings />}
        {!beforeRender && (
          <Fragment>
            <TabFilter />
            <ClientList />
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
  const { isToggle, clientList } = useContext(AppContext);
  const noClients = !clientList.length;
  return noClients ? (
    <EmptyClients />
  ) : (
    <Fragment>
      <SubMain />
      <SubSettings isToggle={isToggle} />
    </Fragment>
  );
};

export default MainPage;
