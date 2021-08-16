import React, { Fragment, useContext } from 'react';
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
import Loader from '../Loader';
import { AppContext } from 'context/AppContext';

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
      <span>Insured Clients</span>
    </div>
  );
};

const ClientFooter = () => {
  const classes = useStyles();
  return (
    <div className='client_footer'>
      <span>Re-sync all client data</span>
      <IconButton color='primary' aria-label='add to shopping cart'>
        <RefreshIcon className={classes.crmTheme} size={'small'} />
      </IconButton>
    </div>
  );
};

const ClientSide = () => {
  const classes = useStyles();
  const { clientList, onFilterSelectedClient, viewAll } = useContext(
    AppContext
  );
  const [clientID, setClientID] = React.useState(0);

  return (
    <div className='client_side'>
      <ClientHeader />
      <Loader isLoading={false} />
      <div className='client_list list_wrapper'>
        <List component='nav' aria-label='main mailbox folders'>
          {clientList.map((client, index) => (
            <Fragment key={index}>
              <ListItem
                button
                className={client.isSelected ? 'selected_list' : ''}
                onClick={() => {
                  console.log('isSelected', client);
                  onFilterSelectedClient(client.personId);
                  setClientID(client.personId);
                  // setViewAll(true);
                }}
              >
                <div className='client_details'>
                  <div className='prefix'>
                    <Avatar className={classes.purple}>
                      {client.initialName}
                    </Avatar>
                    <span>
                      {client.fname} {client.fullName}
                    </span>
                  </div>
                </div>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
          {viewAll && (
            <Fragment key={'12-2222asaz'}>
              <ListItem
                button
                className={clientID === 'ALL' ? 'selected_list' : ''}
                onClick={() => {
                  onFilterSelectedClient('ALL');
                  setClientID('ALL');
                }}
              >
                <div className='client_details view_all'>
                  <span>View All</span>
                </div>
              </ListItem>
              <Divider />
            </Fragment>
          )}
        </List>
      </div>
      <ClientFooter />
    </div>
  );
};

export default ClientSide;
