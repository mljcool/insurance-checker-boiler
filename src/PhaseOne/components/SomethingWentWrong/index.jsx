import React from 'react';
import './style.css';

const SomethingWentWrong = ({ message = '' }) => {
   return (
      <div className='something_went_wrong_wrapper'>
         <img src={'img/sadEmoji.svg'} />
         <span>
            Oops! <br />
            {message}
         </span>
      </div>
   );
};

export default SomethingWentWrong;
