import React, { Fragment } from 'react';
import '../styles/result_side.css';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { green } from '@material-ui/core/colors';
import { insurerList } from 'constant/insurers';

const getInsurerConnected = insurerList.filter(
   (insurer) => insurer.isConnected,
);

const ResultHeader = () => {
   return (
      <div className='result_list_header header_section'>
         <AssignmentTurnedInIcon
            style={{ fontSize: '15px', color: green[500] }}
         />
         <span>Results from Insurers</span>
      </div>
   );
};

const ResultsFooter = () => {
   return (
      <div className='result_list_footer'>
         <span>Re-check all</span>
         <IconButton color='primary' aria-label='add to shopping cart'>
            <RestorePageIcon />
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
                  <Paper elevation={0} key={insurer.id} />
               </Fragment>
            ))}
         </div>
         <ResultsFooter />
      </div>
   );
};

export default ResultSide;
