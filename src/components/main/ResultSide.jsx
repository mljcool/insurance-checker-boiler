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

const removeSpaces = (text = '') => {
  const newText = (text || '').split(/\s/).join('');
  return newText;
};

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

const InsurancesDetails = ({ insurerData, insurerId }) => {
  return (
    <div className='client_result_sections'>
      <span>Insurance Checker found 1 benefits from 1 Insurer</span>
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
        <ColorButton
          className='view_link_btn'
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

const CoverListItem = ({ products }) => {
  return (
    products.length &&
    products.map((product, index) => (
      <div className='client_cover_sections' key={index}>
        <div className='ic_card_cover_label'>
          <img
            width='18px'
            height='18px'
            src={`img/benefit_icons/${removeSpaces(product.productName)}.svg`}
            onError={(e) => {
              e.target.src = 'img/benefit_icons/circle-svgrepo-com.svg';
            }}
          />
          <span>{product.productName}</span>
        </div>
        <div className='cover_detail'>
          <div className='ic_card_cover_amount'>{product.amount}</div>
        </div>
      </div>
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
      <Button
        variant='contained'
        color='primary'
        className={classes.button}
        startIcon={<RefreshIcon />}
        onClick={() => {
          onStartScrapingAction();
        }}
      >
        Test Now
      </Button>
    </div>
  );
};

const ResultSide = () => {
  const classes = useStyles();
  const {
    isSearching,
    resultList,
    onStartScraping,
    succededResultList,
  } = useContext(AppContext);
  const emptyList = !succededResultList.length;
  const appendClass = emptyList ? 'empty_list' : '';
  return (
    <div className='result_side'>
      <ResultHeader />
      <Loader isLoading={isSearching} />
      <div className={`result_list list_wrapper ${appendClass}`}>
        {!!succededResultList.length &&
          succededResultList.map((insurer, index) => (
            <Fragment key={index}>
              <div className='main_result_list'>
                <Paper className='paper_client_details' elevation={1}>
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
                  <TopRightButton crmTheme={classes.crmTheme} />
                  {insurer.policies.map((policy, idx) => (
                    <Fragment>
                      <InsurancesDetails
                        key={idx}
                        insurerData={policy}
                        insurerId={insurer.insurerId}
                      />
                      <CoverListItem products={policy.products} />
                    </Fragment>
                  ))}
                </Paper>
              </div>
            </Fragment>
          ))}
        {!succededResultList.length && (
          <EmptyWrapper onStartScrapingAction={onStartScraping} />
        )}
      </div>
      <ResultsFooter />
    </div>
  );
};

export default ResultSide;
