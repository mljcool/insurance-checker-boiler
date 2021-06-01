import React from 'react';
import '../styles/main.css';

import ClientSide from './ClientSide';
import ResultSide from './ResultSide';
import InsurersSide from './InsurersSide';

const Main = () => {
   return (
      <div className='maing_page'>
         <InsurersSide />
         <ClientSide />
         <ResultSide />
      </div>
   );
};

export default Main;
