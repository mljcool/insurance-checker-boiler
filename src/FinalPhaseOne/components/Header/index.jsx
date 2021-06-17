import React from 'react';
import './Header.css';
import Settings from '@material-ui/icons/Settings';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';

const Header = ({ onSwitchMenu, isToggle = false }) => {
  return (
    <div className='header_menu'>
      <div className='logo_sections'>
        <img className='header_logo' src={'img/mycrm-logo.png'} />
        <span>Insurance Checker</span>
      </div>
      <div className='header_settings' onClick={onSwitchMenu}>
        {!isToggle && <Settings color='disabled' />}
        {isToggle && <AssignmentReturnIcon color='disabled' />}
      </div>
    </div>
  );
};

export default Header;
