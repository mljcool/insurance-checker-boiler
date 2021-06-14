import React, { Fragment, useState } from 'react';
import './settings.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { insurerList } from 'constant/insurers';
import Button from '@material-ui/core/Button';
import { postConnectToInsurers } from 'PhaseOne/services/connect';
import Loader from '../components/Loader';

const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(1),
         width: '80%',
      },
   },
}));

const InsurerList = ({ onSelectInurance }) => {
   const [selectedInsurer, setSelectedInsurer] = useState(1);
   return (
      <div className='insurer_side_setting'>
         <div className='insurer_list_header header_section'>
            <AssignmentTurnedInIcon
               style={{ fontSize: '15px', color: green[500] }}
            />
            <span>Connect your account</span>
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
                        }}>
                        <div className='insurer_icon' key={insurer.id}>
                           <img src={`img/insurers/${insurer.id}.png`} />
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

const Settings = ({ browserId = '' }) => {
   const [selectedInsurer, setSelectedInsurer] = useState(insurerList[0]);
   const [userName, setUserName] = useState('');
   const [password, setPassword] = useState('');
   const [isConnecting, setIsConnecting] = useState(false);
   const classes = useStyles();

   const onSelectInurance = (insurance) => {
      setSelectedInsurer(insurance);
   };

   const onConnectAccount = () => {
      setIsConnecting(true);
      postConnectToInsurers({
         userName,
         browserId,
         ...selectedInsurer,
         password,
      }).then(({ succeeded }) => {
         if (succeeded) {
            setIsConnecting(false);
         }
         console.log('postConnectToInsurers', response);
      });
   };

   return (
      <div className='settings_page'>
         <InsurerList onSelectInurance={onSelectInurance} />
         <div className='insurer_login_form'>
            <Loader isLoading={isConnecting} />
            <div className='login_details'>
               <img src={`img/insurers/${selectedInsurer.id}.png`} />
               <span>Login to your {selectedInsurer.providerName} account</span>
            </div>

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
                  disableElevation>
                  {isConnecting ? 'Please wait...' : 'Login'}
               </Button>
            </form>
         </div>
      </div>
   );
};

export default Settings;
