import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const LoadingContent = ({ insurerId, insurerName = '', classes = {} }) => {
  return (
    <React.Fragment>
      <div className='place_img_loading' style={{ marginBottom: 6 }}>
        <img src={`img/insurers/${insurerId}.png`} />
        <span className='retreive_label'>
          Retrieving data from {(insurerName || '').toUpperCase()}...
        </span>
      </div>
      <React.Fragment>
        <Skeleton animation='wave' height={10} style={{ marginBottom: 6 }} />
        <Skeleton
          animation='wave'
          height={10}
          width='80%'
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation='wave'
          variant='rect'
          className={(classes || { media: '' }).media}
        />
      </React.Fragment>
    </React.Fragment>
  );
};

export default LoadingContent;
