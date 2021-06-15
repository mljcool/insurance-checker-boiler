import React, { useContext, Fragment } from 'react';
import './main.css';
import PaperWrapper from 'PhaseOne/components/PaperWrapper';
import TabFilter from 'PhaseOne/components/TabFilter';
import GotoSettings from 'PhaseOne/components/GotoSettings';
import CardResult from 'PhaseOne/components/CardResult';

import Settings from 'PhaseOne/settings';
import Loader from '../components/Loader';
import { AppContext } from 'context/AppContext';

const ReadyForScrapeWrapper = () => {
   return (
      <Fragment>
         <TabFilter switchMenu={true} />
         <CardResult />
      </Fragment>
   );
};

const SetUIDoneLoad = ({ doneLoading, toggleSettings }) => {
   return doneLoading ? (
      <ReadyForScrapeWrapper />
   ) : (
      <GotoSettings onToggleSettings={toggleSettings} />
   );
};

const MainPage = () => {
   const { hasConnections, isToggle, toggleSettings, isLoading } = useContext(
      AppContext,
   );
   return (
      <Fragment>
         {!isToggle && (
            <PaperWrapper isToggle={!isToggle}>
               <Loader isLoading={isLoading} />

               <SetUIDoneLoad
                  doneLoading={hasConnections && !isLoading}
                  toggleSettings={toggleSettings}
               />
            </PaperWrapper>
         )}
         {isToggle && (
            <PaperWrapper isToggle={isToggle}>
               <Settings />
            </PaperWrapper>
         )}
      </Fragment>
   );
};

export default MainPage;
