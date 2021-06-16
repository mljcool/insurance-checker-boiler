import React from 'react';

const BlankResult = ({ insurerId, insurerName, message }) => {
   return (
      <div className='blank_results'>
         <div className='blank_logo_label'>
            <img src={`img/insurers/${insurerId}.png`} />
            <span className='blank_label'>
               No results found from {insurerName.toUpperCase()}
            </span>
         </div>
         <div className='actual_message'>
            <span>{message}</span>
         </div>
      </div>
   );
};

export default BlankResult;
