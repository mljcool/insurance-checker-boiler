import React, { Fragment } from 'react';
import './main.css';
import PaperWrapper from 'PhaseOne/components/PaperWrapper';
import TabFilter from 'PhaseOne/components/TabFilter';
import Settings from 'PhaseOne/settings';

const MainPage = ({ isToggle }) => {
   return (
      <Fragment>
         {!isToggle && (
            <PaperWrapper isToggle={!isToggle}>
               <TabFilter switchMenu={true} />
               <h1>cool</h1>
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
