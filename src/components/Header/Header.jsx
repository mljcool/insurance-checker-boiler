import React from 'react';
import './Header.css';
import Settings from '@material-ui/icons/Settings';
const Header = ({ switchMenu }) => {
   return (
      <div className='header_menu'>
         <div className='logo_sections'>
            <img className='header_logo' src={'img/icons/icon48.png'} />
            <span>Insurance Checker</span>
         </div>
         <div className='header_settings' onClick={switchMenu}>
            <Settings color='disabled' />
         </div>
      </div>
   );
};

export default Header;
