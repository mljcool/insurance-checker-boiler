import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
   card: {
      maxWidth: '100%',
      margin: theme.spacing(2),
   },
   media: {
      height: 190,
   },
}));

const MediaLoading = ({ loading = false }) => {
   const classes = useStyles();

   return (
      <Card className={classes.card}>
         <CardHeader
            avatar={
               <Skeleton
                  animation='wave'
                  variant='circle'
                  width={40}
                  height={40}
               />
            }
            action={
               loading ? null : (
                  <IconButton aria-label='settings'>
                     <MoreVertIcon />
                  </IconButton>
               )
            }
            title={
               <Skeleton
                  animation='wave'
                  height={10}
                  width='80%'
                  style={{ marginBottom: 6 }}
               />
            }
            subheader={<Skeleton animation='wave' height={10} width='40%' />}
         />
         <Skeleton animation='wave' variant='rect' className={classes.media} />

         <CardContent>
            <React.Fragment>
               <Skeleton
                  animation='wave'
                  height={10}
                  style={{ marginBottom: 6 }}
               />
               <Skeleton animation='wave' height={10} width='80%' />
            </React.Fragment>
         </CardContent>
      </Card>
   );
};

MediaLoading.propTypes = {
   loading: PropTypes.bool,
};

export default MediaLoading;
