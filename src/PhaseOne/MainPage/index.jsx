import React, { useContext, Fragment } from 'react';
import './main.css';
import PaperWrapper from 'PhaseOne/components/PaperWrapper';
import TabFilter from 'PhaseOne/components/TabFilter';
import Settings from 'PhaseOne/settings';
import { AppContext } from 'context/AppContext';

const GotoSettings = () => {
   return (
      <div className='goto_settings'>
         <h1>Cool</h1>
      </div>
   );
};

const ReadyForScrapeWrapper = () => {
   return (
      <Fragment>
         <TabFilter switchMenu={true} />
      </Fragment>
   );
};

const MainPage = () => {
   const { hasConnections, isToggle } = useContext(AppContext);
   return (
      <Fragment>
         {!isToggle && (
            <PaperWrapper isToggle={!isToggle}>
               {hasConnections && <ReadyForScrapeWrapper />}
               {!hasConnections && <GotoSettings />}
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
