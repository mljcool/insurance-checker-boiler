import React from 'react';
import ClientCardWrapper from './ClientCardWrapper';
import EmptyFilter from './EmptyFilter';
import { AppContext } from 'context/AppContext';
import './style.css';

const ClientList = () => {
  const messagesEndRef = React.useRef(null);
  const messagesStartRef = React.useRef(null);
  const [isShowMore, setIsShowMore] = React.useState(false);
  const { dataForScraping, filterName } = React.useContext(AppContext);
  const hasNoResults = dataForScraping.filter(
    (results) => !results.isLoadingScrape && !results.policies.length
  );
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        });
      }
    }, 300);
  };

  const scrollToTop = () => {
    setTimeout(() => {
      if (messagesStartRef.current) {
        messagesStartRef.current.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
    }, 200);
  };

  return (
    <div className='card_result_list' ref={messagesStartRef}>
      {!!dataForScraping.length &&
        dataForScraping
          .filter((results) => results.isLoadingScrape)
          .map((scrape, index) => (
            <React.Fragment key={index}>
              <ClientCardWrapper
                dataScrape={scrape}
                idKey={index}
                resyncable={false}
              />
            </React.Fragment>
          ))}

      {!!dataForScraping.length &&
        dataForScraping
          .filter(
            (results) => !results.isLoadingScrape && !!results.policies.length
          )
          .map((scrape, index) => (
            <React.Fragment key={index}>
              <ClientCardWrapper
                dataScrape={scrape}
                idKey={index}
                resyncable={false}
              />
            </React.Fragment>
          ))}

      {!!dataForScraping.length && !!hasNoResults.length && (
        <div className='show_more'>
          <span>
            {hasNoResults.length} other insurers did not return any results
          </span>
          <span
            className='show_btn'
            onClick={() => {
              setIsShowMore((istoggled) => !istoggled);
              if (!isShowMore) {
                scrollToBottom();
              }
            }}
          >
            {!isShowMore ? 'show more' : 'Hide'}
          </span>
        </div>
      )}

      {isShowMore &&
        hasNoResults.map((scrape, index) => (
          <React.Fragment key={index}>
            <ClientCardWrapper
              dataScrape={scrape}
              idKey={index}
              key={index}
              resyncable={true}
            />
          </React.Fragment>
        ))}
      <div ref={messagesEndRef} />

      {!dataForScraping.length && <EmptyFilter filterName={filterName} />}
    </div>
  );
};

export default ClientList;
