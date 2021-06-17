import React, { Fragment, useState, useContext } from 'react';
import './settings.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import {
  postConnectToInsurers,
  onDisconnectInsurer,
} from 'FinalPhaseOne/services/connect';
import SomethingWentWrong from '../SomethingWentWrong';
import Loader from '../Loader';
import { AppContext } from 'context/AppContext';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
}));

const InsurerList = ({ onSelectInurance, insurerList = [] }) => {
  const [selectedInsurer, setSelectedInsurer] = useState(1);
  return (
    <div className='insurer_side_setting'>
      <div className='insurer_list_header header_section'>
        <AssignmentTurnedInIcon
          style={{ fontSize: '15px', color: green[500] }}
        />
        <span className='connection_label'>Connect your account</span>
      </div>
      <div className='insurer_list list_wrapper'>
        <List component='nav' aria-label='main mailbox folders'>
          {insurerList.map((insurer) => (
            <Fragment key={insurer.id}>
              <ListItem
                className={
                  selectedInsurer === insurer.id ? 'selected_list' : ''
                }
                button
                onClick={() => {
                  onSelectInurance(insurer);
                  setSelectedInsurer(insurer.id);
                }}
              >
                <div className='insurer_icon' key={insurer.id}>
                  <img src={`img/insurers/${insurer.id}.png`} />
                  {insurer.isConnected && (
                    <CheckCircleIcon
                      style={{
                        fontSize: '20px',
                        color: green[500],
                        marginLeft: '1rem',
                      }}
                    />
                  )}
                </div>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </div>
      <div className='insurer_list_footer'>
        <span />
      </div>
    </div>
  );
};

const Settings = () => {
  const { browserId, insurerListRef, onUpdateSetListOfConnection } = useContext(
    AppContext
  );

  const [selectedInsurer, setSelectedInsurer] = useState(insurerListRef[0]);
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [isSomethingWrong, setIsSomethingWrong] = useState(false);
  const classes = useStyles();

  const onSelectInurance = (insurance) => {
    setErrorForm(false);
    setSelectedInsurer(insurance);
    setIsSomethingWrong(false);
  };

  const onConnectAccount = () => {
    if (!userName || !password) {
      setErrorForm(true);
      return;
    }
    setIsConnecting(true);

    postConnectToInsurers({
      userName,
      browserId,
      ...selectedInsurer,
      password,
    }).then(({ succeeded, messages, data }) => {
      console.log('postConnectToInsurers', succeeded);
      setIsConnecting(false);
      if (succeeded && data) {
        setUserName('');
        setPassword('');
        onUpdateSetListOfConnection(true);
      } else {
        setIsSomethingWrong(true);
        setMessage(
          `Something went wrong with ${
            selectedInsurer.providerName
          } ${messages}.`
        );
      }
    });
  };

  const onDisconnect = () => {
    setIsConnecting(true);
    onDisconnectInsurer({
      browserId,
      ...selectedInsurer,
    }).then(({ succeeded, messages }) => {
      setIsConnecting(false);
      if (succeeded) {
        onUpdateSetListOfConnection();
      } else {
        setIsSomethingWrong(true);
        setMessage(
          `Something went wrong with ${
            selectedInsurer.providerName
          } ${messages}.`
        );
      }
    });
  };

  return (
    <div className='settings_page'>
      <InsurerList
        onSelectInurance={onSelectInurance}
        insurerList={insurerListRef}
      />
      <div className='insurer_login_form'>
        {errorForm && <Alert severity='error'>Fields are required!</Alert>}
        <Loader isLoading={isConnecting} />
        <div className='login_details'>
          <img src={`img/insurers/${selectedInsurer.id}.png`} />
          {!selectedInsurer.isConnected && (
            <span>Login to your {selectedInsurer.providerName} account</span>
          )}
        </div>
        {selectedInsurer.isConnected && (
          <div className='is_connected_wrapper'>
            <span className='is_connected_message'>
              Your {selectedInsurer.providerName} account is connected
            </span>
            <Button
              variant='contained'
              color='default'
              startIcon={<SyncDisabledIcon />}
              onClick={onDisconnect}
            >
              Disconnect
            </Button>
          </div>
        )}

        {!isSomethingWrong && !selectedInsurer.isConnected && (
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              id='outlined-basic'
              label='Username'
              variant='outlined'
              name='username'
              fullWidth
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <TextField
              id='outlined-basic'
              label='Password'
              variant='outlined'
              name='password'
              type='password'
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={onConnectAccount}
              disabled={isConnecting}
              disableElevation
            >
              {isConnecting ? 'Please wait...' : 'Login'}
            </Button>
          </form>
        )}
        {isSomethingWrong && <SomethingWentWrong message={message} />}
      </div>
    </div>
  );
};

export default Settings;
