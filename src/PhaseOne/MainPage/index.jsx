import React, { useContext, Fragment } from 'react';
import './main.css';
import PaperWrapper from 'PhaseOne/components/PaperWrapper';
import TabFilter from 'PhaseOne/components/TabFilter';
import GotoSettings from 'PhaseOne/components/GotoSettings';
import MediaLoading from 'PhaseOne/components/MediaLoader';
import Settings from 'PhaseOne/settings';
import { AppContext } from 'context/AppContext';

const ReadyForScrapeWrapper = () => {
   return (
      <Fragment>
         <TabFilter switchMenu={true} />
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
               {isLoading && <MediaLoading loading={true} />}

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
