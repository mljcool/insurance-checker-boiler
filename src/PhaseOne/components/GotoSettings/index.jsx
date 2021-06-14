import React from 'react';
import SyncIcon from '@material-ui/icons/Sync';
import Button from '@material-ui/core/Button';

const GotoSettings = ({ onToggleSettings }) => {
   return (
      <div className='goto_settings'>
         <div className='empty_wrapper'>
            <img className='empty_img_placeholder' src={'img/Group5.svg'} />
            <span className='empty_message_h2'>
               0 insurers have been connected
            </span>
            <span className='empty_message'>
               To sync insurers, please connect at least 1 insurer
            </span>
            <Button
               className='button_connect'
               variant='contained'
               color='default'
               startIcon={<SyncIcon />}
               onClick={onToggleSettings}>
               Connect
            </Button>
         </div>
      </div>
   );
};

export default GotoSettings;
