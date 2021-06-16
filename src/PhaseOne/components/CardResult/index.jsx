import React, { useContext, useEffect } from 'react';
import MediaLoading from 'PhaseOne/components/MediaLoader';
import EmptyFilter from 'PhaseOne/components/MediaLoader/EmptyFilter';
import { AppContext } from 'context/AppContext';
import './style.css';

const CardResult = () => {
  const { forDisplay, onStartScrapingFromInsurer, filterName } = useContext(
    AppContext
  );

  return (
    <div className='card_result_list'>
      {/* <button onClick={onStartScrapingFromInsurer}>CHECKING</button> */}
      {!!forDisplay.length &&
        forDisplay.map((scrape, index) => (
          <MediaLoading dataScrape={scrape} key={index} />
        ))}

      {!forDisplay.length && <EmptyFilter filterName={filterName} />}
    </div>
  );
};

export default CardResult;
