import React, { useContext, Fragment } from 'react';
import './style.css';
import PaperWrapper from 'FinalPhaseOne/components/PaperWrapper';
import TabFilter from 'FinalPhaseOne/components/TabFilter';
import Loader from 'FinalPhaseOne/components/Loader';
import Settings from 'FinalPhaseOne/components/ConnectSettings';
import { AppContext } from 'context/AppContext';

const MainPage = () => {
  const { isToggle, isLoading, title } = useContext(AppContext);
  return (
    <Fragment>
      {!isToggle && (
        <PaperWrapper isToggle={!isToggle}>
          <Loader isLoading={isLoading} />
          <TabFilter />
          {title}
        </PaperWrapper>
      )}
      {isToggle && (
        <PaperWrapper isToggle={isToggle}>{<Settings />}</PaperWrapper>
      )}
    </Fragment>
  );
};

export default MainPage;
