import React, { useContext, Fragment } from 'react';
import './main.css';
import PaperWrapper from 'PhaseOne/components/PaperWrapper';
import TabFilter from 'PhaseOne/components/TabFilter';
import GotoSettings from 'PhaseOne/components/GotoSettings';
import Settings from 'PhaseOne/settings';
import { AppContext } from 'context/AppContext';

const ReadyForScrapeWrapper = () => {
   return (
      <Fragment>
         <TabFilter switchMenu={true} />
      </Fragment>
   );
};

const MainPage = () => {
   const { hasConnections, isToggle, toggleSettings, browserId } = useContext(
      AppContext,
   );
   return (
      <Fragment>
         {!isToggle && (
            <PaperWrapper isToggle={!isToggle}>
               {hasConnections && <ReadyForScrapeWrapper />}
               {!hasConnections && (
                  <GotoSettings onToggleSettings={toggleSettings} />
               )}
            </PaperWrapper>
         )}
         {isToggle && (
            <PaperWrapper isToggle={isToggle}>
               <Settings browserId={browserId} />
            </PaperWrapper>
         )}
      </Fragment>
   );
};

export default MainPage;
