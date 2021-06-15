import React from 'react';
import './style.css';

const SomethingWentWrong = ({ message = '' }) => {
   return (
      <div className='something_went_wrong_wrapper'>
         <div className='oops_img'>
            <img src={'img/sadEmoji.svg'} />
         </div>
         <div className='message'>
            <p>Oops!</p>
            <span> {message}</span>
         </div>
      </div>
   );
};

export default SomethingWentWrong;
