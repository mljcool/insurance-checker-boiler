import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  postConnectToInsurers,
  onDisconnectInsurer,
} from 'PhaseTwo/services/connect';
import { AppContext } from 'context/AppContext';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const LoginForm = ({ selectedInsurer, onBackToList }) => {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [isSomethingWrong, setIsSomethingWrong] = useState(false);
  const [apiMessage, setAPImessage] = useState('');

  const { browserId, adviserData, jwtToken } = useContext(AppContext);

  const onConnectAccount = () => {
    if (!userName || !password) {
      setErrorForm(true);
      return;
    }
    setIsConnecting(true);
    const { firstName, lastName } = adviserData;
    postConnectToInsurers({
      firstName,
      lastName,
      userName,
      browserId,
      ...selectedInsurer,
      password,
      jwtToken,
    }).then(({ succeeded, messages, data }) => {
      console.log('postConnectToInsurers', succeeded);
      setIsConnecting(false);
      if (succeeded && data) {
        setIsSuccess(true);
        setUserName('');
        setPassword('');
        setTimeout(() => {
          onBackToList();
        }, 1000);
      } else {
        setIsSomethingWrong(true);
        setAPImessage(messages);
        setMessage(
          `Something went wrong with ${
            selectedInsurer.providerName
          } ${messages}.`
        );
      }
    });
  };

  return (
    <div className='form_fields'>
      <Paper elevation={1}>
        {isSomethingWrong && <Alert severity='error'>{apiMessage}</Alert>}
        {isSuccess && (
          <Alert severity='success'>Account succesfully connected</Alert>
        )}
        <div className='login_details'>
          <img src={`img/insurers/${selectedInsurer.id}.png`} />
          <span>Login to your {selectedInsurer.providerName} account</span>
        </div>
        <form className={classes.root} noValidate autoComplete='off'>
          <TextField
            id='outlined-basic'
            label='Username'
            variant='outlined'
            type='text'
            fullWidth
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
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
            {isConnecting ? 'Please wait...' : 'Connect'}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginForm;
