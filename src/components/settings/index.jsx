import React, { Fragment, useState } from 'react';
import './settings.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { green } from '@material-ui/core/colors';
import { insurerList } from 'constant/insurers';
import Button from '@material-ui/core/Button';
import Login from '../LoginList/Login';
import LoginForm from '../LoginForm/LoginForm';
import Grow from '@material-ui/core/Grow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

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
                }}
              >
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

const WrapperPapper = ({ isToggle = false, children }) => {
  return <Grow in={isToggle}>{children}</Grow>;
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Settings = () => {
  const classes = useStyles();

  const [selectedInsurer, setSelectedInsurer] = useState(insurerList[0]);
  const [isToggle, setIsToggle] = useState(false);

  const onSelectInurance = (insurance) => {
    setSelectedInsurer(insurance);
  };

  const onToggleSettings = () => {
    setIsToggle((toggle) => !toggle);
  };

  return (
    <div className='settings_page'>
      <InsurerList onSelectInurance={onSelectInurance} />
      <div className='insurer_login_form'>
        {isToggle && (
          <WrapperPapper isToggle={isToggle}>
            <div className='login_section'>
              <LoginForm selectedInsurer={selectedInsurer} />
            </div>
          </WrapperPapper>
        )}
        {!isToggle && (
          <WrapperPapper isToggle={!isToggle}>
            <div className='list_section'>
              <Login />
            </div>
          </WrapperPapper>
        )}

        <div className='add_new_section'>
          <div className={classes.root}>
            <Fab onClick={onToggleSettings} color='primary' aria-label='add'>
              {!isToggle ? <AddIcon /> : <ArrowBackIcon />}
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
