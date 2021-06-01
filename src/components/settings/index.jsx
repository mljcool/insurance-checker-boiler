import React, { Fragment, useState } from 'react';
import './settings.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { insurerList } from 'constant/insurers';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(1),
         width: '25ch',
      },
   },
}));

const InsurerList = () => {
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
                     <ListItem button>
                        <div className='insurer_icon' key={insurer.id}>
                           <img src={`img/insurers/${insurer.id}.png`} />
                           <span>{insurer.providerName}</span>
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
   const [selectedInsurer, setSelectedInsurer] = useState({});
   const classes = useStyles();

   return (
      <div className='settings_page'>
         <InsurerList />
         <div className='insurer_login_form'>
            <div className='form_fields'>
               <Paper elevation={1}>
                  <div className='login_details'>
                     <img src={`img/insurers/${'1'}.png`} />
                     <span>Login to your {'AIA'}</span>
                  </div>
                  <form className={classes.root} noValidate autoComplete='off'>
                     <TextField
                        id='outlined-basic'
                        label='Username'
                        variant='outlined'
                     />
                     <TextField
                        id='outlined-basic'
                        label='Password'
                        variant='outlined'
                     />
                     <Button
                        variant='contained'
                        color='primary'
                        disableElevation>
                        Login
                     </Button>
                  </form>
               </Paper>
            </div>
         </div>
      </div>
   );
};

export default Settings;
