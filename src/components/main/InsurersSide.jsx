import React from 'react';
import '../styles/insurer_side.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { green } from '@material-ui/core/colors';

import { insurerList } from 'constant/insurers';

const getInsurerConnected = insurerList.filter(
   (insurer) => insurer.isConnected,
);

const InsurerHeader = () => {
   return (
      <div className='insurer_list_header'>
         <AssignmentTurnedInIcon
            style={{ fontSize: '15px', color: green[500] }}
         />
         <span>Connected Insurers</span>
      </div>
   );
};

const InurerFooter = ({ state, handleChange }) => {
   return (
      <div className='insurer_list_footer'>
         <span>Auto check all</span>
         <Switch
            checked={state.checkedB}
            onChange={handleChange}
            color='primary'
            name='checkedB'
            inputProps={{ 'aria-label': 'primary checkbox' }}
         />
      </div>
   );
};

const InsurersSide = () => {
   const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
   });
   const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
   };
   return (
      <div className='insurer_side'>
         <InsurerHeader />
         <div className='insurer_list list_wrapper'>
            <List component='nav' aria-label='main mailbox folders'>
               {getInsurerConnected.map((insurer) => (
                  <>
                     <ListItem button>
                        <div className='insurer_icon'>
                           <img src={`img/insurers/${insurer.id}.png`} />
                           <span>{insurer.providerName}</span>
                        </div>
                     </ListItem>
                     <Divider />
                  </>
               ))}
            </List>
         </div>
         <InurerFooter state={state} handleChange={handleChange} />
      </div>
   );
};

export default InsurersSide;
