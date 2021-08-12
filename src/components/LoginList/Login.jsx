import React, { useContext } from 'react';
import './LoginList.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { AppContext } from 'context/AppContext';

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

const Login = ({ selectedInsurer }) => {
  const classes = useStyles();
  const { connectedInsurer } = useContext(AppContext);
  return (
    <div className='form_list_wrapper'>
      {connectedInsurer
        .filter((insurer) => insurer.insurerId === selectedInsurer.id)
        .map((data, index) => (
          <Card className={classes.root} key={index}>
            <CardContent>
              <div className='connected_account'>
                <img src={`img/insurers/${data.insurerId}.png`} />
                <div className='connect_details'>
                  <span>{data.firstName}</span>
                  <span>Date connected: {data.updatedDate}</span>
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
