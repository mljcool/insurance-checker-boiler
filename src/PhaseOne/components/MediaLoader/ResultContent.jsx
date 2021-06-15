import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const ResultContent = ({
   isLoadingScrape,
   InsurerId,
   InsurerName,
   classes,
}) => {
   return (
      <React.Fragment>
         {!isLoadingScrape && (
            <div className='main_label_header'>
               <span>Insurance checker found 3 benefits from 1 insurer</span>
            </div>
         )}

         <div className='place_img_loading' style={{ marginBottom: 6 }}>
            <img src={`img/insurers/${InsurerId}.png`} />
            {isLoadingScrape && (
               <span className='retreive_label'>
                  Retrieving data from {InsurerName.toUpperCase()}...
               </span>
            )}
            {!isLoadingScrape && (
               <div className='info_insurer_label'>
                  <span className='policy_number'>454546 -858</span>
                  <span className='total_amount_policy'>$52,255 Monthly</span>
               </div>
            )}
         </div>
         {!isLoadingScrape && (
            <div className='benefits_results'>
               <div className='benefits_list'>
                  <div className='benefits_logo_label'>
                     <img
                        className='b_logo'
                        width='25px'
                        height='25px'
                        src={'img/benefit_icons/fp.svg'}
                     />
                     <span className='b_label'>Family Cover</span>
                  </div>
                  <div className='total_cover'>$15,000</div>
               </div>
            </div>
         )}
         {isLoadingScrape && (
            <React.Fragment>
               <Skeleton
                  animation='wave'
                  height={10}
                  style={{ marginBottom: 6 }}
               />
               <Skeleton
                  animation='wave'
                  height={10}
                  width='80%'
                  style={{ marginBottom: 6 }}
               />
               <Skeleton
                  animation='wave'
                  variant='rect'
                  className={classes.media}
               />
            </React.Fragment>
         )}
      </React.Fragment>
   );
};

export default ResultContent;
