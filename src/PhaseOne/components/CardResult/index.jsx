import React from 'react';
import MediaLoading from 'PhaseOne/components/MediaLoader';
import './style.css';

const CardResult = () => {
   return (
      <div className='card_result_list'>
         <MediaLoading />
         <MediaLoading />
         <MediaLoading />
         <MediaLoading />
         <MediaLoading />
      </div>
   );
};

export default CardResult;
