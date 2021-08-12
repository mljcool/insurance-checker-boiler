import React, { Fragment, useContext } from 'react';
import '../styles/insurer_side.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { insurerList } from 'constant/insurers';
import Loader from '../Loader';
import { AppContext } from 'context/AppContext';

const getInsurerConnected = insurerList.filter(
  (insurer) => insurer.isConnected
);

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#8d76a0',
    '&$checked': {
      color: '#8d76a0',
    },
    '&$checked + $track': {
      backgroundColor: '#8d76a0',
    },
  },
  checked: {},
  track: {},
})(Switch);
const InsurerHeader = () => {
  return (
    <div className='insurer_list_header header_section'>
      <AssignmentTurnedInIcon style={{ fontSize: '15px', color: green[500] }} />
      <span>Connected Insurers</span>
    </div>
  );
};

const InsurerFooter = ({ state, handleChange }) => {
  return (
    <div className='insurer_list_footer'>
      <span>Auto check all</span>
      <PurpleSwitch
        checked={state.checkedB}
        onChange={handleChange}
        size={'small'}
        name='checkedB'
      />
    </div>
  );
};

const InsurersSide = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [insurerId, setInsurerId] = React.useState(0);
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { isSearching, setToggleSearch, connectedInsurer } = useContext(
    AppContext
  );

  return (
    <div className='insurer_side'>
      <InsurerHeader />
      <Loader isLoading={isSearching} />
      <div className='insurer_list list_wrapper'>
        <List component='nav' aria-label='main mailbox folders'>
          {connectedInsurer.map((insurer) => (
            <Fragment key={insurer.insurerId}>
              <ListItem
                button
                className={
                  insurerId === insurer.insurerId ? 'selected_list' : ''
                }
                onClick={() => {
                  setToggleSearch(insurer.insurerId);
                  setInsurerId(insurer.insurerId);
                }}
              >
                <div className='insurer_icon' key={insurer.insurerId}>
                  <img src={`img/insurers/${insurer.insurerId}.png`} />
                  <span>{insurer.email}</span>
                </div>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </div>
      <InsurerFooter state={state} handleChange={handleChange} />
    </div>
  );
};

export default InsurersSide;
