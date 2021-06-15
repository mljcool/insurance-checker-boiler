import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import Loader from 'PhaseOne/components/Loader';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
   card: {
      maxWidth: '100%',
      margin: theme.spacing(2),
   },
   purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: '#8d76a0',
      fontSize: '15px',
   },
   media: {
      height: 190,
   },
}));

const MediaLoading = ({ loading = false, userData = {} }) => {
   const classes = useStyles();
   const { FirstName, LastName, InsurerName, InsurerId } = userData;

   console.log(userData);
   return (
      <Card className={classes.card}>
         <Loader isLoading={true} />
         <CardHeader
            className='card_resul_header'
            avatar={
               <Avatar className={classes.purple}>
                  {FirstName[0]}
                  {LastName[0]}
               </Avatar>
            }
            action={
               loading ? null : (
                  <IconButton aria-label='settings'>
                     <MoreVertIcon />
                  </IconButton>
               )
            }
            title={<div className='insure_label'>Insured Person</div>}
            subheader={
               <div className='insure_people'>
                  <span className='f_name'>{FirstName}</span>
                  <span className='l_name'>{LastName}</span>
               </div>
            }
         />

         <CardContent>
            <div className='main_label_header'>
               <span>Insurance checker found 3 benefits from 1 insurer</span>
            </div>
            <div className='place_img_loading' style={{ marginBottom: 6 }}>
               <img src={`img/insurers/${InsurerId}.png`} />
               {false && (
                  <span className='retreive_label'>
                     Retrieving data from {InsurerName.toUpperCase()}...
                  </span>
               )}
               {true && (
                  <div className='info_insurer_label'>
                     <span className='policy_number'>454546 -858</span>
                     <span className='total_amount_policy'>
                        $52,255 Monthly
                     </span>
                  </div>
               )}
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
            {/* <React.Fragment>
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
            </React.Fragment> */}
         </CardContent>
      </Card>
   );
};

MediaLoading.propTypes = {
   loading: PropTypes.bool,
};

export default MediaLoading;
