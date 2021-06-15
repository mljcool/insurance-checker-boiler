import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Loader from 'PhaseOne/components/Loader';
import ResultContent from 'PhaseOne/components/MediaLoader/ResultContent';
import BlankResult from 'PhaseOne/components/MediaLoader/BlankResult';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
   card: {
      maxWidth: '100%',
      margin: theme.spacing(2),
      height: 'auto !important',
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
   const {
      FirstName,
      LastName,
      InsurerName,
      InsurerId,
      isLoadingScrape,
      hasData,
   } = userData;

   console.log(userData);
   return (
      <Card className={classes.card}>
         <Loader isLoading={isLoadingScrape} />
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
            {hasData === 'YES' && isLoadingScrape && (
               <ResultContent
                  classes={classes}
                  isLoadingScrape={isLoadingScrape}
                  InsurerName={InsurerName}
                  InsurerId={InsurerId}
               />
            )}
            {hasData === 'BLANK' && !isLoadingScrape && (
               <BlankResult InsurerName={InsurerName} InsurerId={InsurerId} />
            )}
         </CardContent>
      </Card>
   );
};

MediaLoading.propTypes = {
   loading: PropTypes.bool,
};

export default MediaLoading;
