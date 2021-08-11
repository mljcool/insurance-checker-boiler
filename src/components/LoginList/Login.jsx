import React from 'react';
import './LoginList.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const sampleList = [
  {
    id: 1,
    name: 'Jhon Doe',
  },
  {
    id: 2,
    name: 'Ann Doe',
  },
];

const MenuConnect = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='menu_connect'>
      <IconButton
        aria-label='delete'
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Update</MenuItem>
      </Menu>
    </div>
  );
};

const Login = () => {
  const classes = useStyles();
  return (
    <div className='form_list_wrapper'>
      {sampleList.map((data) => (
        <Card className={classes.root} key={data.id}>
          <CardContent>
            <div className='connected_account'>
              <img src={`img/insurers/${data.id}.png`} />
              <div className='connect_details'>
                <span>{data.name}</span>
                <span>Date connected: August 05, 2021 11:55 PM</span>
              </div>
              <MenuConnect />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Login;
