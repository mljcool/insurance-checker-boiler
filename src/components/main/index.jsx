import React from 'react';
import './main.css';

import ClientSide from './ClientSide';
import ResultSide from './ResultSide';

const Main = () => {
   return (
      <div className='maing_page'>
         <ClientSide />
         <ResultSide />
      </div>
   );
};

export default Main;
