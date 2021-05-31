import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InboxIcon from '@material-ui/icons/Inbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const clietnList = [
   {
      id: 1,
      fname: 'Sara',
      lastname: 'Wagon',
   },
   {
      id: 2,
      fname: 'John',
      lastname: 'Doe',
   },
];

const ClientSide = () => {
   return (
      <div className='client_side'>
         <List component='nav' aria-label='main mailbox folders'>
            <ListItem button>
               <ListItemIcon>
                  <InboxIcon />
               </ListItemIcon>
               <ListItemText primary='Inbox' />
            </ListItem>
         </List>
      </div>
   );
};

export default ClientSide;
