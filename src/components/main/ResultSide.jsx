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
import Alert from '@material-ui/lab/Alert';

import LoadingContent from '../LoadingSkeleton/LoadingContent';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const getInsurerConnected = insurerList.filter(
  (insurer) => insurer.isConnected
);

const openViewLink = (link) => {
  window.open(link, '_blank').focus();
};

const removeSpaces = (text = '') => {
  const newText = (text || '').split(/\s/).join('');
  return newText;
};

const useStyles = makeStyles((theme) => ({
  crmTheme: {
    color: '#8d76a0',
  },
  margin: {
    margin: theme.spacing(1),
  },
  crmThemeAvatar: {
    backgroundColor: '#8d76a0',
    fontSize: '15px',
  },
  button: {
    margin: theme.spacing(1),
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

const ResultsFooter = ({ onStartScrapingAction }) => {
  const classes = useStyles();
  return (
    <div className='result_list_footer'>
      <span>Re-check all</span>
      <IconButton
        color='primary'
        aria-label='reysnc data'
        onClick={() => {
          onStartScrapingAction();
        }}
      >
        <RestorePageIcon className={classes.crmTheme} />
      </IconButton>
    </div>
  );
};

const TopRightButton = ({ crmTheme, onResync }) => {
  const classes = useStyles();
  return (
    <div className='topright'>
      <IconButton
        aria-label='reysnc data'
        className={classes.margin}
        size='small'
        onClick={onResync}
      >
        <CachedIcon className={crmTheme} fontSize='inherit' />
      </IconButton>
    </div>
  );
};

const InsurancesDetails = ({ insurerData, insurerId, isNumber }) => {
  return (
    <div className='client_result_sections'>
      {!!isNumber && (
        <span>Insurance Checker found {isNumber} benefits from 1 Insurer</span>
      )}
      {!isNumber && <span>Insurance Checker found {isNumber} benefits</span>}
      <div className='client_provider_results'>
        <div className='details_place'>
          <img
            src={`img/insurers/${insurerId}.png`}
            width='65px'
            height='35px'
          />
          <div className='result_policy'>
            <span className='ic_card_policy'>{insurerData.policyNumber}</span>
            <span className='ic_card_premium'>
              {insurerData.premium} {insurerData.frequency}
            </span>
          </div>
        </div>
        {!!isNumber && (
          <ColorButton
            className='view_link_btn'
            size='small'
            variant='contained'
            color='primary'
            onClick={() => {
              openViewLink(insurerData.link);
            }}
            disableElevation
          >
            View
          </ColorButton>
        )}
      </div>
    </div>
  );
};

const HealhtCover = ({ healthCover = [] }) => {
  return (
    !!(healthCover || []).length &&
    healthCover.map((health, index) => (
      <div className='client_cover_sections' key={index}>
        <div className='ic_card_cover_label'>
          <Tooltip
            title={`Health Cover insured person: ${health.insuredPerson}`}
          >
            <img width='18px' height='18px' src={`img/benefit_icons/hc.svg`} />
          </Tooltip>
          <div className='health_labels'>
            <span>{health.productName}</span>
            <span className='insured_name'>({health.insuredPerson})</span>
          </div>
        </div>
        <div className='cover_detail'>
          <Tooltip title={`Excess amount`}>
            <div className='ic_card_cover_amount'>{health.excess}</div>
          </Tooltip>
        </div>
      </div>
    ))
  );
};

const useStylesTypography = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));
const CoverListItem = ({ products = [], insurerDetails = {} }) => {
  const classes = useStylesTypography();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const clientName = `${(insurerDetails || { firstName }).firstName} ${
    (insurerDetails || { lastName }).lastName
  }`;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    !!(products || []).length &&
    products
      .filter((product) => product.amount)
      .map((product, index) => (
        <Fragment key={index}>
          <div className='client_cover_sections'>
            <div className='ic_card_cover_label'>
              <img
                width='18px'
                height='18px'
                src={`img/benefit_icons/${removeSpaces(
                  product.productName
                )}.svg`}
                onError={(e) => {
                  e.target.src = 'img/benefit_icons/circle-svgrepo-com.svg';
                }}
              />
              <span>{product.productName}</span>
              <div className='loading_state'>
                <span className='loading_label'>
                  (Loading: {product.loadingFormatted})
                </span>
              </div>
            </div>
            <div className='cover_detail'>
              <div className='ic_card_cover_amount'>{product.amount}</div>
            </div>
          </div>
          {!!product.exclusion && (
            <Fragment>
              <Chip
                icon={
                  <InfoIcon
                    className='loading_info'
                    style={{ color: '#edab26' }}
                  />
                }
                label='Exclusion'
                size='small'
                onClick={handleClick}
                variant='outlined'
                style={{
                  marginTop: 4,
                }}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                style={{
                  width: '80%',
                }}
              >
                <div className='client_top_details'>
                  <span>Exclusion: {clientName}</span>
                </div>
                <Typography variant='subtitle1' className={classes.typography}>
                  {product.exclusion}
                </Typography>
              </Popover>
            </Fragment>
          )}
        </Fragment>
      ))
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
      {/* <Button
        variant='contained'
        color='primary'
        className={classes.button}
        startIcon={<RefreshIcon />}
        onClick={() => {
          onStartScrapingAction();
        }}
      >
        Test Now
      </Button> */}
    </div>
  );
};

const ShowMoreIcon = ({ showMore }) => {
  return !showMore ? (
    <ArrowDownwardIcon fontSize='inherit' />
  ) : (
    <ArrowUpwardIcon fontSize='inherit' />
  );
};

const ResultSide = () => {
  const classes = useStyles();

  const [showMore, setShowMore] = React.useState(false);
  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        });
      }
    }, 300);
  };

  const {
    isSearching,
    hasIssueClientData,
    onResyncResultUnsuccessData,
    onStartScraping,
    succededResultList,
    unSuccededResultList,
    onResyncResult,
    clientList,
  } = useContext(AppContext);
  const emptyList = !succededResultList.length;
  const appendClass = emptyList ? 'empty_list' : '';

  return (
    <div className='result_side'>
      <ResultHeader />
      <Loader isLoading={isSearching} />
      <div className={`result_list list_wrapper ${appendClass}`}>
        {hasIssueClientData && (
          <Alert severity='warning' className='client_alert'>
            There was an error on clients data. Please check the follow required
            data (First,Last Name and Birthday)
          </Alert>
        )}
        {!!succededResultList.length &&
          succededResultList.map((insurer, index) => (
            <Fragment key={index}>
              <div className='main_result_list'>
                <Paper className='paper_client_details' elevation={1}>
                  {insurer.isSync && (
                    <LoadingContent insurerId={insurer.insurerId} />
                  )}
                  {!insurer.isSync && (
                    <Fragment>
                      <div className={'client_details'}>
                        <div className='prefix'>
                          <Avatar className={classes.crmThemeAvatar}>
                            {insurer.firstName[0]}
                            {insurer.lastName[0]}
                          </Avatar>
                          <span className='client_full_name'>
                            {insurer.firstName} {insurer.lastName}
                          </span>
                        </div>
                      </div>
                      <TopRightButton
                        onResync={() => {
                          onResyncResult(insurer);
                        }}
                        crmTheme={classes.crmTheme}
                      />
                      {!!insurer.policies &&
                        insurer.policies.map((policy, idx) => (
                          <Fragment key={idx}>
                            <InsurancesDetails
                              key={idx}
                              insurerData={policy}
                              insurerId={insurer.insurerId}
                              isNumber={1}
                            />
                            <CoverListItem
                              products={policy.products}
                              insurerDetails={insurer}
                            />
                            <HealhtCover healthCover={policy.healths} />
                          </Fragment>
                        ))}
                    </Fragment>
                  )}
                </Paper>
              </div>
            </Fragment>
          ))}

        {/* unsuccesResultlist */}
        {!!unSuccededResultList.length && (
          <div className='separator_no_result'>
            <Alert severity='info'>
              {unSuccededResultList.length} other insurers did not return any
              results
            </Alert>
            <div>
              <Button
                variant='contained'
                color='primary'
                size='small'
                className={classes.button}
                startIcon={<ShowMoreIcon showMore={showMore} />}
                onClick={() => {
                  setShowMore((istoggled) => !istoggled);
                  if (!showMore) {
                    scrollToBottom();
                  }
                }}
              >
                {!showMore ? 'Show' : 'Hide'}
              </Button>
            </div>
          </div>
        )}

        {showMore &&
          !!unSuccededResultList.length &&
          unSuccededResultList.map((insurer, index) => (
            <Fragment key={index}>
              <div className='main_result_list'>
                <Paper className='paper_client_details' elevation={1}>
                  {insurer.isSync && (
                    <LoadingContent insurerId={insurer.insurerId} />
                  )}
                  {!insurer.isSync && (
                    <Fragment>
                      <div className={'client_details'}>
                        <div className='prefix'>
                          <Avatar className={classes.crmThemeAvatar}>
                            {insurer.firstName[0]}
                            {insurer.lastName[0]}
                          </Avatar>
                          <span className='client_full_name'>
                            {insurer.firstName} {insurer.lastName}
                          </span>
                        </div>
                      </div>
                      <TopRightButton
                        onResync={() => {
                          onResyncResultUnsuccessData(insurer);
                        }}
                        crmTheme={classes.crmTheme}
                      />
                      <Fragment>
                        <InsurancesDetails
                          key={1}
                          isNumber={0}
                          insurerData={{
                            policyNumber: '(000000)',
                            frequency: ' ___________________',
                            premium: '$0.00',
                            link: '',
                          }}
                          insurerId={insurer.insurerId}
                        />
                      </Fragment>
                    </Fragment>
                  )}
                </Paper>
              </div>
              <div ref={messagesEndRef} />
            </Fragment>
          ))}
        {!succededResultList.length && !unSuccededResultList.length && (
          <EmptyWrapper onStartScrapingAction={onStartScraping} />
        )}
        {!clientList.length && (
          <div className='empty_client_list'>
            <Alert severity='info'>
              Extension can't detect any clients try to reload the page.
            </Alert>
          </div>
        )}
      </div>
      <ResultsFooter onStartScrapingAction={onStartScraping} />
    </div>
  );
};

export default ResultSide;
