import React, { Fragment } from 'react';
import '../styles/client_side.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import GroupIcon from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple, green } from '@material-ui/core/colors';

const sampleClient = [
   {
      id: 1,
      fname: 'John',
      lname: 'Doe',
      prefix: 'JD',
   },
   {
      id: 2,
      fname: 'Sarah',
      lname: 'Doe',
      prefix: 'SD',
   },
   {
      id: 3,
      fname: 'Forcewind',
      lname: 'Cruiser',
      prefix: 'FC',
   },
];
const useStyles = makeStyles((theme) => ({
   purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: '#8d76a0',
      fontSize: '15px',
   },
   crmTheme: {
      color: '#8d76a0',
   },
}));

const ClientHeader = () => {
   return (
      <div className='client_header header_section'>
         <GroupIcon style={{ fontSize: '15px', color: green[500] }} />
         <span>Selected Clients</span>
      </div>
   );
};

const ClientFooter = () => {
   const classes = useStyles();
   return (
      <div className='client_footer'>
         <span>Re-sync all client data</span>
         <IconButton color='primary' aria-label='add to shopping cart'>
            <RefreshIcon className={classes.crmTheme} />
         </IconButton>
      </div>
   );
};

const ClientSide = () => {
   const classes = useStyles();
   return (
      <div className='client_side'>
         <ClientHeader />
         <div className='client_list list_wrapper'>
            <List component='nav' aria-label='main mailbox folders'>
               {sampleClient.map((client) => (
                  <Fragment key={client.id}>
                     <ListItem button>
                        <div className='client_details'>
                           <div className='prefix'>
                              <Avatar className={classes.purple}>
                                 {client.prefix}
                              </Avatar>
                              <span>
                                 {client.fname} {client.lname}
                              </span>
                           </div>
                        </div>
                     </ListItem>
                     <Divider />
                  </Fragment>
               ))}
            </List>
         </div>
         <ClientFooter />
      </div>
   );
};

export default ClientSide;
