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
                  {FirstName}
                  {LastName}
               </div>
            }
         />

         <CardContent>
            <React.Fragment>
               <div className='place_img_loading'>
                  <img src={`img/insurers/${InsurerId}.png`} />
                  <span className='retreive_label'>
                     Retrieving data from {InsurerName.toUpperCase()}...
                  </span>
               </div>

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
         </CardContent>
      </Card>
   );
};

MediaLoading.propTypes = {
   loading: PropTypes.bool,
};

export default MediaLoading;
