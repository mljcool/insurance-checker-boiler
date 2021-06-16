import React from 'react';

const ResultContent = ({ insurerId }) => {
   return (
      <React.Fragment>
         <div className='main_label_header'>
            <span>Insurance checker found 3 benefits from 1 insurer</span>
         </div>

         <div className='place_img_loading' style={{ marginBottom: 6 }}>
            <img src={`img/insurers/${insurerId}.png`} />

            <div className='info_insurer_label'>
               <span className='policy_number'>454546 -858</span>
               <span className='total_amount_policy'>$52,255 Monthly</span>
            </div>
         </div>
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
      </React.Fragment>
   );
};

export default ResultContent;
