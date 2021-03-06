import React from 'react';
import '../styles/loading_content.css';
import Skeleton from '@material-ui/lab/Skeleton';
import { insurerList } from 'constant/insurers';

const LoadingContent = ({ insurerId, insurerName = '', classes = {} }) => {
  const { providerName } = insurerList.find((ins) => ins.id === insurerId);
  return (
    <React.Fragment>
      <div className='place_img_loading' style={{ marginBottom: 6 }}>
        <img src={`img/insurers/${insurerId}.png`} />
        <span className='retreive_label'>
          Retrieving data from {(providerName || '').toUpperCase()}...
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
          height={200}
          className={(classes || { media: '' }).media}
        />
      </React.Fragment>
    </React.Fragment>
  );
};

export default LoadingContent;
