import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const LoginForm = ({ selectedInsurer }) => {
  const classes = useStyles();
  return (
    <div className='form_fields'>
      <Paper elevation={1}>
        <div className='login_details'>
          <img src={`img/insurers/${selectedInsurer.id}.png`} />
          <span>Login to your {selectedInsurer.providerName} account</span>
        </div>
        <form className={classes.root} noValidate autoComplete='off'>
          <TextField id='outlined-basic' label='Username' variant='outlined' />
          <TextField id='outlined-basic' label='Password' variant='outlined' />
          <Button variant='contained' color='primary' disableElevation>
            Connect
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginForm;
