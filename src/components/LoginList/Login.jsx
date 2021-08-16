import React, { useContext } from 'react';
import moment from 'moment';
import './LoginList.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { AppContext } from 'context/AppContext';
import { onDeleteConnections } from 'PhaseTwo/services/connect';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const MenuConnect = ({ providerData, browserId, onRefreshData }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (isDelete) => {
    setAnchorEl(null);
    if (isDelete) {
      const { email, insurerName, insurerId } = providerData;
      const newData = {
        browserId: browserId,
        insurerAcount: {
          insurerId: insurerId,
          insurerName: insurerName,
          email: email,
        },
      };
      onDeleteConnections(newData).then(({ succeeded }) => {
        console.log('onDeleteConnections', response);
        if (succeeded) {
          onRefreshData();
        }
      });
      return;
    }
    console.log('event');
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
        <MenuItem
          onClick={() => {
            handleClose(true);
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose(false);
          }}
        >
          Active
        </MenuItem>
      </Menu>
    </div>
  );
};

const EmptyList = () => (
  <div className='empty_wrapper'>
    <img className='empty_img_placeholder' src={'img/Group5.svg'} />
  </div>
);

const Login = ({ selectedInsurer = [] }) => {
  const classes = useStyles();
  const { connectedInsurer, browserId, onRegetConnectedProviders } = useContext(
    AppContext
  );
  const onRefreshData = () => {
    onRegetConnectedProviders();
  };
  return (
    <div className='form_list_wrapper'>
      {!!connectedInsurer &&
        connectedInsurer
          .filter((insurer) => insurer.insurerId === selectedInsurer.id)
          .map((data, index) => (
            <Card className={classes.root} key={index}>
              <CardContent>
                <div className='connected_account'>
                  <img src={`img/insurers/${data.insurerId}.png`} />
                  <div className='connect_details'>
                    <span>
                      {data.firstName} {data.lastName} - ( {data.email})
                    </span>
                    <span>
                      Date connected:{' '}
                      {moment(new Date(data.updatedDate)).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </span>
                  </div>
                  <MenuConnect
                    providerData={data}
                    browserId={browserId}
                    onRefreshData={onRefreshData}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
      {!!connectedInsurer &&
        !connectedInsurer.filter(
          (insurer) => insurer.insurerId === selectedInsurer.id
        ).length && <EmptyList />}
      {!connectedInsurer && <EmptyList />}
    </div>
  );
};

export default Login;
