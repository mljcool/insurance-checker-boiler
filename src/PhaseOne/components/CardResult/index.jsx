import React, { useContext, useEffect, useState } from 'react';
import MediaLoading from 'PhaseOne/components/MediaLoader';
import { onStartScraping } from 'PhaseOne/services/connect';
import { AppContext } from 'context/AppContext';
import './style.css';

const CardResult = () => {
   const { dataScraping } = useContext(AppContext);
   const [isLoadingScrape, setIsLoadingScrape] = useState(false);
   const [resultFromScrape, setResultFromScrape] = useState([]);
   useEffect(() => {}, []);

   const onCheck = () => {
      if (dataScraping.length) {
         setIsLoadingScrape(true);
         onStartScraping(dataScraping).then(({ succeeded, data }) => {
            console.log('response', response);
            if (succeeded) {
               setResultFromScrape(data);
            }
            setIsLoadingScrape(false);
         });
      }
   };

   return (
      <div className='card_result_list'>
         {/* <button onClick={onCheck}>CHECKING</button> */}
         {dataScraping.length &&
            dataScraping.map((scrape, index) => (
               <MediaLoading userData={scrape} key={index} />
            ))}
      </div>
   );
};

export default CardResult;
