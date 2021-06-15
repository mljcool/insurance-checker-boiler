import React, { useContext } from 'react';
import MediaLoading from 'PhaseOne/components/MediaLoader';
import { AppContext } from 'context/AppContext';
import './style.css';

const CardResult = () => {
   const { dataScraping } = useContext(AppContext);
   return (
      <div className='card_result_list'>
         {dataScraping.length &&
            dataScraping.map((scrape, index) => (
               <MediaLoading userData={scrape} key={index} />
            ))}
      </div>
   );
};

export default CardResult;
