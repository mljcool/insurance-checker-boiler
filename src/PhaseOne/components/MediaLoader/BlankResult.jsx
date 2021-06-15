import React from 'react';

const BlankResult = ({ InsurerId, InsurerName }) => {
   return (
      <div className='blank_results'>
         <div className='blank_logo_label'>
            <img src={`img/insurers/${InsurerId}.png`} />
            <span className='blank_label'>
               No results found from {InsurerName.toUpperCase()}
            </span>
         </div>
      </div>
   );
};

export default BlankResult;
