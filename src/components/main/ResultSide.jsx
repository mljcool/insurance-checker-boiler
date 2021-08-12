import React, { Fragment, useContext } from 'react';
import '../styles/result_side.css';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { green, purple } from '@material-ui/core/colors';
import { insurerList } from 'constant/insurers';
import MenuFilter from '../MenuFilter/MenuFilter';
import Avatar from '@material-ui/core/Avatar';
import CachedIcon from '@material-ui/icons/Cached';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loader from '../Loader';
import { AppContext } from 'context/AppContext';
import RefreshIcon from '@material-ui/icons/Refresh';

const getInsurerConnected = insurerList.filter(
  (insurer) => insurer.isConnected
);

const useStyles = makeStyles(() => ({
  crmTheme: {
    color: '#8d76a0',
  },
  crmThemeAvatar: {
    backgroundColor: '#8d76a0',
    fontSize: '15px',
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#8d76a0',
    '&:hover': {
      backgroundColor: '#44b3b4',
    },
  },
}))(Button);

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

const TopRightButton = ({ crmTheme }) => {
  return (
    <div className='topright'>
      <CachedIcon className={crmTheme} />
    </div>
  );
};

const InsurancesDetails = ({ insurer }) => {
  return (
    <div className='client_result_sections'>
      <span>Insurance Checker found 1 benefits from 1 Insurer</span>
      <div className='client_provider_results'>
        <div className='details_place'>
          <img
            src={`img/insurers/${insurer.id}.png`}
            width='65px'
            height='35px'
          />
          <div className='result_policy'>
            <span className='ic_card_policy'>236729</span>
            <span className='ic_card_premium'>$205.95 Monthly</span>
          </div>
        </div>
        <ColorButton
          size='small'
          variant='contained'
          color='primary'
          disableElevation
        >
          View
        </ColorButton>
      </div>
    </div>
  );
};

const CoverListItem = () => {
  return (
    <div className='client_cover_sections'>
      <div class='ic_card_cover_label'>
        <img src={'img/benefit_icons/tc.svg'} width='18px' height='18px' />
        <span>Life Cover</span>
      </div>
      <div className='cover_detail'>
        <div class='ic_card_cover_amount'>$538,611.00</div>
      </div>
    </div>
  );
};

const useStylesRefresh = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const EmptyWrapper = ({ onStartScrapingAction }) => {
  const classes = useStylesRefresh();
  return (
    <div className='empty_wrapper'>
      <img className='empty_img_placeholder' src={'img/Group5.svg'} />
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        startIcon={<RefreshIcon />}
        onClick={() => {
          onStartScrapingAction();
        }}
      >
        Check Now
      </Button>
    </div>
  );
};

const ResultSide = () => {
  const classes = useStyles();
  const { isSearching, resultList, onStartScraping } = useContext(AppContext);
  const emptyList = !resultList.length;
  const appendClass = emptyList ? 'empty_list' : '';
  return (
    <div className='result_side'>
      <ResultHeader />
      <Loader isLoading={isSearching} />
      <div className={`result_list list_wrapper ${appendClass}`}>
        {!!resultList.length &&
          resultList.map((insurer) => (
            <Fragment key={insurer.id}>
              <div className='main_result_list'>
                <Paper
                  className='paper_client_details'
                  elevation={1}
                  key={insurer.id}
                >
                  <div className={'client_details'}>
                    <div className='prefix'>
                      <Avatar className={classes.crmThemeAvatar}>
                        {insurer.prefix}
                      </Avatar>
                      <span className='client_full_name'>
                        {insurer.fname} {insurer.lname}
                      </span>
                    </div>
                  </div>
                  <TopRightButton crmTheme={classes.crmTheme} />
                  <InsurancesDetails insurer={insurer.insurerDetails} />
                  <CoverListItem />
                </Paper>
              </div>
            </Fragment>
          ))}
        {!resultList.length && (
          <EmptyWrapper onStartScrapingAction={onStartScraping} />
        )}
      </div>
      <ResultsFooter />
    </div>
  );
};

export default ResultSide;
