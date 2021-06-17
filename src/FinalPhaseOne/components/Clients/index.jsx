import React from 'react';
import ClientCardWrapper from './ClientCardWrapper';
import EmptyFilter from './EmptyFilter';
import { AppContext } from 'context/AppContext';
import './style.css';

const ClientList = () => {
  const { dataForScraping, filterName } = React.useContext(AppContext);
  return (
    <div className='card_result_list'>
      {!!dataForScraping.length &&
        dataForScraping.map((scrape, index) => (
          <ClientCardWrapper dataScrape={scrape} key={index} />
        ))}

      {!dataForScraping.length && <EmptyFilter filterName={filterName} />}
    </div>
  );
};

export default ClientList;
