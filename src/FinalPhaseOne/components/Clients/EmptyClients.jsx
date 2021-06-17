import React from 'react';

const EmptyClients = () => {
  return (
    <div className='empty_clients'>
      <div className='goto_settings'>
        <div className='empty_wrapper'>
          <img className='empty_img_placeholder' src={'img/Group5.svg'} />
          <span className='empty_message_h2'>
            Sorry we're not able to detect any clients
          </span>
          <span className='empty_message'>
            try to reload the page or select a particular clients.
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmptyClients;
