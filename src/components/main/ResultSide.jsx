import React, { Fragment } from 'react';
import '../styles/result_side.css';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { green } from '@material-ui/core/colors';
import { insurerList } from 'constant/insurers';
import MenuFilter from '../MenuFilter/MenuFilter';

import { makeStyles } from '@material-ui/core/styles';

const getInsurerConnected = insurerList.filter(
   (insurer) => insurer.isConnected,
);

const useStyles = makeStyles((theme) => ({
   crmTheme: {
      color: '#8d76a0',
   },
}));

const ResultHeader = () => {
   return (
      <div className='result_list_header header_section'>
         <div className='resul_banner'>
            <AssignmentTurnedInIcon
               style={{ fontSize: '15px', color: green[500] }}
            />
            <span>Results from Insurers</span>
         </div>

         <MenuFilter />
      </div>
   );
};

const ResultsFooter = () => {
   const classes = useStyles();
   return (
      <div className='result_list_footer'>
         <span>Re-check all</span>
         <IconButton color='primary' aria-label='add to shopping cart'>
            <RestorePageIcon className={classes.crmTheme} />
         </IconButton>
      </div>
   );
};

const ResultSide = () => {
   return (
      <div className='result_side'>
         <ResultHeader />
         <div className='result_list list_wrapper'>
            {getInsurerConnected.map((insurer) => (
               <Fragment key={insurer.id}>
                  <div className='main_result_list'>
                     <Paper elevation={1} key={insurer.id} />
                  </div>
               </Fragment>
            ))}
         </div>
         <ResultsFooter />
      </div>
   );
};

export default ResultSide;
