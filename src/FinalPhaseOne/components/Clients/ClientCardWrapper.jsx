import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Loader from 'FinalPhaseOne/components/Loader';
import ResultContent from './ResultContent';
import BlankResult from './BlankResult';
import LoadingContent from './LoadingContent';
import Avatar from '@material-ui/core/Avatar';
import RefreshIcon from '@material-ui/icons/Refresh';
import { deepPurple } from '@material-ui/core/colors';
import { AppContext } from 'context/AppContext';

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

const RefreshButton = ({ onRefresh }) => {
  return (
    <IconButton onClick={onRefresh} aria-label='settings'>
      <RefreshIcon />
    </IconButton>
  );
};

const ClientCardWrapper = ({
  loading = false,
  dataScrape = {},
  idKey,
  resyncable,
}) => {
  const classes = useStyles();
  const {
    firstName,
    lastName,
    insurerName,
    insurerId,
    isLoadingScrape,
    resyncScrape,
    hasData,
    message,
    policies,
    keyId,
  } = dataScrape;
  const { onRefreshsScraping } = React.useContext(AppContext);
  const onRefreshScrape = () => {
    console.log('Refresh button', dataScrape);
    onRefreshsScraping(keyId);
  };

  return (
    <Card className={classes.card}>
      <Loader isLoading={isLoadingScrape} />
      <CardHeader
        className='card_resul_header'
        avatar={
          <Avatar className={classes.purple}>
            {firstName[0]}
            {lastName[0]}
          </Avatar>
        }
        action={
          isLoadingScrape
            ? null
            : hasData === 'BLANK' && (
                <RefreshButton onRefresh={onRefreshScrape} />
              )
        }
        title={<div className='insure_label'>Insured Person</div>}
        subheader={
          <div className='insure_people'>
            <span className='f_name'>{firstName}</span>
            <span className='l_name'>{lastName}</span>
          </div>
        }
      />
      {!resyncable && (
        <CardContent>
          {hasData === 'YES' && isLoadingScrape && (
            <LoadingContent
              classes={classes}
              insurerName={insurerName}
              insurerId={insurerId}
            />
          )}
          {hasData === 'BLANK' && !isLoadingScrape && (
            <BlankResult
              insurerName={insurerName}
              insurerId={insurerId}
              message={message}
            />
          )}

          {hasData === 'YES' && !isLoadingScrape && (
            <ResultContent
              classes={classes}
              insurerName={insurerName}
              insurerId={insurerId}
              policies={policies}
            />
          )}
        </CardContent>
      )}

      {resyncable && (
        <CardContent>
          {hasData === 'YES' && resyncScrape && (
            <LoadingContent
              classes={classes}
              insurerName={insurerName}
              insurerId={insurerId}
            />
          )}
          {hasData === 'BLANK' && !resyncScrape && (
            <BlankResult
              insurerName={insurerName}
              insurerId={insurerId}
              message={message}
            />
          )}

          {hasData === 'YES' && !resyncScrape && (
            <ResultContent
              classes={classes}
              insurerName={insurerName}
              insurerId={insurerId}
              policies={policies}
            />
          )}
        </CardContent>
      )}
    </Card>
  );
};

ClientCardWrapper.propTypes = {
  loading: PropTypes.bool,
};

export default ClientCardWrapper;
