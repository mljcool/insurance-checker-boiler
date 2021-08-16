import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AppContext } from 'context/AppContext';
import { FILTER_TYPES } from 'PhaseTwo/constants';

const MenuFilter = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { onFilteInsurances } = React.useContext(AppContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        Open Filter
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {FILTER_TYPES.map((menu) => (
          <MenuItem
            onClick={() => {
              handleClose();
              onFilteInsurances(menu.filterName);
            }}
            key={menu.id}
          >
            {menu.filterName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default MenuFilter;
