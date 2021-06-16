import React from 'react';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';

const ResultContent = ({ insurerId, policies = [] }) => {
   const openViewLink = (link) => {
      window.open(link, '_blank').focus();
   };

   return (
      policies.length &&
      policies.map((policy) => (
         <React.Fragment>
            <div className='main_label_header'>
               <span>
                  Insurance checker found {policy.products.length} benefits from
                  1 insurer
               </span>
            </div>

            <div className='place_img_loading' style={{ marginBottom: 6 }}>
               <img src={`img/insurers/${insurerId}.png`} />

               <div className='info_insurer_label'>
                  <span className='policy_number'>{policy.policyNumber}</span>
                  <span className='total_amount_policy'>
                     {policy.premium} {policy.frequency}
                  </span>
               </div>
               <div className='view_new_tab'>
                  <IconButton
                     aria-label='settings'
                     onClick={() => {
                        openViewLink(policy.link);
                     }}>
                     <LaunchIcon />
                  </IconButton>
               </div>
            </div>
            <div className='benefits_results'>
               {policy.products.map((product) => (
                  <div className='benefits_list'>
                     <div className='benefits_logo_label'>
                        <img
                           className='b_logo'
                           width='25px'
                           height='25px'
                           src={'img/benefit_icons/fp.svg'}
                        />
                        <span className='b_label'>{product.productName}</span>
                     </div>
                     <div className='total_cover'>{product.amount}</div>
                  </div>
               ))}
            </div>
         </React.Fragment>
      ))
   );
};

export default ResultContent;
